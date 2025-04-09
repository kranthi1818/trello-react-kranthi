
import { Box, Typography } from '@mui/material'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AddChecklist from '../checklist/AddChecklist';

import { useSelector, useDispatch } from 'react-redux';
import { setHoverId, setSelectedCard } from '../slices/cardSlice'


function Card({ listObj, handleDeleteCard }) {

    const dispatch = useDispatch()
    const { hoveredId, isCard } = useSelector((state) => state.card)

    return (
        <Box>
            {listObj.cards.map(card => (

                <Box key={card.id}
                    onMouseEnter={() => dispatch(setHoverId(card.id))}

                    onMouseLeave={() => dispatch(setHoverId(null))}

                    sx={{ p: 1, bgcolor: "#333", borderRadius: 2, mt: 1, display: 'flex', justifyContent: 'space-between' }}>

                    <Box sx={{ width: '100%', height: '20px' }}
                        onClick={() => dispatch(setSelectedCard(card))}

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

            {isCard && <AddChecklist />}

        </Box>
    )
}

export default Card



