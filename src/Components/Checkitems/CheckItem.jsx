import { Box, Checkbox, Button, TextField } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import axios from 'axios';


function CheckItem({ checkItems, isCardId, checklistId, dispatch }) {

    const [checkItemInput, setCheckItemInput] = useState('')

    const APIKey = import.meta.env.VITE_APIkey
    const APIToken = import.meta.env.VITE_APItoken


    async function createCheckItem(checkItemName) {
        try {
            const response = await axios.post(`https://api.trello.com/1/checklists/${checklistId}/checkItems`,
                null,
                { params: { name: checkItemName, key: APIKey, token: APIToken } }
            );
            
            const newItem = response.data;

            dispatch({ type: 'ADD_CHECK_ITEM', payload: { checklistId, checkItem: newItem } });
            setCheckItemInput('');

        } catch (error) {
            console.log(error);
        }
    }


    async function deleteCheckItem(checkItemId, cardId, checklistId) {
        try {
            await axios.delete(`https://api.trello.com/1/cards/${cardId}/checkItem/${checkItemId}`,
                { params: { key: APIKey, token: APIToken } } )

            dispatch({
                type: 'DELETE_CHECK_ITEM',
                payload: {
                    checklistId,checkItemId
                }
            });
        } catch (error) {
            console.log(error);
        }
    }


    async function toggleCheckItem(itemId, currentState) {

        try {
            await axios.put(`https://api.trello.com/1/cards/${isCardId}/checkItem/${itemId}`,
                null,

                { params: { state: currentState, key: APIKey, token: APIToken } }

            )

            dispatch({type: 'TOGGLE_CHECK_ITEM', payload: {checklistId, checkItemId: itemId, currentState}})
            
        } catch (error) {
            console.error('Error updating checkItem state:', error)
        }
    }
    
    return (
        <Box>
            <Box>
                {checkItems.map((item) => (
                    <Box key={item.id} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginLeft: 3, marginRight: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Checkbox color="success" onChange={() => toggleCheckItem(item.id, item.state)} 
                            checked={item.state === 'complete'} />
                            <Box>{item.name}</Box>
                        </Box>
                        <DeleteIcon
                            onClick={() => deleteCheckItem(item.id, isCardId, checklistId)}
                            sx={{ cursor: 'pointer', "&:hover": { color: 'red' } }}
                        />
                    </Box>
                ))}
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1, ml: 3, mr: 3 }}>
                <TextField
                    value={checkItemInput}
                    onChange={(e) => setCheckItemInput(e.target.value)}
                    variant="outlined"
                    placeholder="Enter item name..."
                    size="small"
                    sx={{
                        flex: 1,
                        backgroundColor: "#738496",
                        borderRadius: 2,
                        input: { color: 'white' },
                    }}
                />
                <Button onClick={() => createCheckItem(checkItemInput)}
                    disabled={!checkItemInput.trim()}
                    variant="contained"

                >
                    Add Check Item
                </Button>
            </Box>
        </Box>

    )
}

export default CheckItem