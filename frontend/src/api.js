import axios from 'axios';

const api = axios.create({
  baseURL: 'https://senaryo-marketi.onrender.com', // Backend adresi
});

// Her istekte LocalStorage'daki tokenı ekle (Oturum yönetimi)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;