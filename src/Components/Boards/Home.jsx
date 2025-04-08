
import React, { useEffect, useReducer } from 'react';
import axios from 'axios';
import NavBar from './NavBar';
import Board from './Board';
import CreateBoard from './CreateBoard';

import {
    Box,
    CardContent,
    Typography,
    CssBaseline
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import { boardReducer } from '../reducers/reducer';

const initialState = {
    name: [],
    isAdding: false
};

function Home() {

    const [state, dispatch] = useReducer(boardReducer, initialState);

    const APIKey = import.meta.env.VITE_APIkey;
    const APIToken = import.meta.env.VITE_APItoken;

    useEffect(() => {
        async function getBoards() {
            try {
                const response = await axios.get(
                    'https://api.trello.com/1/members/me/boards',
                    {
                        params: {
                            key: APIKey,
                            token: APIToken
                        }
                    }
                );

                dispatch({ type: 'SET_BOARDS', payload: response.data });

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        getBoards();
    }, []);

    async function postBoards(boardsName) {
        try {
            const response = await axios.post('https://api.trello.com/1/boards/',
                {
                    name: boardsName
                },
                {
                    params: {
                        key: APIKey, 
                        token: APIToken
                    }
                }
            );

            dispatch({ type: 'ADD_BOARD', payload: { id: response.data.id, name: response.data.name } });

        } catch (error) {

            console.log("Error posting data:", error);
        }
    }

    function addToBoard() {
        dispatch({ type: 'TOGGLE_ADD_MODAL', payload: true });
    }

    return (
        <>
            <CssBaseline />

            <Box sx={{ backgroundColor: '#1D2125', height: "100vh", minWidth: "100vw", overflowX: "auto", overflowY: "auto" }}>

                <NavBar addToBoard={addToBoard} />

                <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>

                    {state.name.map((items) => (

                        <Board  prefs={items.prefs} key={items.id} items={items} sx={{ minWidth: '25rem'}} name={items.name} id={items.id} />
                    ))}

                    <Box
                        onClick={addToBoard}

                        sx={{ borderRadius: 1, marginTop: 10, marginLeft: 3, width: '15rem', height: '9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', bgcolor: '#333C43', '&:hover': { bgcolor: '#1A1E21' } }}
                    >
                        <CardContent sx={{ display: 'flex', color: 'white', justifyContent: 'center', alignItems: 'center', gap: 1 }}>

                            <AddIcon />

                            <Typography variant="h6" align="center">Add To Boards</Typography>

                        </CardContent>

                    </Box>

                </Box>

                <CreateBoard
                    isAdding={state.isAdding}
                    setIsAdding={(value) => dispatch({ type: 'TOGGLE_ADD_MODAL', payload: value })}
                    postBoards={postBoards}
                />
            </Box>
        </>
    );
}

export default Home;
