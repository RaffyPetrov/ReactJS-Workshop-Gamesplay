import * as request from './requester.js'

const baseUrl = 'http://localhost:3030';

export const getAll = async () => {
  const data = await request.get(`${baseUrl}/jsonstore/games`);
  return data ? Object.values(data) : [];
};

export const create = (gameData) => request.post(`${baseUrl}/jsonstore/games`, gameData);
