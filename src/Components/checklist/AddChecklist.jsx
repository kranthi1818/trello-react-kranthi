import {
    Box,
    Modal,
    Typography,
    TextField,
    Stack,
    Button,
    IconButton
} from '@mui/material'

import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import CloseIcon from "@mui/icons-material/Close"
import AddIcon from "@mui/icons-material/Add"

import { useEffect, useReducer } from 'react'
import axios from 'axios'
import CheckList from './CheckList'


import { addChecklistReducer } from '../reducers/reducer'

function AddChecklist({ state, dispatch }) {
    const { isCard, isOpen } = state

    const initialState = {
        checklists: [],
        listInputValue: '',
        checkItems: {}
    }

    const [localState, localDispatch] = useReducer(addChecklistReducer, initialState)

    const { checklists, listInputValue, checkItems } = localState

    const APIKey = import.meta.env.VITE_APIkey
    const APIToken = import.meta.env.VITE_APItoken

    useEffect(() => {
        async function getCheckLists() {
            try {
                const response = await axios.get(
                    `https://api.trello.com/1/cards/${isCard.id}/checklists`,
                    {
                        params: { key: APIKey, token: APIToken }
                    })

                const checklistData = response.data

                localDispatch({ type: 'SET_CHECKLIST', payload: checklistData });
                localDispatch({ type: 'SET_CHECKITEMS', payload: checklistData }); 

            } catch (error) {
                console.log(error)
            }
        }

        getCheckLists()
    }, [isCard.id])


    async function postCheckList(cardId, listName) {

        if (!listName.trim()) return

        try {
            const response = await axios.post(
                `https://api.trello.com/1/cards/${cardId}/checklists`,
                null,
                {
                    params: { key: APIKey, token: APIToken, name: listName}
                })
            const newChecklist = response.data

            localDispatch({ type: 'UPDATE_CHECKLIST', payload: newChecklist })
            localDispatch({ type: 'ADD_CHECKITEM_GROUP', payload: newChecklist.id })
            localDispatch({ type: 'SET_INPUTVALUE', payload: '' })

        } catch (error) {
            console.log(error)
        }
    }


    async function deleteChecklist(checklistID) {
        try {
            await axios.delete(`https://api.trello.com/1/checklists/${checklistID}`,
                {
                    params: {key: APIKey,token: APIToken }
                })

            localDispatch({ type: 'DELETE_CHECKLIST', payload: checklistID })

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Box>
            {isCard && (
                <Modal open={Boolean(isCard)} onClose={() => dispatch({ type: 'CLOSE_MODAL' })}>
                    <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        height: 700,
                        width: 700,
                        p: 4,
                        borderRadius: '8px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        boxShadow: 24,
                        bgcolor: '#323940',
                        color: "white"
                    }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="h6">{isCard.name}</Typography>
                            <CloseOutlinedIcon onClick={() => dispatch({ type: 'CLOSE_MODAL' })} sx={{ cursor: 'pointer' }} />
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="h6">Add To Checklist</Typography>
                            <Box>
                                {isOpen ? (
                                    <form onSubmit={(e) => {
                                        e.preventDefault()
                                        postCheckList(isCard.id, listInputValue)
                                    }}>
                                        <TextField
                                            value={listInputValue}
                                            onChange={e => localDispatch({ type: 'SET_INPUTVALUE', payload: e.target.value })}
                                            fullWidth
                                            variant="outlined"
                                            placeholder="Enter List Name..."
                                            autoFocus
                                            sx={{
                                                backgroundColor: "#738496",
                                                borderRadius: 2,
                                                "& .MuiOutlinedInput-input": {
                                                    padding: "4px 8px",
                                                    fontSize: "0.875rem",
                                                    paddingBottom: 4,
                                                    wordBreak: 'break-word'
                                                },
                                            }}
                                        />
                                        <Stack direction="row" spacing={1} mt={1} alignItems="center">
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                sx={{ padding: "4px", fontSize: "0.75rem", minWidth: "auto" }}
                                            >
                                                Add Checklist
                                            </Button>
                                            <IconButton size="small" onClick={() => {
                                                dispatch({ type: 'CLOSE_CHECKLIST_INPUT' })
                                                localDispatch({ type: 'SET_INPUTVALUE', payload: '' })
                                            }}>
                                                <CloseIcon sx={{ fontSize: "1.3rem", "&:hover": { bgcolor: '#8E6D9F' } }} />
                                            </IconButton>
                                        </Stack>
                                    </form>
                                ) : (
                                    <Box onClick={() => dispatch({ type: 'OPEN_CHECKLIST' })}
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            height: "100%",
                                            cursor: "pointer",
                                            borderRadius: 1,
                                            backgroundColor: 'black',
                                            "&:hover": { bgcolor: "#282F27" },
                                        }}
                                    >
                                        <IconButton size="small" sx={{ color: 'gray' }}>
                                            <AddIcon />
                                        </IconButton>
                                        <Typography variant="body2" sx={{ fontSize: "0.9rem", color: 'gray', paddingRight: 2 }}>
                                            Add Checklist
                                        </Typography>
                                    </Box>
                                )}
                            </Box>
                        </Box>

                        <Box>
                            <CheckList
                                checkItems={checkItems}
                                checklists={checklists}
                                isCard={isCard}
                                deleteChecklist={deleteChecklist}
                                dispatch={localDispatch}
                            />
                        </Box>
                    </Box>
                </Modal>
            )}
        </Box>
    )
}

export default AddChecklist