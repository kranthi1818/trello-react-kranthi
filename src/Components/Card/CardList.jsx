import {
  Box,
  IconButton,
  Typography,
  TextField,
  Stack,
  Button
} from '@mui/material'

import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from 'react';


function CardList(
  { isOpen,
    onOpen,
    onClose,
    postCard,
    listID }
) {

  const [inputValue, setInputValue] = useState('')

  function handleAddCard() {
    console.log('hello')
    if (!inputValue.trim()) return

    postCard(inputValue, listID)
    onClose()
    setInputValue('')
  }


  return (
    <Box
      sx={{
        minWidth: 250,
        p: 1,
        borderRadius: 2,
        bgcolor: "black",
        marginTop: '1rem',
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {isOpen ? (
        <form onSubmit={(e) => {
          e.preventDefault()
          handleAddCard()
        }}>
          <TextField
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
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
                color: "white",
                paddingBottom: 4,
                wordBreak: 'break-word'
              },
            }}
          />
          <Stack direction="row" spacing={1} mt={1} alignItems="center">
            <Button type='submit'
              variant="contained"
              sx={{ padding: "4px", fontSize: "0.75rem", minWidth: "auto" }}
            >
              Add Card
            </Button>

            <IconButton size="small" onClick={onClose}>
              <CloseIcon
                sx={{
                  fontSize: "1rem",
                  color: "white",
                  "&:hover": { bgcolor: '#8E6D9F' },
                }}
              />
            </IconButton>
          </Stack>
        </form>
      ) : (
        <Box
          onClick={onOpen}
          sx={{
            display: "flex",
            alignItems: "center",
            height: "100%",
            cursor: "pointer",
            borderRadius: 1,
            "&:hover": { bgcolor: "#282F27" },
          }}
        >
          <IconButton size="small" sx={{ color: 'gray' }}>
            <AddIcon />
          </IconButton>
          <Typography variant="body2" sx={{ fontSize: "0.9rem", color: 'gray' }}>
            Add another Card
          </Typography>
        </Box>
      )}
    </Box>

  )
}

export default CardList