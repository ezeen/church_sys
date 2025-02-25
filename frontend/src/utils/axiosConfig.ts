import axios from 'axios';
import { refreshToken } from './auth';

const api = axios.create({
    baseURL: 'http://localhost:8000/api/'
});

api.interceptors.request.use(config => {
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshed = await refreshToken();
            if (refreshed) {
                return api(originalRequest);
            }
        }
        return Promise.reject(error);
    }
);

export default api;