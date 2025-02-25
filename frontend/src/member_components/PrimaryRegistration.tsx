import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import api from '../utils/axiosConfig';
import { useNavigate } from 'react-router-dom';

const PrimaryRegistration = () => {
    const [formData, setFormData] = useState({
        email: '',
        first_name: '',
        last_name: '',
        dob: '',
        id_number: '',
        district: '',
        password: '',
        confirm_password: ''
    });

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await api.post(
                'register/primary/', 
                formData
            );
            console.log('Registration successful:', response.data);
            alert('Registration successful!');
            navigate('/');  // Redirect to login after successful registration
        } catch (error) {
            console.error('Registration error:', error);
            alert('Registration failed. Please check your details.');
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
            <Typography variant="h5" gutterBottom>Primary User Registration</Typography>
            
            <TextField fullWidth margin="normal" label="Email" required
                value={formData.email} 
                onChange={e => setFormData({...formData, email: e.target.value})} />
            
            <TextField fullWidth margin="normal" label="First Name" required
                value={formData.first_name} 
                onChange={e => setFormData({...formData, first_name: e.target.value})} />
            
            <TextField fullWidth margin="normal" label="Last Name" required
                value={formData.last_name} 
                onChange={e => setFormData({...formData, last_name: e.target.value})} />
            
            <TextField fullWidth margin="normal" label="Date of Birth" type="date" required
                InputLabelProps={{ shrink: true }}
                value={formData.dob} 
                onChange={e => setFormData({...formData, dob: e.target.value})} />
            
            <TextField fullWidth margin="normal" label="ID Number" required
                value={formData.id_number} 
                onChange={e => setFormData({...formData, id_number: e.target.value})} />
            
            <TextField fullWidth margin="normal" label="District" required
                value={formData.district} 
                onChange={e => setFormData({...formData, district: e.target.value})} />
            
            <TextField fullWidth margin="normal" label="Password" type="password" required
                value={formData.password} 
                onChange={e => setFormData({...formData, password: e.target.value})} />
            
            <TextField fullWidth margin="normal" label="Confirm Password" type="password" required
                value={formData.confirm_password} 
                onChange={e => setFormData({...formData, confirm_password: e.target.value})} />
            
            <Button type="submit" variant="contained" sx={{ mt: 2 }}>Register</Button>
        </Box>
    );
};

export default PrimaryRegistration;