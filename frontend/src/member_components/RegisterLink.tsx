import React from 'react';
import { Link, Typography } from '@mui/material';

const RegisterLink = () => {
    return (
        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Don't have an account?{' '}
            <Link href="/register" variant="body2">
                Sign Up
            </Link>
        </Typography>
    );
};

export default RegisterLink;