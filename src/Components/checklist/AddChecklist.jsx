import {
    Box,
    Modal,
    Typography,
    TextField,
    Button,
} from '@mui/material'

import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import { useEffect, useReducer } from 'react'
import axios from 'axios'
import CheckList from './CheckList'


import { addChecklistReducer } from '../reducers/reducer'

function AddChecklist({ state, dispatch }) {
    const { isCard} = state

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
                const response = await axios.get(`https://api.trello.com/1/cards/${isCard.id}/checklists`,
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
    }, [isCard?.id])


    async function postCheckList(cardId, listName) {

        if (!listName.trim()) return

        try {
            const response = await axios.post(
                `https://api.trello.com/1/cards/${cardId}/checklists`,
                null,
                {
                    params: { key: APIKey, token: APIToken, name: listName }
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
                    params: { key: APIKey, token: APIToken }
                })

            localDispatch({ type: 'DELETE_CHECKLIST', payload: checklistID })

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Box>
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
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: '#005B8F', borderRadius: 3 }}>

                        <Typography sx={{ marginLeft: '1rem', fontSize: '1.4rem' }} variant="h6">{isCard.name}</Typography>

                        <CloseOutlinedIcon onClick={() => dispatch({ type: 'CLOSE_MODAL' })}
                            sx={{ cursor: 'pointer', marginRight: '2rem' }} />
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', position: 'relative', }}>
                        <Typography variant="h6">Add Checklist</Typography>
                        <Box component='form'
                            onSubmit={(e) => {
                                e.preventDefault()
                                postCheckList(isCard.id, listInputValue)
                            }}
                            sx={{ display: 'flex', gap: 1 }}
                        >
                            <TextField
                                value={listInputValue}
                                onChange={e => localDispatch({ type: 'SET_INPUTVALUE', payload: e.target.value })}
                                fullWidth
                                variant="outlined"
                                placeholder="Enter Checklist Name..."
                                sx={{
                                    backgroundColor: "#738496",
                                    borderRadius: 2,
                                    "& .MuiOutlinedInput-input": {
                                        padding: "6px 8px",
                                        fontSize: "0.875rem",
                                        wordBreak: 'break-word'
                                    },
                                }}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{ padding: "6px 12px", fontSize: "0.75rem", whiteSpace: 'nowrap' }}
                            >
                                Add
                            </Button>
                        </Box>
                    </Box>

                    <Box sx={{
                        flex: 1,
                        overflowY: 'auto',
                        pr: 1,
                        mt: 2
                    }}>
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
        </Box>
    )
}

export default AddChecklist

