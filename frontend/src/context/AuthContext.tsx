import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/axiosConfig';
import { User } from '../types';
import { safeLocalStorage } from '../utils/storage';

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    loading: boolean;
}

const token = safeLocalStorage.getItem('access_token');

const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initializeAuth = async () => {
            const token = safeLocalStorage.getItem('access_token');
            if (token) {
                try {
                    const response = await api.get('user/me/');
                    setUser(response.data);
                } catch (error) {
                    safeLocalStorage.removeItem('access_token');
                    safeLocalStorage.removeItem('refresh_token');
                }
            }
            setLoading(false);
        };

        initializeAuth();
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const response = await api.post('token/', { email, password });
            safeLocalStorage.setItem('access_token', response.data.access);
            safeLocalStorage.setItem('refresh_token', response.data.refresh);

            const userResponse = await api.get('user/me/');
            setUser(userResponse.data);
        } catch (error) {
            throw new Error('Login failed');
        }
    };

    const logout = () => {
        safeLocalStorage.removeItem('access_token');
        safeLocalStorage.removeItem('refresh_token');
        setUser(null);
    };

    const value = { user, login, logout, loading };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}