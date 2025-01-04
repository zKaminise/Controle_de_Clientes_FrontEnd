import axios from 'axios';

const api = axios.create({
    baseURL: 'https://controledeclientes-production.up.railway.app',
});

export default api;

// import axios from 'axios';

// const api = axios.create({
//     baseURL: 'http://localhost:8080',
// });

// export default api;