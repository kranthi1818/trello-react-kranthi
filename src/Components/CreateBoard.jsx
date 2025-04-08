import { Modal, TextField, Button, Box, Typography } from "@mui/material";

import { useState } from 'react';

//create board popup

function CreateBoard({isAdding,setIsAdding,postBoards}) {

     const [inputValue,setInputValue] = useState('')
     const [error,setError] = useState('')

    function handleSave() {
        if (!inputValue.trim()) {
            setError('Board name cannot be empty.');
            return;
        }

        postBoards(inputValue);
        setIsAdding(false);
        setInputValue('');
    }

    function handleCancel() {
        setIsAdding(false);
        setInputValue('');
        setError('');
    }    

  return (
    <Modal open={isAdding} onClose={()=>setIsAdding(false)}>

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
                    bgcolor:'white'
                }}>
                    <Typography variant="h6">Create New Board</Typography>
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Board Name"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
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

