import React from 'react'
import Home from './Components/Boards/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import List from './Components/ListHome/List'

function App() {
  return (
    <div>
        <BrowserRouter> 
         <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/:boardId' element={<List/>}/>
         </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App  
