const axios = require('axios').default;

const baseUrl = 'http://localhost:3050';
const apiEndpoint = '/api/cars/';

export const getAllCarsWithAxios = () => {
  return axios.get(`${baseUrl}${apiEndpoint}`)
}

export const getCarByIdWithAxios = (id) => {
  return axios.get(`${baseUrl}${apiEndpoint}${id}`);
}

export const addCarWithAxios = (data) => {
  return axios.post(`${baseUrl}${apiEndpoint}`, data);
}

export const getAllCarsWithFetch = () => {
  return fetch(`${baseUrl}${apiEndpoint}`);
}

export const getCarByIdWithFetch = (id) => {
  return fetch(`${baseUrl}${apiEndpoint}${id}`);
}

export const addCarWithFetch = (data) => {
  const stringifiedBody = JSON.stringify(data);
  const options = {
    method: 'POST',
    body: stringifiedBody,
    headers: {
      'Content-Type': 'application/json'
    }
  };
  return fetch(`${baseUrl}${apiEndpoint}`, options);
}
