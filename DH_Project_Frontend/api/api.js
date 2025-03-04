// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api', // Asegúrate de que coincida con el puerto de tu backend
});

export default api;
