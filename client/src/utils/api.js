import axios from 'axios';

// import { getStoredAuthToken } from "./auth.js";

const defaults = {
  baseURL: import.meta.env.VITE_APP_API_URL || 'http://localhost:3000/',
  // headers: () => ({
  //     'Content-Type': 'application/json',
  //     // 'Accept': 'application/json',
  //     // Authorization: getStoredAuthToken() ? `Bearer ${getStoredAuthToken()}` : undefined,
  // })
  headers: {
    'Content-Type': 'application/json'
  }
};

const api = async (method, url, variables) => {
  console.log('-----URL-----', `${defaults.baseURL}${url}`);
  return await axios.request({
    method,
    url: `${defaults.baseURL}${url}`,
    headers: defaults.headers,
    params: method === 'get' ? variables : undefined,
    data: method !== 'get' ? variables : undefined
    // paramsSerializer:
  });
};

export default {
  get: (...args) => api('get', ...args),
  post: (...args) => api('post', ...args),
  put: (...args) => api('put', ...args),
  patch: (...args) => api('patch', ...args),
  delete: (...args) => api('delete', ...args)
};
// export default api;
