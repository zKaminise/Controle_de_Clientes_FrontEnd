import axios from 'axios';

const api = axios.create({
    baseURL: 'controledeclientes-production.up.railway.app', // Substitua pela URL do backend
});

export default api;