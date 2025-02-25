import React from 'react';
import { Box, Typography, Paper, Grid, Button, Chip } from '@mui/material';

// Define the type for the EventCard props
interface EventCardProps {
  title: string;
  date: string;
  time: string;
  venue: string;
  price: string;
  interested: number;
  category: string;
}

const Events = () => {
  // Placeholder data for cards
  const cardData: EventCardProps[] = Array.from({ length: 7 }, (_, i) => ({
    id: i + 1,
    title: `Event ${i + 1}`,
    date: 'NOV 22',
    time: '00:00 AM - 00:00 PM',
    venue: 'Venue Name',
    price: '',
    interested: 10,
    category: 'Sukari Clean Up',
  }));

  return (
    <Box sx={{ flexGrow: 1, p: 3, overflow: 'auto' }}>

      {/* Groups Section */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
          Groups
        </Typography>
        <Grid container spacing={2} sx={{ overflowX: 'auto', flexWrap: 'nowrap' }}>
          {cardData.map((card) => (
            <Grid item key={card.title}>
              <EventCard {...card} />
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
          {cardData.map((card) => (
            <Grid item key={card.title}>
              <EventCard {...card} />
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
          {cardData.map((card) => (
            <Grid item key={card.title}>
              <EventCard {...card} />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Filter Chips */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          {['All', 'Today', 'Tomorrow', 'This Weekend', 'Free'].map((label) => (
            <Chip
              key={label}
              label={label}
              sx={{
                px: 2,
                py: 1,
                borderRadius: '50px',
                border: '1px solid #6f6f6f',
                color: '#6f6f6f',
                fontSize: '1rem',
                fontWeight: 'semibold',
              }}
            />
          ))}
        </Box>
      </Box>

      {/* Load More Button */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
        <Button
          variant="outlined"
          sx={{
            width: 610,
            height: 70,
            borderRadius: '10px',
            border: '2px solid #2b293d',
            color: '#2b293d',
            fontSize: '1.5rem',
            fontWeight: 'semibold',
          }}
        >
          Load More
        </Button>
      </Box>
    </Box>
  );
};

// Reusable Event Card Component
const EventCard: React.FC<EventCardProps> = ({
  title,
  date,
  time,
  venue,
  price,
  interested,
  category,
}) => (
  <Paper
    sx={{
      width: 512,
      height: 461,
      borderRadius: '10px',
      overflow: 'hidden',
      position: 'relative',
    }}
  >
    {/* Image Section */}
    <Box
      sx={{
        width: '100%',
        height: 254,
        backgroundColor: '#b8b8b8',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <svg
          width="123"
          height="90"
          viewBox="0 0 123 90"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.03405 90H116.326C120.775 90 123.69 85.3336 121.747 81.3219L99.429 35.2415C97.6443 31.5565 92.7952 30.6829 89.8419 33.5143L73.0713 49.5925C70.4371 52.118 66.1864 51.7395 64.0376 48.7881L41.4461 17.7585C38.7708 14.0839 33.1563 14.5799 31.1635 18.6668L0.619607 81.3075C-1.33703 85.3203 1.57792 90 6.03405 90Z"
            fill="white"
          />
          <path
            d="M81.3542 9.66443C81.3542 15.0019 77.0372 19.3289 71.7119 19.3289C66.3866 19.3289 62.0695 15.0019 62.0695 9.66443C62.0695 4.32691 66.3866 0 71.7119 0C77.0372 0 81.3542 4.32691 81.3542 9.66443Z"
            fill="white"
          />
        </svg>
      </Box>
      <Box
        sx={{
          position: 'absolute',
          left: 0,
          top: 219,
          backgroundColor: '#ffe047',
          px: 2.5,
          py: '5px',
          borderRadius: '0 10px 0 0',
        }}
      >
        <Typography variant="body1" sx={{ color: '#2d2b3b', fontWeight: 'semibold' }}>
          {category}
        </Typography>
      </Box>
    </Box>

    {/* Event Details Section */}
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h6" sx={{ color: '#4538b3', fontWeight: 'semibold' }}>
            {date.split(' ')[0]}
          </Typography>
          <Typography variant="h4" sx={{ color: '#2d2b3b', fontWeight: 'bold' }}>
            {date.split(' ')[1]}
          </Typography>
        </Box>
        <Box>
          <Typography variant="h5" sx={{ color: '#2d2b3b', fontWeight: 'semibold' }}>
            {title}
          </Typography>
          <Typography variant="body1" sx={{ color: '#5a5a5a', fontWeight: 'semibold' }}>
            {venue}
          </Typography>
          <Typography variant="body1" sx={{ color: '#5a5a5a', textTransform: 'uppercase' }}>
            {time}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ mt: 2, display: 'flex', gap: 2, alignItems: 'center' }}>
        <Typography variant="body1" sx={{ color: '#5a5a5a', fontWeight: 'semibold' }}>
          {price}
        </Typography>
        <Box sx={{ width: 5, height: 5, backgroundColor: '#5a5a5a', borderRadius: '50%' }} />
        <Typography variant="body1" sx={{ color: '#5a5a5a', fontWeight: 'semibold' }}>
          {interested} interested
        </Typography>
      </Box>
    </Box>
  </Paper>
);

export default Events;