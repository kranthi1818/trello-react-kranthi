
//boards reducer

export function boardReducer(state, action) {
    if (action.type === 'SET_BOARDS') {
      return { ...state, name: action.payload };
    } 
    else if (action.type === 'ADD_BOARD') {
      return { ...state, name: [...state.name, action.payload] };
    } 
    else if (action.type === 'TOGGLE_ADD_MODAL') {
      return { ...state, isAdding: action.payload };
    } 
    else {
      return state;
    }
  }

  //list reducer

  export function listReducer(state, action) {
    if (action.type === 'SET_BOARD') {
      return { ...state, board: action.payload }

    } else if (action.type === 'ADD_LIST') {
      return { ...state, list: [...state.list, action.payload] }

    } else if (action.type === 'ADD_CARDS_PER_LIST') {
      return { ...state, list: action.payload }

    } else if (action.type === 'POST_CARD_IN_LIST') {
      return { ...state, list: action.payload }

    } else if (action.type === 'DELETE_CARD') {
      return { ...state, list: action.payload }

    } else if (action.type === 'ARCHIVE_LIST') {
      return { ...state, list: action.payload }

    } else if(action.type === 'SET_CARD_ID'){
        return {...state,openCardId:action.payload}
    }else if(action.type === 'SET_ISLOADING'){
        return ({...state,isLoading:action.payload})
    }
    else {
      return state;
    }
  }
  
  // card reducer
  export function cardReducer(state, action) {
  
    if (action.type === 'SET_HOVERED_ID') {
      return { ...state, hoveredId: action.payload }
    }
  
    if (action.type === 'SET_SELECTED_CARD') {
      return { ...state, isCard: action.payload, isOpen: true }
    }
  
    if (action.type === 'CLOSE_CHECKLIST') {
      return { ...state, isCard: null, isOpen: false }
    }
  
    return state
  }
  
  //Addchecklist and checkitems reducer

 export function addChecklistReducer(state,action){
    if(action.type === 'SET_CHECKLIST'){
        return {...state,checklists:action.payload}
    }else if(action.type === 'SET_CHECKITEMS'){
        return {...state,checkItems:action.payload}
    }else if (action.type === 'UPDATE_CHECKLIST') {
        return { ...state, checklists: [...state.checklists, action.payload] }
    }else if (action.type === 'ADD_CHECKITEM_GROUP') {
        return {
            ...state,
            checkItems: {
                ...state.checkItems,
                [action.payload]: [] 
            }
        }
    }else if (action.type === 'SET_INPUTVALUE') {
        return { ...state, listInputValue: action.payload };
    }else if (action.type === 'ADD_CHECK_ITEM') {
        const { checklistId, checkItem } = action.payload;
        return {
            ...state,
            checkItems: {
                ...state.checkItems,
                [checklistId]: [...(state.checkItems[checklistId] || []), checkItem]
            }
        };
    }

    else if (action.type === 'DELETE_CHECK_ITEM') {
        const { checklistId, checkItemId } = action.payload;
        return {
            ...state,
            checkItems: {
                ...state.checkItems,
                [checklistId]: state.checkItems[checklistId].filter(item => item.id !== checkItemId)
            }
        };
    }

    else if (action.type === 'TOGGLE_CHECK_ITEM') {
        const { checklistId, checkItemId, newState } = action.payload;
        return {
            ...state,
            checkItems: {
                ...state.checkItems,
                [checklistId]: state.checkItems[checklistId].map(item =>
                    item.id === checkItemId ? { ...item, state: newState } : item
                )
            }
        };
    }



    return state
 }