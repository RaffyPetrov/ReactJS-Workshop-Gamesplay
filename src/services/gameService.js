import * as request from './requester.js'

const baseUrl = 'http://localhost:3030/jsonstore/games/';

export const getAll = async () => {
  const data = await request.get(baseUrl);
  return data ? Object.values(data) : [];
};

export const getOne = (gameId) => request.get(`${baseUrl}/${gameId}`);

export const create = (gameData) => request.post(baseUrl, gameData);

export const edit = (gameId, gameData) => request.put(`${baseUrl}/${gameId}`, gameData);
