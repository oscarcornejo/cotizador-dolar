import axios from 'axios';

const API = axios.create({
    baseURL:  'https://api.sbif.cl/api-sbifv3/recursos_api'
});

export default API;