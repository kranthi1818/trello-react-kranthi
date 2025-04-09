import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  checklists: [],
  listInputValue: "",
  checkItems: {},
}

const checklistItemsSlice = createSlice({
  name: "checklistItem",
  initialState,
  reducers: {
    setCheckList: (state, action) => {
      state.checklists = action.payload
    },

    setCheckItems: (state, action) => {
      const checklistData = action.payload
      const groupedItems = checklistData.reduce((acc, checklist) => {
        acc[checklist.id] = checklist.checkItems || []
        return acc
      }, {})
      state.checkItems = groupedItems
    },

    updateCheckLists: (state, action) => {
      state.checklists.push(action.payload)
    },

    deleteCheckList: (state, action) => {
      const checklistId = action.payload
      state.checklists = state.checklists.filter((c) => c.id !== checklistId)
      delete state.checkItems[checklistId]
    },

    addCheckItemGroup: (state, action) => {
      const checklistId = action.payload
      state.checkItems[checklistId] = []
    },

    addCheckItem: (state, action) => {
      const { checklistId, checkItem } = action.payload
      if (!state.checkItems[checklistId]) {
        state.checkItems[checklistId] = []
      }
      state.checkItems[checklistId].push(checkItem)
    },

    deleteCheckItem: (state, action) => {
      const { checklistId, checkItemId } = action.payload
      state.checkItems[checklistId] = state.checkItems[checklistId].filter(
        (item) => item.id !== checkItemId
      )
    },

    toggleCheckItem: (state, action) => {
      const { checklistId, checkItemId, currentState } = action.payload
      const newState = currentState === "complete" ? "incomplete" : "complete"

      state.checkItems[checklistId] = state.checkItems[checklistId].map(
        (item) =>
          item.id === checkItemId ? { ...item, state: newState } : item
      )
    },
  },
})

export const {
  setCheckList,
  setCheckItems,
  updateCheckLists,
  deleteCheckList,
  addCheckItemGroup,
  setInputValue,
  addCheckItem,
  deleteCheckItem,
  toggleCheckItem,
} = checklistItemsSlice.actions

export default checklistItemsSlice.reducer
