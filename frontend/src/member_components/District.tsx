import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
} from '@mui/material';

const District = () => {
  // State for pagination
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  // Dummy data for families
  const families = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    name: `Family ${i + 1}`,
    head: `Head ${i + 1}`,
    contact: `Contact ${i + 1}`,
  }));

  // Pagination logic
  const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

  const paginatedFamilies = families.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <Box sx={{ flexGrow: 1, p: 3, overflow: 'auto' }}>
      {/* Title */}
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4 }}>
        Berea District
      </Typography>

      {/* Cards for Elder, Secretary, and Treasurer */}
      <Box sx={{ display: 'flex', gap: 3, mb: 4 }}>
        {/* Elder Card */}
        <Card sx={{ flex: 1 }}>
          <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ width: 60, height: 60 }}>E</Avatar>
            <Box>
              <Typography variant="h6">John Doe</Typography>
              <Typography variant="body2" color="textSecondary">
                Elder
              </Typography>
            </Box>
          </CardContent>
        </Card>

        {/* Secretary Card */}
        <Card sx={{ flex: 1 }}>
          <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ width: 60, height: 60 }}>S</Avatar>
            <Box>
              <Typography variant="h6">Jane Smith</Typography>
              <Typography variant="body2" color="textSecondary">
                Secretary
              </Typography>
            </Box>
          </CardContent>
        </Card>

        {/* Treasurer Card */}
        <Card sx={{ flex: 1 }}>
          <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ width: 60, height: 60 }}>T</Avatar>
            <Box>
              <Typography variant="h6">Alice Johnson</Typography>
              <Typography variant="body2" color="textSecondary">
                Treasurer
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Map Card */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Map of Berea District
          </Typography>
          <Box
            sx={{
              height: 300,
              backgroundColor: '#e0e0e0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 2,
            }}
          >
            <Typography variant="body1" color="textSecondary">
              Map Placeholder
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Families Table */}
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Families in Berea District
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Family Name</TableCell>
                  <TableCell>Head of Family</TableCell>
                  <TableCell>Contact</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedFamilies.map((family) => (
                  <TableRow key={family.id}>
                    <TableCell>{family.id}</TableCell>
                    <TableCell>{family.name}</TableCell>
                    <TableCell>{family.head}</TableCell>
                    <TableCell>{family.contact}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {/* Pagination */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Pagination
              count={Math.ceil(families.length / rowsPerPage)}
              page={page}
              onChange={handleChangePage}
              color="primary"
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default District;