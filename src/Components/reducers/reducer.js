//boards reducer
export function boardReducer(state, action) {
  switch (action.type) {
    case "SET_BOARDS":
      return { ...state, name: action.payload }

    case "ADD_BOARD":
      return { ...state, name: [...state.name, action.payload] }

    case "TOGGLE_ADD_MODAL":
      return { ...state, isAdding: action.payload }

    default:
      return state
  }
}

//list reducer

export function listReducer(state, action) {
  switch (action.type) {
    case "SET_BOARD":
      return { ...state, board: action.payload }

    case "ADD_LIST":
      return { ...state, list: [...state.list, action.payload] }

    case "ADD_CARDS_PER_LIST": {
      const { lists, cards } = action.payload

      const cardsPerList = lists.reduce((acc, list) => {
        acc.push({
          ...list,
          cards: cards.filter((card) => card.idList === list.id),
        })
        return acc
      }, [])
      console.log(cardsPerList)

      return { ...state, list: cardsPerList }
    }

    case "POST_CARD_IN_LIST": {
      const { listID, newCard } = action.payload

      const updatedLists = state.list.map((listObj) => {
        if (listObj.id === listID) {
          return {
            ...listObj,
            cards: [...listObj.cards, newCard],
          }
        }
        return listObj
      })

      return { ...state, list: updatedLists }
    }

    case "DELETE_CARD": {
      const cardId = action.payload

      const updatedLists = state.list.map((listObj) => {
        return {
          ...listObj,
          cards: listObj.cards.filter((cardObj) => cardObj.id !== cardId),
        }
      })

      return { ...state, list: updatedLists }
    }

    case "ARCHIVE_LIST": {
      const updatedList = state.list.map((listObj) => {
        if (listObj.id === action.payload) {
          return {
            ...listObj,
            closed: true,
          }
        }
        return listObj
      })
      return { ...state, list: updatedList }
    }

    case "SET_CARD_ID":
      return { ...state, openCardId: action.payload }

    case "SET_ISLOADING":
      return { ...state, isLoading: action.payload }

    default:
      return state
  }
}

// card reducer
export function cardReducer(state, action) {
  switch (action.type) {
    case "SET_HOVERED_ID":
      return { ...state, hoveredId: action.payload }

    case "SET_SELECTED_CARD":
      return { ...state, isCard: action.payload }

    case "CLOSE_MODAL":
      return { ...state, isCard: null }

    default:
      return state
  }
}

//Addchecklist and checkitems reducer

export function addChecklistReducer(state, action) {
  switch (action.type) {
    case "SET_CHECKLIST":
      return { ...state, checklists: action.payload }

    case "SET_CHECKITEMS": {
      const checklistData = action.payload

      const groupedItems = checklistData.reduce((acc, checklist) => {
        acc[checklist.id] = checklist.checkItems || []
        return acc
      }, {})

      return { ...state, checkItems: groupedItems }
    }

    case "UPDATE_CHECKLIST":
      return { ...state, checklists: [...state.checklists, action.payload] }

    case "DELETE_CHECKLIST": {
      const checklistId = action.payload

      const updatedChecklists = state.checklists.filter(
        (checklist) => checklist.id !== checklistId
      )

      const remainingCheckItems = { ...state.checkItems }

      delete remainingCheckItems[checklistId]

      return {
        ...state,
        checklists: updatedChecklists,
        checkItems: remainingCheckItems,
      }
    }

    case "ADD_CHECKITEM_GROUP":
      return {
        ...state,
        checkItems: {
          ...state.checkItems,
          [action.payload]: [],
        },
      }

    case "SET_INPUTVALUE":
      return { ...state, listInputValue: action.payload }

    case "ADD_CHECK_ITEM": {
      const { checklistId, checkItem } = action.payload
      return {
        ...state,
        checkItems: {
          ...state.checkItems,
          [checklistId]: [...(state.checkItems[checklistId] || []), checkItem],
        },
      }
    }

    case "DELETE_CHECK_ITEM": {
      const { checklistId, checkItemId } = action.payload
      return {
        ...state,
        checkItems: {
          ...state.checkItems,
          [checklistId]: state.checkItems[checklistId].filter(
            (item) => item.id !== checkItemId
          ),
        },
      }
    }

    case "TOGGLE_CHECK_ITEM": {
      const { checklistId, checkItemId, currentState } = action.payload
      
      const newState = currentState === 'complete' ? 'incomplete' : 'complete'

      return {
        ...state,
        checkItems: {
          ...state.checkItems,
          [checklistId]: state.checkItems[checklistId].map((item) =>
            item.id === checkItemId ? { ...item, state: newState } : item
          ),
        },
      }
    }

    default:
      return state
  }
}
