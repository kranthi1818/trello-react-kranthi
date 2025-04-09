
import React, { useEffect } from 'react'
import axios from 'axios'
import { fetchBoards,createBoard } from '../apicalls/boardapi'
import NavBar from './NavBar'
import Board from './Board'
import CreateBoard from './CreateBoard'

import {
    Box,
    CardContent,
    Typography,
    CssBaseline
} from "@mui/material"

import AddIcon from "@mui/icons-material/Add"

import { useSelector, useDispatch } from 'react-redux'
import { setBoards, addBoards, addToggleModal } from '../slices/boardSlice'

function Home() {

    const dispatch = useDispatch()

    const boards = useSelector((state) => state.board.name)

    const APIKey = import.meta.env.VITE_APIkey
    const APIToken = import.meta.env.VITE_APItoken

    useEffect(() => {
        async function getBoards() {
            try {
                const data = await fetchBoards();
                dispatch(setBoards(data));
            } catch (error) {
                console.error("Error fetching boards:", error);
            }
        }
        getBoards();
    }, []);

    async function postBoards(boardName) {
        try {
            const newBoard = await createBoard(boardName);
            dispatch(addBoards({ id: newBoard.id, name: newBoard.name }));
        } catch (error) {
            console.log("Error creating board:", error);
        }
    }

    function addToBoard() {

        dispatch(addToggleModal(true))
        console.log('clicked')
    }

    return (
        <>
            <CssBaseline />

            <Box sx={{ backgroundColor: '#1D2125', height: "100vh", minWidth: "100vw", overflowX: "auto", overflowY: "auto" }}>

                {/* navbar componenet */}
                <NavBar />
                <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>

                    {boards.map((items) => (
                        <Board prefs={items.prefs} key={items.id} items={items} sx={{ minWidth: '25rem' }} name={items.name} id={items.id} />
                    ))}

                    <Box onClick={addToBoard}

                        sx={{ borderRadius: 1, marginTop: 10, marginLeft: 3, width: '15rem', height: '9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', bgcolor: '#333C43', '&:hover': { bgcolor: '#1A1E21' } }}
                    >
                        <CardContent sx={{
                            display: 'flex',
                            color: 'white',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: 1
                        }}>
                            <AddIcon />
                            <Typography variant="h6" align="center">Add To Boards</Typography>
                        </CardContent>

                    </Box>
                </Box>

                <CreateBoard postBoards={postBoards}/>
                
            </Box>
        </>
    )
}

export default Home
