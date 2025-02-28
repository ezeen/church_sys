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
import { useAuth } from '../context/AuthContext';


const Home = ({ darkMode, toggleDarkMode }: { darkMode: boolean; toggleDarkMode: () => void }) => {

  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navigationItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '' }, // Empty path for index
    { text: 'Events', icon: <AudienceIcon />, path: 'events' },
    { text: 'Sermons', icon: <PostsIcon />, path: 'sermons' },
    { text: 'District', icon: <SchedulesIcon />, path: 'district' },
    { text: 'Family', icon: <IncomeIcon />, path: 'family' },
    { text: 'Settings', icon: <SettingsIcon />, path: 'profile' },
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
              Member
            </Typography>
            <Typography variant="body1" sx={{ 
              color: darkMode ? '#ffffff' : '#000000', 
              fontWeight: 'medium'
            }}>
              Elvis Kiberi
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

        <Divider sx={{ mb: 4 }} />

        {/* Navigation Links */}
        <List>
          {navigationItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton 
                component={NavLink}
                to={item.path}
                end={item.path === ''} 
                sx={{ 
                  borderRadius: '8px', 
                  mb: 1,
                  '&.active': {
                    backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.16)' : 'rgba(0, 0, 0, 0.08)'
                  },
                  '&:hover': {
                    backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)'
                  }
                }}
              >
                <ListItemIcon sx={{ color: darkMode ? '#ffffff' : '#757575' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  sx={{ color: darkMode ? '#ffffff' : '#000000' }} 
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider sx={{ my: 4 }} />

        {/* Help and Logout */}
        <List>
          <ListItem disablePadding>
            <ListItemButton sx={{ borderRadius: '8px', mb: 1 }}>
              <ListItemIcon sx={{ color: darkMode ? '#ffffff' : '#757575' }}>
                <HelpIcon />
              </ListItemIcon>
              <ListItemText 
                primary="Help" 
                sx={{ color: darkMode ? '#ffffff' : '#000000' }} 
              />
            </ListItemButton>
          </ListItem>
          
          <ListItem disablePadding>
            <ListItemButton 
              onClick={handleLogout}
              sx={{ 
                borderRadius: '8px', 
                mb: 1,
                '&:hover': {
                  backgroundColor: 'rgba(213, 95, 90, 0.08)'
                }
              }}
            >
              <ListItemIcon sx={{ color: '#d55f5a' }}>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText 
                primary="Logout Account" 
                sx={{ color: '#d55f5a' }} 
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>

      {/* Main Content */}
      <Box sx={{ 
        flexGrow: 1, 
        p: 3,
        overflow: 'auto'
      }}>
        <Outlet /> {/* This will render the nested routes */}
      </Box>
    </Box>
  );
};

export default Home;