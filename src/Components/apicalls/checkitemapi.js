import axios from 'axios';

const BASE_URL = 'https://api.trello.com/1'

const APIKey = import.meta.env.VITE_APIkey
const APIToken = import.meta.env.VITE_APItoken

export async function createCheckItemAPI(checklistId, checkItemName) {
  const response = await axios.post(`${BASE_URL}/checklists/${checklistId}/checkItems`, null, {
    params: { name: checkItemName, key: APIKey, token: APIToken }
  });
  return response.data;
}

export async function deleteCheckItemAPI(cardId, checkItemId) {
  await axios.delete(`${BASE_URL}/cards/${cardId}/checkItem/${checkItemId}`, {
    params: { key: APIKey, token: APIToken }
  });
}

export async function toggleCheckItemAPI(cardId, itemId, currentState) {
  await axios.put(`${BASE_URL}/cards/${cardId}/checkItem/${itemId}`, null, {
    params: { state: currentState, key: APIKey, token: APIToken }
  });
}
