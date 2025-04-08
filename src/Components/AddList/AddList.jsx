import { Box, IconButton, Typography, TextField, Stack, Button } from '@mui/material'

import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from 'react';

function AddList({ isLoading, dispatcher, postLists }) {

    const [inputValue, setInputValue] = useState('')

    function addingToLists() {
        if (!inputValue.trim()) return

        postLists(inputValue)
        dispatcher({type:'SET_ISLOADING',payload:false})
        setInputValue('')
    }
    function handleCloseAddList() {
        dispatcher({ type: 'SET_ISLOADING', payload: false })
        setInputValue('')
    }

    return (
        <Box>
            {isLoading ? (

                <Box
                    sx={{
                        width: 300,
                        p: 1,
                        border: "1px solid #ddd",
                        borderRadius: 2,
                        bgcolor: "black",
                        marginTop: '1rem'
                    }}
                >
                    {/* Input Field */}
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Enter List Name..."
                        autoFocus
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        sx={{
                            height: "1.8rem",
                            backgroundColor: "#738496",
                            borderRadius: 2,
                            "& .MuiOutlinedInput-input": {
                                padding: "4px 8px",
                                fontSize: "0.875rem",
                                color: "white",
                            },
                        }}
                    />

                    {/* Buttons Row */}
                    <Stack direction="row" spacing={1} mt={1} alignItems="center">
                        <Button
                            onClick={addingToLists}
                            variant="contained"
                            sx={{ padding: "4px 8px", fontSize: "0.75rem", minWidth: "auto" }}
                        >
                            Add list
                        </Button>

                        <IconButton onClick={handleCloseAddList} size="small">
                            <CloseIcon  sx={{ fontSize: "1rem", color: "white" , "&:hover": { bgcolor: '#8E6D9F' },}} />
                        </IconButton>
                    </Stack>
                </Box>
            ) : (
                <Box onClick={() => {
                    dispatcher({ type: 'SET_ISLOADING', payload: true })
                }}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        textWrap: 'nowrap',
                        border: "1px solid #ddd",
                        borderRadius: 2,
                        cursor: "pointer",
                        bgcolor:'#DCDFE4',
                        "&:hover": { bgcolor: '#cfd9df' },  
                        paddingTop:1,
                        paddingBottom:1,
                        paddingRight:'30px',
                        m:1
                    }}
                >
                    <IconButton size="small">
                        <AddIcon />
                    </IconButton>
                    <Typography variant="body1" sx={{fontSize:'1rem',paddingRight:'4rem'}}>Add another list</Typography>
                </Box>
            )}
        </Box>
    )
}

export default AddList
