import { configureStore } from "@reduxjs/toolkit";
import  boardReducer  from "../slices/boardSlice";
import listreducer from '../slices/listSlice'
import cardReducer from '../slices/cardSlice'
import checkListItemReducer from '../slices/checklistsCheckItemsSlice'

const store = configureStore({
    reducer:{
        board:boardReducer,
        list:listreducer,
        card:cardReducer,
        checkListItem:checkListItemReducer
    }
})

export default store

