

import { Box, Typography, LinearProgress, Button } from "@mui/material"
import CheckItem from "../Checkitems/CheckItem"
import { useSelector } from "react-redux"

function CheckList({ deleteChecklist }) {

    const { isCard } = useSelector((state) => state.card)
    const { checklists, checkItems } = useSelector((state) => state.checkListItem)


    function calculateProgress(checkItems) {
        if (checkItems.length === 0) return 0;

        const completed = checkItems.filter(item => item.state === 'complete').length;
        const total = checkItems.length;

        return Math.floor((completed / total) * 100);
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {checklists.map((item) => (
                <Box
                    key={item.id}
                    sx={{
                        p: 2,
                        borderRadius: 2,
                        backgroundColor: '#2c333a',
                        boxShadow: 3,
                    }}
                >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography
                            sx={{
                                fontSize: '1.2rem',
                                fontWeight: '600',
                                color: '#ffffff',
                            }}
                        >
                            {item.name}
                        </Typography>

                        <Button
                            onClick={() => deleteChecklist(item.id)}
                            sx={{
                                backgroundColor: '#d32f2f',
                                textTransform: 'none',
                                fontSize: '0.75rem',
                                px: 2,
                                py: 0.5,
                                '&:hover': {
                                    backgroundColor: '#b71c1c',
                                },
                            }}
                            variant="contained"
                        >
                            Delete
                        </Button>
                    </Box>

                    {/* Progress Bar */}
                    <Box sx={{ mt: 2 }}>
                        <Typography
                            variant="caption"
                            sx={{ color: '#cccccc', mb: 0.5, ml: 0.2 }}
                        >
                            {calculateProgress(checkItems[item.id])}%
                        </Typography>
                        <LinearProgress
                            variant="determinate"
                            value={calculateProgress(checkItems[item.id])}
                            sx={{
                                height: 6,
                                borderRadius: 1,
                                backgroundColor: '#424242',
                                '& .MuiLinearProgress-bar': {
                                    backgroundColor: '#03dac5',
                                },
                            }}
                        />
                    </Box>

                    <Box sx={{ mt: 2 }}>
                        <CheckItem
                            isCardId={isCard.id}
                            checkItems={checkItems[item.id]}
                            checklistId={item.id}
                        />
                    </Box>
                </Box>
            ))}
        </Box>
    )
}

export default CheckList