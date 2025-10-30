// src/components/CartasPersonalizadas.jsx
import React from 'react';
import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import * as MuiIcons from '@mui/icons-material';

const CartasPersonalizadas = ({ cartas }) => {
  return (
    <section>
      <Grid container spacing={2}>
        {cartas.map((item, index) => {
          const Icono = MuiIcons[item.icono] || MuiIcons['Info']; // fallback icon

          return (
            <Grid item xs={12} sm={6} lg={3} key={index}>
              <Card elevation={6}>
                <CardContent
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    py: 3,
                    px: 2,
                  }}
                >
                  <Box
                    sx={{
                      p: 2,
                      bgcolor: item.color || 'primary.main',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 2,
                      color: 'white',
                      minWidth: 60,
                      height: 60,
                    }}
                  >
                    <Icono fontSize="large" />
                  </Box>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      {item.nombre}
                    </Typography>
                    <Typography variant="h5" color="text.primary" fontWeight="light">
                      {item.total}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </section>
  );
};

export default CartasPersonalizadas;
