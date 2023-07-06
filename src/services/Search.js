import axios from 'axios';

const API_URL = 'http://localhost:8098/search/';

export const getSearches = () => {
  return axios.get(API_URL);
};

export const createSearch = (search) => {
  return axios.post(`${API_URL}post`, search);
};

export const updateSearch = (searchId, search) => {
  return axios.put(`${API_URL}${searchId}`, search);
};

export const deleteSearch = (searchId) => {
  return axios.delete(`${API_URL}${searchId}`);
};

export const searchByName = (name) => {
  const url = `${API_URL}name?name=${name}`;
  return axios.get(url);
};

export const searchByParams = (params) => {
  return axios.get(`${API_URL}searches`, { params });
};
