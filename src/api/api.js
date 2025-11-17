import axios from 'axios';
import { getToken } from '../utils/auth';

const api = axios.create({ baseURL: 'http://localhost:8080/api', timeout:10000 });

api.interceptors.request.use(cfg => {
  const t = getToken();
  if (t) cfg.headers.Authorization = `Bearer ${t}`;
  return cfg;
}, err => Promise.reject(err));

export default api;
