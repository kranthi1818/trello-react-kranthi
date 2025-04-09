// src/api/boardApi.js
import axios from "axios"

const APIKey = import.meta.env.VITE_APIkey
const APIToken = import.meta.env.VITE_APItoken

const BASE_URL = "https://api.trello.com/1"

export async function fetchBoards() {
  const response = await axios.get(`${BASE_URL}/members/me/boards`, {
    params: { key: APIKey, token: APIToken },
  })
  return response.data
}

export async function createBoard(boardName) {
  const response = await axios.post(
    `${BASE_URL}/boards/`,
    { name: boardName },
    {
      params: { key: APIKey, token: APIToken },
    }
  )
  return response.data
}
