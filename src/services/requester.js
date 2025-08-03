const request = async (method, url, data) => {
  try {
    const user = localStorage.getItem('auth');
    const auth = JSON.parse(user || '{}');

    const headers = {};
    if (auth.accessToken) {
      headers['X-Authorization'] = auth.accessToken;
    }

    let buildRequest;
    
    console.log(`[${method}] ${url}`);
    console.log('Headers:', headers);
    console.log('Data:', data);


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

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error ${response.status}: ${errorText}`);
    }

    const text = await response.text();

    if (!text) {
      throw new Error('Empty response from server');
    }

    try {
      return JSON.parse(text);
    } catch (err) {
      throw new Error('Invalid JSON: ' + err.message);
    }

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
