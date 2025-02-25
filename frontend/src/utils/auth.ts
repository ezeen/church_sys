import api from './axiosConfig';

export const refreshToken = async () => {
    try {
        const refresh = localStorage.getItem('refresh_token');
        const response = await api.post('token/refresh/', { refresh });
        localStorage.setItem('access_token', response.data.access);
        return true;
    } catch (error) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        return false;
    }
};