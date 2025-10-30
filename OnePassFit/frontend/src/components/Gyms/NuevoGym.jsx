// src/pages/NuevoGym.jsx
import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Backdrop,
  CircularProgress,
  Snackbar
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FormGym from '..//Gyms/FormGym';
import { createGym } from '../../services/gymService.js';

/**
 * Página para crear un nuevo gimnasio.
 */
export default function NuevoGym() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [snack, setSnack] = useState({ open: false, message: '' });

  /**
   * Maneja el envío del formulario.
   */
  const handleCreate = async (gymData) => {
    setLoading(true);
    try {
      await createGym(gymData);
      setSnack({ open: true, message: 'Gimnasio creado con éxito' });
      setTimeout(() => navigate('/gyms'), 1200);
    } catch (err) {
      setSnack({ open: true, message: err.toString() });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      {/* Spinner de fondo */}
      <Backdrop open={loading} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <Paper sx={{ p: 3 }} elevation={3}>
        <Typography variant="h5" gutterBottom>
          Crear Nuevo Gimnasio
        </Typography>
        <FormGym onSubmit={handleCreate} />
      </Paper>

      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={() => setSnack((s) => ({ ...s, open: false }))}
        message={snack.message}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      />
    </Container>
  );
}
