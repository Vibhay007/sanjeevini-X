import axios from 'axios';

// Normalize backend URL
function resolveBaseURL() {
  let raw = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';
  if (raw.endsWith('/')) raw = raw.slice(0, -1);
  if (!/^https?:\/\//i.test(raw)) {
    if (raw.startsWith(':')) {
      return window.location.protocol + '//' + window.location.hostname + raw;
    }
    return 'http://' + raw;
  }
  return raw;
}

const baseURL = resolveBaseURL();

const api = axios.create({ baseURL });

api.interceptors.request.use((config) => {
  const atoken = localStorage.getItem('atoken');
  const dtoken = localStorage.getItem('dtoken');

  // 🔑 Send admin token in Authorization header
  if (atoken) config.headers['Authorization'] = `Bearer ${atoken}`;
  // If you want doctor auth later
  if (dtoken) config.headers['dtoken'] = dtoken;

  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response) {
      console.error('API Error:', err.response.status, err.response.data);
    } else {
      console.error('API Network Error:', err.message);
    }
    return Promise.reject(err);
  }
);

export default api;
