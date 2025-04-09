
import axios from 'axios';

const BASE_URL = 'https://api.trello.com/1';

const APIKey = import.meta.env.VITE_APIkey
const APIToken = import.meta.env.VITE_APItoken

export async function createList(listName, boardId) {
    const response = await axios.post(`${BASE_URL}/lists`, {
        name: listName,
        idBoard: boardId
    }, {
        params: { key: APIKey, token: APIToken }
    });
    return response.data;
}

export async function createCard(cardName, listID) {
    const response = await axios.post(`${BASE_URL}/cards`, {
        name: cardName,
        idList: listID
    }, {
        params: { key: APIKey, token: APIToken }
    });
    return response.data;
}

export async function removeCard(cardId) {
    await axios.delete(`${BASE_URL}/cards/${cardId}`, {
        params: { key: APIKey, token: APIToken }
    });
    return cardId;
}

export async function closeList(listID) {
    const response = await axios.put(`${BASE_URL}/lists/${listID}/closed`, {
        value: true
    }, {
        params: { key: APIKey, token: APIToken }
    });
    return response.data.id;
}
