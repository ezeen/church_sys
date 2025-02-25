import React from 'react';
import { Box, Link, Typography, Paper, Grid } from '@mui/material';

const Dashboard = () => {
  // Reusable card component for carousels
  const PlaceholderCard = ({ title }: { title: string }) => (
    <Paper sx={{ 
      p: 2, 
      m: 1, 
      minWidth: 250, 
      height: 200, 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center',
      background: '#f5f5f5'
    }}>
      <Typography variant="h6" align="center">{title}</Typography>
      <Box sx={{ 
        width: '100%', 
        height: 120, 
        bgcolor: '#e0e0e0', 
        mt: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Typography variant="body2" color="textSecondary">
          Placeholder Image
        </Typography>
      </Box>
    </Paper>
  );

  return (
    <Box sx={{ p: 3 }}>
      {/* Hero Section */}
      <Box sx={{ 
        height: 400,
        backgroundImage: 'url(https://via.placeholder.com/1500x400)', 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        mb: 4,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        borderRadius: 2
      }}>
        <Typography variant="h3" sx={{ 
          fontWeight: 'bold', 
          color: 'white', 
          mr: 4,
          textAlign: 'right',
          maxWidth: 600,
          textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
        }}>
          Welcome to PCEA Church,<br/>A House of Worship,<br/>for all nations.
        </Typography>
      </Box>

      {/* Groups Section */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
          Groups
        </Typography>
        <Grid container spacing={2} sx={{ overflowX: 'auto', flexWrap: 'nowrap' }}>
          {[...Array(7)].map((_, i) => (
            <Grid item key={`group-${i}`}>
              <PlaceholderCard title={`Group ${i + 1}`} />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Sermons Section */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
          Sermons
        </Typography>
        <Grid container spacing={2} sx={{ overflowX: 'auto', flexWrap: 'nowrap' }}>
          {[...Array(7)].map((_, i) => (
            <Grid item key={`sermon-${i}`}>
              <PlaceholderCard title={`Sermon ${i + 1}`} />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Projects Section */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
          Projects
        </Typography>
        <Grid container spacing={2} sx={{ overflowX: 'auto', flexWrap: 'nowrap' }}>
          {[...Array(7)].map((_, i) => (
            <Grid item key={`project-${i}`}>
              <PlaceholderCard title={`Project ${i + 1}`} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;