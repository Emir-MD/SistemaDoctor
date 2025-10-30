import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Snackbar,
  Backdrop,
  CircularProgress
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FormUsuario from './FormUsuario';
import { createUser } from '../../services/userService';

export default function NuevoUsuario() {
  const nav = useNavigate();

  const [loading, setLoading] = useState(false);
  const [snack, setSnack] = useState({ open: false, message: '', severity: 'success' });

  const handleCreate = async (formData) => {
    setLoading(true);
    try {
      await createUser({
        fullName: formData.fullName,
        email:    formData.email,
        password: formData.password,
        role:     formData.role,
        phone:    formData.phone,
        gymId:    formData.gymId
      });
      setSnack({ open: true, message: 'Usuario creado con éxito', severity: 'success' });
      setTimeout(() => nav('/usuarios'), 1200);
    } catch (err) {
      setSnack({ open: true, message: err.toString(), severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Backdrop open={loading} sx={{ color: '#fff', zIndex: t => t.zIndex.drawer + 1 }}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <Paper sx={{ p: 3 }} elevation={3}>
        <Typography variant="h5" gutterBottom>
          Crear Nuevo Usuario
        </Typography>
        <FormUsuario onSubmit={handleCreate} />
      </Paper>

      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={() => setSnack(s => ({ ...s, open: false }))}
        message={snack.message}
      />
    </Container>
  );
}
