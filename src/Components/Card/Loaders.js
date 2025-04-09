import axios from "axios"

export async function Loaders(boardId) {
  const APIKey = import.meta.env.VITE_APIkey
  const APIToken = import.meta.env.VITE_APItoken

  async function getBoard() {
    try {
      const response = await axios.get(
        `https://api.trello.com/1/boards/${boardId}`,
        {
          params: {
            key: APIKey,
            token: APIToken,
          },
        }
      )
      return response.data
    } catch (error) {
      console.error("Error fetching board:", error)
      return null
    }
  }

  async function getLists() {
    try {
      const response = await axios.get(
        `https://api.trello.com/1/boards/${boardId}/lists`,
        {
          params: {
            key: APIKey,
            token: APIToken,
          },
        }
      )
      return response.data
    } catch (error) {
      console.error("Error fetching lists:", error)
      return []
    }
  }

  async function loaders() {
    try {
      const response = await axios.get(
        `https://api.trello.com/1/boards/${boardId}/cards`,
        {
          params: {
            key: APIKey,
            token: APIToken,
          },
        }
      )
      return response.data
    } catch (error) {
      console.error("Error fetching cards:", error)
      return []
    }
  }

  const results = await Promise.all([getBoard(), getLists(), loaders()])

  const boards = results[0]
  const lists = results[1]
  const cards = results[2]

  return {
    boards: boards,
    lists: lists,
    cards: cards,
  }
}
