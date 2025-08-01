const request = async (method, url, data) => {
  try {
    const user = localStorage.getItem('auth');

    const auth = JSON.parse(user || '{}');

    const headers = {}
    if(auth.accessToken) {
      headers['X-Authorization'] = auth.accessToken;
    }

    let buildRequest;

    if (method === 'GET') {
      buildRequest = fetch(url, { headers });
    } else {
      buildRequest = fetch(url, {
        method,
        headers: {
          ...headers,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), 
      });
    }


    const response = await buildRequest;

    console.log(response)
    
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Request failed:', error);
    return undefined; 
  }
};

export const get = request.bind({}, 'GET');
export const post = request.bind({}, 'POST');
export const patch = request.bind({}, 'PATCH');
export const put = request.bind({}, 'PUT');
export const del = request.bind({}, 'DELETE');
