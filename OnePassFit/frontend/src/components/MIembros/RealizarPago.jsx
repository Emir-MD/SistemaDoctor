// RealizarPago.jsx sin HttpService para pruebas visuales
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  CircularProgress,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const RealizarPago = ({ matricula, onClose, onPagado }) => {
  const [membresiaSeleccionada, setMembresiaSeleccionada] = useState(null);
  const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date());
  const [cargando, setCargando] = useState(false);

  // Membresías ficticias para prueba
  const membresias = [
    { id: 1, nombre: 'Mensual', precio: 300, duracion: 30 },
    { id: 2, nombre: 'Trimestral', precio: 850, duracion: 90 },
    { id: 3, nombre: 'Anual', precio: 3000, duracion: 365 }
  ];

  const realizarPago = () => {
    if (!membresiaSeleccionada) return;
    setCargando(true);

    // Simulación de procesamiento
    setTimeout(() => {
      setCargando(false);
      onPagado({ ok: true });
    }, 1500);
  };

  return (
    <Dialog open={true} maxWidth="sm" fullWidth>
      <DialogTitle>Realizar pago para {matricula}</DialogTitle>
      <DialogContent>
        <FormControl fullWidth margin="normal">
          <InputLabel>Selecciona una membresía</InputLabel>
          <Select
            value={membresiaSeleccionada || ''}
            onChange={(e) => setMembresiaSeleccionada(e.target.value)}
            renderValue={(selected) =>
              selected ? `${selected.nombre}, $${selected.precio}` : ''
            }
          >
            {membresias.map((m) => (
              <MenuItem key={m.id} value={m}>
                {m.nombre} - ${m.precio}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Selecciona una fecha"
            value={fechaSeleccionada}
            onChange={(newValue) => setFechaSeleccionada(newValue)}
            renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
          />
        </LocalizationProvider>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose(false)} color="primary">Cerrar</Button>
        <Button onClick={realizarPago} color="primary" disabled={!membresiaSeleccionada}>Registrar</Button>
      </DialogActions>
      {cargando && (
        <CardActions sx={{ justifyContent: 'center', p: 2 }}>
          <CircularProgress size={64} />
        </CardActions>
      )}
    </Dialog>
  );
};

export default RealizarPago;
