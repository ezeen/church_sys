import React from 'react';
import { Box, Link, Typography, Paper, Grid, Button, Stack, IconButton } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import GroupIcon from '@mui/icons-material/Group';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const AdminDashboard = () => {
  // Sample data for demonstration
  const members = [
    { id: 1, name: 'John Mwangi', email: 'john@pcea.org', phone: '+254712345678', group: 'Youth' },
    { id: 2, name: 'Mary Wambui', email: 'mary@pcea.org', phone: '+254723456789', group: 'Choir' },
  ];

  const donations = [
    { id: 1, donor: 'David Kamau', amount: 15000, date: '2024-03-15', method: 'M-Pesa' },
    { id: 2, donor: 'Anonymous', amount: 5000, date: '2024-03-14', method: 'Cash' },
  ];

  // Chart data
  const donationData = {
    labels: ['Tithes', 'Offerings', 'Projects', 'Missions'],
    datasets: [{
      data: [65, 25, 15, 10],
      backgroundColor: ['#4e79a7', '#f28e2c', '#e15759', '#76b7b2']
    }]
  };

  // Data Grid Columns
  const memberColumns: GridColDef[] = [
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'phone', headerName: 'Phone', width: 150 },
    { field: 'group', headerName: 'Group', width: 150 },
    { field: 'actions', headerName: 'Actions', width: 150, renderCell: () => (
      <Stack direction="row" spacing={1}>
        <Button size="small" variant="outlined">Edit</Button>
        <Button size="small" color="error">Delete</Button>
      </Stack>
    )}
  ];

  return (
    <Box sx={{ p: 3 }}>
      {/* Hero Section */}
      <Box sx={{ 
        height: 400,
        backgroundImage: 'url(https://source.unsplash.com/random?church)', 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        mb: 4,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        borderRadius: 2,
        position: 'relative'
      }}>
        <Typography variant="h3" sx={{ 
          fontWeight: 'bold', 
          color: 'white', 
          mr: 4,
          textAlign: 'right',
          maxWidth: 600,
          textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
          zIndex: 1
        }}>
          Welcome to PCEA Church Admin Portal
        </Typography>
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.4)',
          borderRadius: 2
        }} />
      </Box>

      {/* Quick Stats Row */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <GroupIcon fontSize="large" color="primary" />
            <Typography variant="h6">Total Members</Typography>
            <Typography variant="h4">1,234</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <CalendarTodayIcon fontSize="large" color="secondary" />
            <Typography variant="h6">Upcoming Events</Typography>
            <Typography variant="h4">5</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <AttachMoneyIcon fontSize="large" color="success" />
            <Typography variant="h6">Recent Donations</Typography>
            <Typography variant="h4">Ksh 250K</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <AnnouncementIcon fontSize="large" color="warning" />
            <Typography variant="h6">New Messages</Typography>
            <Typography variant="h4">12</Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Members Management */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
          Member Management
        </Typography>
        <Box sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={members}
            columns={memberColumns}
            pageSizeOptions={[5, 10]}
            checkboxSelection
          />
        </Box>
      </Box>

      {/* Donations & Financials */}
      <Grid container spacing={3} sx={{ mb: 6 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h5" gutterBottom>Recent Donations</Typography>
            {donations.map(donation => (
              <Box key={donation.id} sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
                <Typography>{donation.donor} - Ksh {donation.amount.toLocaleString()}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {donation.date} • {donation.method}
                </Typography>
              </Box>
            ))}
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h5" gutterBottom>Donation Breakdown</Typography>
            <Box sx={{ maxWidth: 400, margin: 'auto' }}>
              <Pie data={donationData} />
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Events Calendar */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
          Church Calendar
        </Typography>
        <Paper sx={{ p: 2, height: 400 }}>
          {/* Calendar component would go here */}
          <Box sx={{ 
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: '#f5f5f5'
          }}>
            <Typography variant="body1">Calendar View Placeholder</Typography>
          </Box>
        </Paper>
      </Box>

      {/* Quick Actions */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
          Quick Actions
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6} md={3}>
            <Button fullWidth variant="contained" size="large">
              Add New Member
            </Button>
          </Grid>
          <Grid item xs={6} md={3}>
            <Button fullWidth variant="contained" color="secondary" size="large">
              Schedule Event
            </Button>
          </Grid>
          <Grid item xs={6} md={3}>
            <Button fullWidth variant="contained" color="success" size="large">
              Record Donation
            </Button>
          </Grid>
          <Grid item xs={6} md={3}>
            <Button fullWidth variant="contained" color="warning" size="large">
              Send Announcement
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AdminDashboard;