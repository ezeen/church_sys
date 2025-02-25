import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Switch } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';

interface NavbarProps {
    darkMode: boolean;
    toggleDarkMode: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ darkMode, toggleDarkMode }) => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    ArnseLAdams
                </Typography>
                <IconButton color="inherit" onClick={toggleDarkMode}>
                    {darkMode ? <Brightness7 /> : <Brightness4 />}
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;