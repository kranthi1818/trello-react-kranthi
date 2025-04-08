import axios from "axios";

export async function getCards(boardId) {
  const APIKey = import.meta.env.VITE_APIkey;
  const APIToken = import.meta.env.VITE_APItoken;


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
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching board:", error);
      return null;
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
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching lists:", error);
      return [];
    }
  }

  async function getCards() {
    try {
      const response = await axios.get(
        `https://api.trello.com/1/boards/${boardId}/cards`,
        {
          params: {
            key: APIKey,
            token: APIToken,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching cards:", error);
      return [];
    }
  }

  const [board, lists, cards] = await Promise.all([getBoard(), getLists(), getCards()]);

  return {
    board: board,
    lists: lists,
    cards: cards
  };
  
}
