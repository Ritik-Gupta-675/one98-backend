import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:4000/api', // Update this in production
});

export default API;
