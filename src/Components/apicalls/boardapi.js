import axios from 'axios';

const APIKey = import.meta.env.VITE_APIkey;
const APIToken = import.meta.env.VITE_APItoken;

async function fetchingAllBoards() {
    const response = await axios.get(
        'https://api.trello.com/1/members/me/boards',
        {
            params: {
                key: APIKey,
                token: APIToken
            }
        }
    );
    return response.data;
}

async function postingSingleBoard(boardsName) {
    const response = await axios.post(
        'https://api.trello.com/1/boards/',
        { name: boardsName },
        {
            params: {
                key: APIKey,
                token: APIToken
            }
        }
    );
    return response.data;
}

export { postingSingleBoard, fetchingAllBoards };
