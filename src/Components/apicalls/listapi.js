import axios from 'axios'


const APIKey = import.meta.env.VITE_APIkey
const APIToken = import.meta.env.VITE_APItoken

export async function createNewList(listName, boardId) {
  const response = await axios.post(`https://api.trello.com/1/lists?key=${APIKey}&token=${APIToken}`, {
    name: listName,
    idBoard: boardId
  })
  return response.data
}

export async function createNewCard(cardName, listID) {
  const response = await axios.post(
    `https://api.trello.com/1/cards?key=${APIKey}&token=${APIToken}`,
    {
      name: cardName,
      idList: listID
    }
  );
  return response.data;
}

export async function removeCard(cardId) {
  await axios.delete(
    `https://api.trello.com/1/cards/${cardId}`,
    {
      params: {
        key: APIKey,
        token: APIToken
      }
    }
  );
}

export async function closeListById(listID) {
  const response = await axios.put(
    `https://api.trello.com/1/lists/${listID}/closed`,
    { value: true },
    {
      params: {
        key: APIKey,
        token: APIToken
      }
    }
  )
  return response.data.id
}

async function archiveList(listID) {
    try {
      const updatedID = await closeListById(listID);
      dispatch({ type: 'ARCHIVE_LIST', payload: updatedID });
    } catch (error) {
      console.log(error);
    }
  }