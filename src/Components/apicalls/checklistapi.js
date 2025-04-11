import axios from 'axios';

const APIKey = import.meta.env.VITE_APIkey
const APIToken = import.meta.env.VITE_APItoken


export async function fetchCardChecklists(cardId) {
  const response = await axios.get(
    `https://api.trello.com/1/cards/${cardId}/checklists`,
    {
      params: { key: APIKey, token: APIToken }
    }
  );
  return response.data;
}

export async function createChecklist(cardId, listName) {
  const response = await axios.post(
    `https://api.trello.com/1/cards/${cardId}/checklists`,
    null,
    {
      params: { key: APIKey, token: APIToken, name: listName }
    }
  );
  return response.data;
}

export async function removeChecklist(checklistID) {
  await axios.delete(
    `https://api.trello.com/1/checklists/${checklistID}`,
    {
      params: { key: APIKey, token: APIToken }
    }
  );
}
