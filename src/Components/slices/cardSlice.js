import { createSlice } from "@reduxjs/toolkit";

const initialState = { hoveredId: null, isCard: null }

const cardSlice = createSlice({
    name:'card',
    initialState,
    reducers:{
        setHoverId:(state,action)=>{
            state.hoveredId = action.payload
        },
        setSelectedCard:(state,action)=>{
            state.isCard = action.payload
        },
        closeCardModal:(state,action)=>{
            state.isCard = action.payload
        }
    }
})

export const {setHoverId,setSelectedCard,closeCardModal} = cardSlice.actions
export default cardSlice.reducer