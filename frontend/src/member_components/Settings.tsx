import React, { useState } from 'react';
import { 
    Box, 
    Typography, 
   
  } from '@mui/material';

const Settings = () => {
    return (
        <Box sx={{ 
            flexGrow: 1, 
            p: 3,
            overflow: 'auto'
          }}>
            <Typography variant="h4" sx={{ 
              //color: darkMode ? '#ffffff' : '#000000', 
              mb: 4 
            }}>
              Family
            </Typography>
            {/* Add your main content here */}
        </Box>
    );
};

export default Settings;