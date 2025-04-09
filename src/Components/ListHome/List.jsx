
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import AddList from '../AddList/AddList';
import { Loaders } from '../Card/Loaders'
import CardList from '../Card/CardList';
import Card from '../Card/Card' 
import {createList,createCard,removeCard,closeList} from '../apicalls/listapi'

import { Stack, Typography, Box, CssBaseline } from "@mui/material";
import ArchiveIcon from '@mui/icons-material/Archive';

import { useSelector, useDispatch } from 'react-redux';

import {
  setBoardName,
  addList,
  setCardId,
  setIsLoading,
  addCardsPerList,
  postCardInList,
  deletingSingleCard,
  archiveSingleList
} from '../slices/listSlice'

function List() {
  const { boardId } = useParams()

  const { list, board, isLoading, openCardId } = useSelector((state) => state.list)

  const dispatch = useDispatch()

  useEffect(() => {
    async function fetchBoard() {
      try {

        const { boards, lists, cards } = await Loaders(boardId)

        dispatch(setBoardName(boards))

        dispatch(addCardsPerList({ lists, cards }))

      } catch (error) {
        console.log(error)
      }
    }
    fetchBoard()
  }, [boardId])


  async function postLists(listName) {
    try {
      const response = await createList(listName, boardId);
      dispatch(addList({ ...response, cards: [] }));
    } catch (error) {
      console.log(error);
    }
  }
  
  async function postCard(cardName, listID) {
    try {
      const response = await createCard(cardName, listID);
      const newCard = response;
      dispatch(postCardInList({ listID, newCard }));
    } catch (error) {
      console.log('Error creating card:', error);
    }
  }
  
  async function deleteCard(cardId) {
    try {
      await removeCard(cardId);
      dispatch(deletingSingleCard(cardId));
    } catch (error) {
      console.log(error);
    }
  }
  
  async function archiveList(listID) {
    try {
      const updatedID = await closeList(listID);
      dispatch(archiveSingleList(updatedID));
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
                    dispatch(setCardId(item.id))
                    dispatch(setIsLoading(false))

                  }}
                  onClose={() => dispatch(setCardId(null))}
                />
                
              </Box>

            ))}
          </Stack>

          <AddList isLoading={isLoading} postLists={postLists} />

        </Box>
      </Box>
    </>
  )
}

export default List
