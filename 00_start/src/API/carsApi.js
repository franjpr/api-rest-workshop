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