const baseUrl = 'http://localhost:3030';

export const getAll = async () => {
    const response = await fetch('http://localhost:3030/jsonstore/games'); 
    const data = await response.json();
    return Object.values(data); 
};

