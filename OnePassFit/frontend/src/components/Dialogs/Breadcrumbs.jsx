// src/components/Breadcrumbs.jsx
import React from 'react';
import { Breadcrumbs, Typography, Link } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const CustomBreadcrumbs = ({ items }) => {
  return (
    <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
      {items.map((item, index) =>
        item.to ? (
          <Link key={index} underline="hover" color="inherit" href={item.to}>
            {item.text}
          </Link>
        ) : (
          <Typography key={index} color="text.primary">
            {item.text}
          </Typography>
        )
      )}
    </Breadcrumbs>
  );
};

export default CustomBreadcrumbs;
