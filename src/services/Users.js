import axios from 'axios';

 const API_URL = 'http://localhost:8098';

export default {
  getUsers() {
    return axios.get(`${API_URL}/auth/`);
  },
  registerUser(user) {
    return axios.post(`${API_URL}/auth/register`, user);
  },
  deleteUser(userId) {
    return axios.delete(`${API_URL}/auth/${userId}`);
  },
  searchUsersByName(name) {
    return axios.get(`${API_URL}/auth/name?name=${name}`);
  }
};
