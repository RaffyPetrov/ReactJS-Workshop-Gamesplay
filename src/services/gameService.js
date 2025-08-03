import * as request from './requester.js'

const baseUrl = 'http://localhost:3030/data/games';

export const getAll = async () => {
  const data = await request.get(baseUrl);

  return data
    ? Object.entries(data).map(([id, game]) => ({ ...game, _id: id }))
    : [];
};

export const getOne = (gameId) => request.get(`${baseUrl}/${gameId}`);


export const create = (gameData) => request.post(baseUrl, gameData);

export const edit = (gameId, gameData) => request.put(`${baseUrl}/${gameId}`, gameData);

export const remove = (gameId) => request.del(`${baseUrl}/${gameId}`);
