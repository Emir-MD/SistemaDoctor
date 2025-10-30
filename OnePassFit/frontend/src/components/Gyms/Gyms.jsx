// src/components/Gyms/Gyms.jsx
import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  IconButton,
  Fab,
  Backdrop,
  CircularProgress,
  Snackbar,
  Dialog
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { getGyms, deleteGym } from '/home/aldomd/OnePassFit/frontend/src/services/gymService.js';
import DialogoEliminar from '../Dialogs/DialogoEliminar';

export default function Gyms() {
  const [gyms, setGyms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });
  const [delDialog, setDelDialog] = useState(false);
  const [selectedGym, setSelectedGym] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadGyms();
  }, []);

  const loadGyms = async () => {
    setLoading(true);
    try {
      const data = await getGyms();
      setGyms(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (gym) => {
    setSelectedGym(gym);
    setDelDialog(true);
  };
  const confirmDelete = async () => {
    setLoading(true);
    try {
      await deleteGym(selectedGym._id);
      setSnackbar({ open: true, message: 'Gimnasio eliminado' });
      await loadGyms();
    } catch (err) {
      setSnackbar({ open: true, message: err.toString() });
    } finally {
      setLoading(false);
      setDelDialog(false);
    }
  };

  return (
    <Box sx={{ p: 3, position: 'relative' }}>
      <Backdrop open={loading} sx={{ color: '#fff', zIndex: t => t.zIndex.drawer + 1 }}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <Typography variant="h4" gutterBottom>
        Gimnasios
      </Typography>

      <Paper elevation={3}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Localidad</TableCell>
                <TableCell>Teléfono</TableCell>
                <TableCell>Logo</TableCell>
                <TableCell align="center">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {gyms
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((gym) => (
                  <TableRow key={gym._id} hover>
                    <TableCell>{gym._id}</TableCell>
                    <TableCell>{gym.name}</TableCell>
                    <TableCell>{gym.location}</TableCell>
                    <TableCell>{gym.phone}</TableCell>
                    <TableCell>
                      {gym.logoUrl && (
                        <img
                          src={gym.logoUrl}
                          alt="logo"
                          style={{ width: 50, height: 50, objectFit: 'cover' }}
                        />
                      )}
                    </TableCell>
                    <TableCell align="center">
                      <IconButton color="error" onClick={() => handleDelete(gym)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={gyms.length}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Paper>

      <Fab
        color="primary"
        sx={{ position: 'fixed', bottom: 24, right: 24 }}
        onClick={() => navigate('/gyms/nuevo')}
      >
        <AddIcon />
      </Fab>

      <Dialog open={delDialog} onClose={() => setDelDialog(false)}>
        <DialogoEliminar
          nombre={selectedGym?.name}
          onCancelar={() => setDelDialog(false)}
          onEliminar={confirmDelete}
        />
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar(s => ({ ...s, open: false }))}
        message={snackbar.message}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      />
    </Box>
  );
}
