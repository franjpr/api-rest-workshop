const axios = require('axios').default;
import { API_SERVER_URL } from '../const/const';


export const getAllCarsWithAxios = (authtoken) => {
  return axios.get(`${API_SERVER_URL}/cars/`, createHeaders(authtoken))
}

export const getCarByIdWithAxios = (id, authtoken) => {
  return axios.get(`${API_SERVER_URL}/cars/${id}`, createHeaders(authtoken));
}

export const addCarWithAxios = (data, authtoken) => {
  return axios.post(`${API_SERVER_URL}/cars/`, data, createHeaders(authtoken));
}

const createHeaders = (authtoken) => {
  const options = {
    headers: {
      'Authorization': `Bearer ${authtoken}`
    }
  }
  return options;
}