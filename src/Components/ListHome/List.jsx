
import { useEffect, useReducer } from 'react'
import { useParams } from 'react-router-dom'
import AddList from '../AddList/AddList';
import { getCards } from '../Card/getCards';
import CardList from '../Card/CardList';
import Card from '../Card/Card'

import axios from 'axios'

import {
  Stack,
  Typography,
  Box,
  CssBaseline
} from "@mui/material";

import ArchiveIcon from '@mui/icons-material/Archive';
import { listReducer } from '../reducers/reducer';


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

  const APIKey = import.meta.env.VITE_APIkey
  const APIToken = import.meta.env.VITE_APItoken

  useEffect(() => {
    async function fetchBoard() {
      try {

        const { board, lists, cards } = await getCards(boardId)

        let cardsPerList = lists.reduce(function (acc, list) {
          acc.push({
            ...list,
            cards: cards.filter(function (card) {
              return card.idList === list.id;
            })
          });
          return acc;
        }, []);


        dispatch({ type: 'SET_BOARD', payload: board })
        dispatch({ type: 'ADD_CARDS_PER_LIST', payload: cardsPerList })

      } catch (error) {
        console.log(error)
      }
    }
    fetchBoard()
  }, [boardId])


  async function postLists(listName) {
    try {
      const response = await axios.post(`https://api.trello.com/1/lists?key=${APIKey}&token=${APIToken}`, {
        name: listName,
        idBoard: boardId
      });

      dispatch({ type: 'ADD_LIST', payload: { ...response.data, cards: [] } })

    } catch (error) {
      console.log(error)
    }
  }

  async function postCard(cardName, listID) {
    try {
      const response = await axios.post(
        `https://api.trello.com/1/cards?key=${APIKey}&token=${APIToken}`,
        {
          name: cardName,
          idList: listID
        }
      );

      const newCard = response.data;

      const updatedList = list.map((listObj) => {
        if (listID === listObj.id) {
          return {
            ...listObj,
            cards: [...listObj.cards, newCard],
          };
        }
        return listObj;
      });

      dispatch({ type: 'POST_CARD_IN_LIST', payload: updatedList });

      return newCard;
    } catch (error) {
      console.log('Error creating card:', error);
    }
  }
  async function deleteCard(cardId) {
    try {
      await axios.delete(`https://api.trello.com/1/cards/${cardId}?key=${APIKey}&token=${APIToken}`)


      const updatedCards = list.map((listObj) => {
        return {
          ...listObj,
          cards: listObj.cards.filter((cardObj) => cardObj.id !== cardId),
        };
      });

      dispatch({ type: 'DELETE_CARD', payload: updatedCards })
    } catch (error) {
      console.log(error)
    }
  }

  async function archiveList(listID) {
    console.log(listID)

    try {
      const response = await axios.put(`https://api.trello.com/1/lists/${listID}/closed?key=${APIKey}&token=${APIToken}`, {
        value: true
      })

      const updatedID = response.data.id;

      const updatedList = list.map((listObj) => {
        if (listObj.id === updatedID) {
          return {
            ...listObj,
            closed: true,
          };
        }
        return listObj;
      });

      dispatch({ type: 'ARCHIVE_LIST', payload: updatedList })

      console.log(response)
    } catch (error) {
      console.log(error)
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
