
import { useEffect, useReducer } from 'react'
import { useParams } from 'react-router-dom'
import AddList from '../AddList/AddList';
import {Loaders} from '../Card/Loaders'
import CardList from '../Card/CardList';
import Card from '../Card/Card'

import {
  Stack,
  Typography,
  Box,
  CssBaseline
} from "@mui/material";

import ArchiveIcon from '@mui/icons-material/Archive';
import { listReducer } from '../reducers/reducer';
import {
  createNewList,
  createNewCard,
  removeCard,
  closeListById
} from '../apicalls/listapi'


function List() {
  const { boardId } = useParams()

  const initialstate = {
    board: null,
    list: [],
    isLoading: false,
    openCardId: null

  }
  const [state, dispatch] = useReducer(listReducer, initialstate)

  const { board, list, isLoading, openCardId } = state;


  useEffect(() => {
    async function fetchBoard() {
      try {

        const { board, lists, cards } = await Loaders(boardId)

        dispatch({ type: 'SET_BOARD', payload: board })

        dispatch({
          type: 'ADD_CARDS_PER_LIST', payload: { lists, cards }
        })

      } catch (error) {
        console.log(error)
      }
    }
    fetchBoard()
  }, [boardId])


  async function postLists(listName) {
    try {
      const response = await createNewList(listName, boardId);
      dispatch({ type: 'ADD_LIST', payload: { ...response, cards: [] } });
    } catch (error) {
      console.log(error);
    }
  }
  
  async function postCard(cardName, listID) {
    try {
      const newCard = await createNewCard(cardName, listID);
      dispatch({ type: 'POST_CARD_IN_LIST', payload: { listID, newCard } });
    } catch (error) {
      console.log('Error creating card:', error);
    }
  }
  
  async function deleteCard(cardId) {
    try {
      await removeCard(cardId);
      dispatch({ type: 'DELETE_CARD', payload: cardId });
    } catch (error) {
      console.log(error);
    }
  }

  async function archiveList(listID) {
    try {
      const updatedID = await closeListById(listID);
      dispatch({ type: 'ARCHIVE_LIST', payload: updatedID });
    } catch (error) {
      console.log(error);
    }
  }
  

  return (
    <>
      <CssBaseline />
      <Box sx={{
        bgcolor: "#B8ACF6",
        height: "100vh",
        minWidth: "100vw",
        overflowX: "auto",
        overflowY: "hidden"
      }}>

        <Typography variant="h5" color="black" sx={{ p: 2 }}>
          {board ? board.name : "Loading..."}
        </Typography>

        <Box sx={{ display: "flex", gap: 1, alignSelf: "flex-start" }}>

          <Stack spacing={1} alignItems="flex-start" direction="row" sx={{ display: 'flex', p: 1 }}>
            {list.filter((item) => !item.closed).map((item) => (
              <Box
                key={item.id}
                sx={{
                  p: 2,
                  border: "1px solid #ddd",
                  borderRadius: 2,
                  minWidth: 200,
                  bgcolor: "black",
                  alignSelf: "flex-start"
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', color: 'white' }}>
                  <Typography variant="body1">{item.name}</Typography>
                  <ArchiveIcon onClick={() => archiveList(item.id)} sx={{ cursor: 'pointer', "&:hover": { color: 'red' } }} />
                </Box>

                <Card listObj={item} handleDeleteCard={deleteCard} />
                <CardList postCard={postCard} listID={item.id}
                  isOpen={openCardId === item.id}
                  onOpen={() => {

                    dispatch({ type: 'SET_CARD_ID', payload: item.id })
                    dispatch({ type: 'SET_ISLOADING', payload: false })

                  }}
                  onClose={() => dispatch({ type: 'SET_CARD_ID', payload: null })}
                />
              </Box>
            ))}
          </Stack>
          <AddList setOpenCardId={openCardId} isLoading={isLoading} dispatch={dispatch} postLists={postLists} />
        </Box>
      </Box>
    </>
  )
}

export default List
