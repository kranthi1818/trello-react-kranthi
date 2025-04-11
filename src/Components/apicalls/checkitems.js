
import axios from 'axios';

const APIKey = import.meta.env.VITE_APIkey
const APIToken = import.meta.env.VITE_APItoken


export async function createCheckItemOnChecklist(checklistId, checkItemName) {
    const response = await axios.post(
      `https://api.trello.com/1/checklists/${checklistId}/checkItems`,
      null,
      {
        params: {
          name: checkItemName,
          key: APIKey,
          token: APIToken
        }
      }
    );
    return response.data;
  }
  
  export async function deleteCheckItemFromCard(checkItemId, cardId) {
    await axios.delete(
      `https://api.trello.com/1/cards/${cardId}/checkItem/${checkItemId}`,
      {
        params: {
          key: APIKey,
          token: APIToken
        }
      }
    );
  }
  
  export async function toggleCheckItemState(cardId, checkItemId, currentState) {
    await axios.put(
      `https://api.trello.com/1/cards/${cardId}/checkItem/${checkItemId}`,
      null,
      {
        params: {
          state: currentState,
          key: APIKey,
          token: APIToken
        }
      }
    );
  }