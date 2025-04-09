
import axios from 'axios';

const BASE_URL = 'https://api.trello.com/1';

const APIKey = import.meta.env.VITE_APIkey
const APIToken = import.meta.env.VITE_APItoken

export async function fetchChecklists(cardId) {
  const response = await axios.get(`${BASE_URL}/cards/${cardId}/checklists`, {
    params: { key: APIKey, token: APIToken }
  });
  return response.data;
}

export async function createChecklist(cardId, listName) {
  const response = await axios.post(`${BASE_URL}/cards/${cardId}/checklists`, null, {
    params: { key: APIKey, token: APIToken, name: listName }
  });
  return response.data;
}

export async function removeChecklist(checklistID) {
  await axios.delete(`${BASE_URL}/checklists/${checklistID}`, {
    params: { key: APIKey, token: APIToken }
  });
  return checklistID;
}
