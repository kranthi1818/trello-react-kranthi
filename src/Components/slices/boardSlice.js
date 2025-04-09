import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: [],
    isAdding: false,
    inputValue:'',
    error:''
}

const boardSlice = createSlice({
    name:'board',

    initialState,

    reducers:{
        setBoards:(state,action)=>{
           state.name = action.payload
        },
        addBoards:(state,action)=>{
            state.name.push(action.payload)
        },
        addToggleModal:(state,action)=>{
            state.isAdding = action.payload
        },
        setError:(state,action)=>{
            state.error = action.payload
        }
    }
})

export const { setBoards,addBoards,addToggleModal,setInputValue ,setError} = boardSlice.actions

export default boardSlice.reducer

