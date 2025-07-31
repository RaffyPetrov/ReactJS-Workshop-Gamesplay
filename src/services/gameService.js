import { get, post, put, del } from './requester.js';

const baseUrl = 'http://localhost:3030';

export const getAll = async () => {
  const data = await get(`${baseUrl}/jsonstore/games`);
  return data ? Object.values(data) : [];
};
