import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_POKEMON_TVG_API_BASE_URL;
axios.defaults.headers.common['X-Api-Key'] = 'Bearer ' + import.meta.env.VITE_POKEMON_TCG_API_KEY;

export default axios;