import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  board: null,
  list: [],
  isLoading: false,
  openCardId: null,
}

const listSlice = createSlice({
  name: "list",
  initialState,

  reducers: {
    setBoardName: (state, action) => {
      state.board = action.payload
    },

    addList: (state, action) => {
      state.list.push(action.payload)
    },
    setCardId: (state, action) => {
      state.openCardId = action.payload
    },

    setIsLoading: (state, action) => {
      state.isLoading = action.payload
    },

    addCardsPerList: (state, action) => {
      const { lists, cards } = action.payload

      lists.forEach((list) => {
        list.cards = cards.filter((card) => card.idList === list.id)
      })

      state.list = lists
    },

    postCardInList: (state, action) => {
      const { listID, newCard } = action.payload

      const list = state.list.find((lis) => lis.id === listID)

      if (list) {
        if (!list.cards) {
          list.cards = []
        }
        list.cards.push(newCard)
      }
    },

    deletingSingleCard: (state, action) => {
      const cardId = action.payload

      state.list.forEach((list) => {
        if (list.cards) {
          list.cards = list.cards.filter((card) => card.id !== cardId)
        }
      })
    },

    archiveSingleList: (state, action) => {
      const list = state.list.find((lis) => lis.id === action.payload)
      if (list) {
        list.closed = true
      }
    },
  },
})

export const {
  setBoardName,
  addList,
  setCardId,
  setIsLoading,
  addCardsPerList,
  postCardInList,
  deletingSingleCard,
  archiveSingleList,
  
} = listSlice.actions

export default listSlice.reducer
