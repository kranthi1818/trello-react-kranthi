import { Modal, TextField, Button, Box, Typography } from "@mui/material";

import { useState } from 'react';
import { setError, addToggleModal } from "../slices/boardSlice";
import { useDispatch, useSelector } from "react-redux";



//create board popup

function CreateBoard({ postBoards }) {

    const dispatch = useDispatch()

    const { isAdding, error } = useSelector((state) => state.board)

    const [inputValue, setInputValue] = useState('')

    function handleSave() {
        if (!inputValue.trim()) {
            dispatch(setError('Board name cannot be empty.'))
            return;
        }

        postBoards(inputValue);
        dispatch(addToggleModal(false))
        setInputValue('');
    }

    function handleCancel() {
        dispatch(addToggleModal(false))
        setInputValue('');
        dispatch(setError(''))
    }

    return (
        <Modal open={isAdding} onClose={() => dispatch(addToggleModal(false))
        }>

            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 300,
                p: 4,
                borderRadius: '8px',
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                boxShadow: 24,
                bgcolor: 'white'
            }}>
                <Typography variant="h6">Create New Board</Typography>
                <TextField
                    fullWidth
                    variant="outlined"
                    label="Board Name"
                    value={inputValue}
                    onChange={(e) => {
                        setInputValue(e.target.value)
                        error ? dispatch(setError('')) : null;

                    }}
                    error={error ? true : false}
                    helperText={error}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                    <Button variant="contained" color="primary" onClick={handleSave}>Save</Button>
                    <Button variant="outlined" color="secondary" onClick={handleCancel}>Cancel</Button>
                </Box>
            </Box>
        </Modal>
    )
}
export default CreateBoard



