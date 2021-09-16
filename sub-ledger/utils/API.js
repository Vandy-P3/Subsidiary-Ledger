// route to get logged in user's info (needs the token)
export const getMe = (token) => {
    return fetch('/api/users/me', {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    });
  };
  
export const createUser = (userData) => {
    return fetch('/api/users', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
};

export const loginUser = (userData) => {
    return fetch('/api/users/login', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
};

// save book data for a logged in user
export const addAsset = (assetData, token) => {
    return fetch('/api/users', {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(assetData),
    });
};

// remove saved book data for a logged in user
export const deleteBook = (assetId, token) => {
    return fetch(`/api/users/assets/${assetId}`, {
        method: 'DELETE',
        headers: {
        authorization: `Bearer ${token}`,
        },
    });
};