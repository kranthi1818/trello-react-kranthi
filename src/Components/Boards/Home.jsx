
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
import { fetchingAllBoards,postingSingleBoard } from '../apicalls/boardapi';
import { boardReducer } from '../reducers/reducer';

const initialState = {
    name: [],
    isAdding: false
};

function Home() {

    const [state, dispatch] = useReducer(boardReducer, initialState);

   
    useEffect(() => {
        async function getBoards() {
            try {
                const response = await fetchingAllBoards();
                dispatch({ type: 'SET_BOARDS', payload: response });
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        getBoards()
    }, [])

    async function postBoards(boardsName) {
        try {
            const response = await postingSingleBoard(boardsName)
            dispatch({ type: 'ADD_BOARD', payload: { id: response.id, name: response.name } })
        } catch (error) {
            console.log("Error posting data:", error)
        }
    }

    function addToBoard() {
        dispatch({ type: 'TOGGLE_ADD_MODAL', payload: true })
    }

    return (
        <>
            <CssBaseline />

            <Box sx={{ backgroundColor: '#1D2125', height: "100vh", minWidth: "100vw", overflowX: "auto", overflowY: "auto" }}>

                <NavBar addToBoard={addToBoard} />

                <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>

                    {state.name.map((items) => (

                        <Board prefs={items.prefs} key={items.id} items={items} sx={{ minWidth: '25rem' }} name={items.name} id={items.id} />
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
    )
}

export default Home
