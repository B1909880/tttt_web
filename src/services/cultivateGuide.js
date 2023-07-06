import axios from 'axios';

const API_URL = 'http://localhost:8098/cultivateGuide/';

export const getcultivateGuide = () => {
  return axios.get(API_URL);
};

export const createcultivateGuide = (cultivateGuide) => {
  return axios.post(`${API_URL}post`, cultivateGuide);
};

export const updatecultivateGuide = (cultivateGuideId, cultivateGuide) => {
  return axios.put(`${API_URL}${cultivateGuideId}`, cultivateGuide);
};

export const deletecultivateGuide = (cultivateGuideId) => {
  return axios.delete(`${API_URL}${cultivateGuideId}`);
};

export const getCultivateGuideByName = (name) => {
  const url = `${API_URL}name/${name}`;
  return axios.get(url);
};

