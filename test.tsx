import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  IconButton, 
  Divider, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText,
  ListItemButton
} from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { Outlet, useNavigate, NavLink } from 'react-router-dom';
import {
  Home as DashboardIcon,
  People as AudienceIcon,
  Article as PostsIcon,
  Schedule as SchedulesIcon,
  MonetizationOn as IncomeIcon,
  Settings as SettingsIcon,
  Help as HelpIcon,
  ExitToApp as LogoutIcon,
} from '@mui/icons-material';
import Events from './Events';
import Sermons from './Sermons';
import District from './District';
import Family from './Family';
import Settings from './Settings';

const Home = ({ darkMode, toggleDarkMode }: { darkMode: boolean; toggleDarkMode: () => void }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    navigate('/login');
  };

  const navigationItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '' },
    { text: 'Events', icon: <AudienceIcon />, path: 'events' },
    { text: 'Sermons', icon: <PostsIcon />, path: 'sermons' },
    { text: 'District', icon: <SchedulesIcon />, path: 'district' },
    { text: 'Family', icon: <IncomeIcon />, path: 'family' },
    { text: 'Settings', icon: <SettingsIcon />, path: 'settings' },
  ];

  return (
    <Box sx={{ display: 'flex', height: '100vh', backgroundColor: darkMode ? '#121212' : '#f5f5f5' }}>
      {/* Sidebar */}
      <Box sx={{ 
        width: '256px', 
        height: '100%', 
        p: 3, 
        backgroundColor: darkMode ? '#1e1e1e' : '#ffffff', 
        borderRight: '1px solid rgba(0, 0, 0, 0.1)' 
      }}>
        {/* User Info */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
          <img 
            src="https://placehold.co/44x44" 
            alt="User Avatar" 
            style={{ borderRadius: '50%', width: 44, height: 44 }} 
          />
          <Box>
            <Typography variant="caption" sx={{ 
              color: darkMode ? '#757575' : '#757575', 
              textTransform: 'uppercase',
              display: 'block'
            }}>
              Product Manager
            </Typography>
            <Typography variant="body1" sx={{ 
              color: darkMode ? '#ffffff' : '#000000', 
              fontWeight: 'medium'
            }}>
              Andrew Smith
            </Typography>
          </Box>
        </Box>

        {/* Theme Toggle */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          mb: 4 
        }}>
          <Typography variant="body2" sx={{ color: darkMode ? '#ffffff' : '#000000' }}>
            {darkMode ? 'Dark Mode' : 'Light Mode'}
          </Typography>
          <IconButton onClick={toggleDarkMode} color="inherit">
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Box>

        {/* ... rest of the sidebar */}
      </Box>

      {/* Main Content */}
      <Box sx={{ 
        flexGrow: 1, 
        p: 3,
        overflow: 'auto'
      }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Home;