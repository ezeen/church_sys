import React, { useState } from 'react';
import { Box, TextField, Button, Typography, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
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
        confirm_password: '',
        family_rank: '', // New field
        phone_number: '' // New field
    });

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Format phone number to include +254 prefix
        const formattedPhoneNumber = formData.phone_number.startsWith('0') 
            ? `+254${formData.phone_number.slice(1)}` 
            : formData.phone_number;

        const payload = {
            ...formData,
            phone_number: formattedPhoneNumber // Replace with formatted phone number
        };

        try {
            const response = await api.post(
                'register/primary/', 
                payload
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
            
            {/* Family Rank Dropdown */}
            <FormControl fullWidth margin="normal" required>
                <InputLabel>Family Rank</InputLabel>
                <Select
                    value={formData.family_rank}
                    label="Family Rank"
                    onChange={e => setFormData({...formData, family_rank: e.target.value})}
                >
                    <MenuItem value="Father">Father</MenuItem>
                    <MenuItem value="Mother">Mother</MenuItem>
                    <MenuItem value="Son">Son</MenuItem>
                    <MenuItem value="Daughter">Daughter</MenuItem>
                </Select>
            </FormControl>
            
            {/* Phone Number Field */}
            <TextField fullWidth margin="normal" label="Phone Number" required
                value={formData.phone_number} 
                onChange={e => setFormData({...formData, phone_number: e.target.value})}
                inputProps={{ pattern: "^0[0-9]{9}$", title: "Phone number must start with 0 and be 10 digits long (e.g., 0712345678)" }}
                helperText="Enter your phone number starting with 0 (e.g., 0712345678)"
            />
            
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