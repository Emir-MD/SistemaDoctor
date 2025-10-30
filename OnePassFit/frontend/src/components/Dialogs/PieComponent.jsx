// src/components/PieComponent.jsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import logo from '../../assets/logo.jpg';

const PieComponent = () => {
  return (
    <Box
      component="footer"
      sx={{
        mt: 5,
        py: 2,
        backgroundColor: '#f5f5f5',
        textAlign: 'center',
      }}
    >
      <Typography variant="body2" color="textSecondary">
        {new Date().getFullYear()} — <img src={logo} alt="Logo" width={100} style={{ verticalAlign: 'middle' }} />
      </Typography>
    </Box>
  );
};

export default PieComponent;
