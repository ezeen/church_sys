import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { safeLocalStorage } from '../utils/storage';
import api from '../utils/axiosConfig';
import { User } from '../types';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            // Step 1: Authenticate the user and get tokens
            const response = await api.post('token/', { email, password });
            
            if (!response.data.access || !response.data.refresh) {
                throw new Error('Invalid server response');
            }
            
            // Step 2: Store tokens in local storage
            safeLocalStorage.setItem('access_token', response.data.access);
            safeLocalStorage.setItem('refresh_token', response.data.refresh);
            
            // Step 3: Fetch the user's details
            const userResponse = await api.get('user/me/');
            const user = userResponse.data;
            console.log('Full API response:', userResponse.data);

            console.log('Permission check:', {
                name: user.first_name,
                is_staff: user.is_staff,
                is_superuser: user.is_superuser,
                is_super_admin: user.is_super_admin
            });


            // Step 4: Check if the user has admin permissions

            if (!(
                user.is_staff === true || 
                user.is_superuser === true || 
                user.is_super_admin === true
            )) {
                throw new Error('Permission denied');
            }

            // Step 5: Navigate to the admin dashboard
            navigate('/admin');
        } catch (error: any) {
            // Handle errors
            const message = error.response?.data?.detail || error.message;
            setError(message || 'Admin login failed. Please try again.');

            // Clear tokens if login fails
            safeLocalStorage.removeItem('access_token');
            safeLocalStorage.removeItem('refresh_token');
        }
    };

    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Admin Sign in
                </Typography>
                {error && (
                    <Typography color="error" sx={{ mt: 2 }}>
                        {error}
                    </Typography>
                )}
                <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default AdminLogin;