// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://pidhrodrigohuertos-production.up.railway.app/api',
});

export default api;
