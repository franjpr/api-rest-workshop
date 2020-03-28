import { API_SERVER_URL } from '../const/const';

export const getAllCarsWithFetch = (authToken) => {
  const options = createHeaders(authToken);

  return fetch(`${API_SERVER_URL}/cars/`, options);
}

export const getCarByIdWithFetch = (id, authToken) => {
  const options = createHeaders(authToken);
  return fetch(`${API_SERVER_URL}/cars/${id}`, options);
}

export const addCarWithFetch = (data, authToken) => {
  const stringifiedBody = JSON.stringify(data);

  const options = {
    method: 'POST',
    body: stringifiedBody,
    headers: {
      'Content-Type': 'application/json'
    },
    ...createHeaders(authToken)
  };

  return fetch(`${API_SERVER_URL}/cars/`, options);
}


const createHeaders = (authtoken) => {
  const options = {
    headers: {
      'Authorization': `Bearer ${authtoken}`
    }
  }
  return options;
}