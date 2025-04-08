
import { Box, Typography } from '@mui/material'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useReducer } from 'react';
import AddChecklist from '../checklist/AddChecklist';

import { cardReducer } from '../reducers/reducer';

function Card({ listObj, handleDeleteCard }) {
    const initialstate =
    {
        hoveredId: null,
        isCard: null,
        isOpen: false
    }
    const [state, dispatch] = useReducer(cardReducer, initialstate)

    const { hoveredId, isCard, isOpen } = state


    return (
        <Box>
            {listObj.cards.map(card => (

                <Box key={card.id}
                    onMouseEnter={() => dispatch({ type: 'SET_HOVERED_ID', payload: card.id })}

                    onMouseLeave={() => dispatch({ type: 'SET_HOVERED_ID', payload: null })}

                    sx={{ p: 1, bgcolor: "#333", borderRadius: 2, mt: 1, display: 'flex', justifyContent: 'space-between' }}>

                    <Box sx={{ width: '100%', height: '20px' }}
                        onClick={() => dispatch({ type: 'SET_SELECTED_CARD', payload: card })}

                    >
                        <Typography color='white'>{card.name}</Typography>
                    </Box>

                    {card.id && (
                        <Box>
                            {hoveredId == card.id && (
                                <Box size="small" color='white' height='20px'>
                                    <DeleteOutlineOutlinedIcon onClick={() => handleDeleteCard(card.id)}
                                        sx={{ cursor: 'pointer', "&:hover": { color: 'red' } }} />
                                </Box>
                            )}
                        </Box>

                    )}
                </Box>
            ))}

            {isCard &&
                <AddChecklist
                    isOpen={isOpen}
                    setIsopen={() => dispatch({ type: 'CLOSE_CHECKLIST' })}
                    setisCard={() => dispatch({ type: 'CLOSE_CHECKLIST' })}
                    isCard={isCard} />
            }
        </Box>
    )
}

export default Card

