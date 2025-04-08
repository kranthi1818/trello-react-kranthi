

import { Box, Typography,LinearProgress,Button } from "@mui/material"
import CheckItem from "../Checkitems/CheckItem"

function CheckList({ checklists,
    checkItems,
    dispatcher,
    isCard,
    deleteChecklist
}) {

    function calculateProgress(checkItems) {
        if (checkItems.length === 0) return 0;

        const completed = checkItems.filter(item => item.state === 'complete').length;
        const total = checkItems.length;

        return Math.floor((completed / total) * 100);
    }

    return (
        <Box>
            {checklists.map((item) => (
                // checklist name delete icon

                <Box key={item.id}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 2 }}>
                        <Typography sx={{ margin: 1, fontSize: '1.4rem', fontWeight: 'bold' }}>{item.name}</Typography>

                        <Button onClick={() => { deleteChecklist(item.id) }}
                            sx={{ cursor: 'pointer', "&:hover": { backgroundColor: '#b71c1c' } }}
                            variant='contained'>Delete</Button>
                    </Box>

                    {/* progress Bar */}
                    <Box>
                        <Typography marginLeft='1rem' variant="caption"> {calculateProgress(checkItems[item.id])}%</Typography>
                        <LinearProgress
                            variant="determinate"
                            value={calculateProgress(checkItems[item.id])}

                            sx={{ bgcolor: "gray", height: 5, my: 1 }}
                        />
                    </Box>
                    <Box>
                        <CheckItem 
                        dispatcher={dispatcher}
                        isCardId={isCard.id} 
                        checkItems={checkItems[item.id]} 
                        checklistId={item.id} />
                    </Box>
                </Box>
            ))}
        </Box>
    )
}

export default CheckList