// Miembros.jsx sin HttpService ni Utiles - solo visual
import React, { useState } from 'react';
import { Box, CircularProgress, Snackbar, Avatar, IconButton, Tooltip, Chip } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import BadgeIcon from '@mui/icons-material/Badge';
import PaymentIcon from '@mui/icons-material/Payment';

const Miembros = () => {
  const [mostrarMensaje, setMostrarMensaje] = useState(false);
  const [mensaje, setMensaje] = useState({ color: '', texto: '' });
  const [cargando, setCargando] = useState(false);

  // Datos simulados para pruebas visuales
  const miembros = [
    {
      id: 1,
      matricula: 'M001',
      nombre: 'Juan Pérez',
      telefono: '555-123-4567',
      imagen: 'https://via.placeholder.com/80',
      estado: 'ACTIVO',
      fechaInicio: '2024-01-01',
      fechaFin: '2024-12-31',
      membresia: 'Anual'
    },
    {
      id: 2,
      matricula: 'M002',
      nombre: 'María García',
      telefono: '555-765-4321',
      imagen: 'https://via.placeholder.com/80',
      estado: 'VENCIDO',
      fechaInicio: '2023-01-01',
      fechaFin: '2023-12-31',
      membresia: 'Mensual'
    }
  ];

  const eliminarMiembro = (id) => {
    setCargando(true);
    setTimeout(() => {
      setMensaje({ texto: 'Miembro eliminado (modo prueba)', color: 'success' });
      setMostrarMensaje(true);
      setCargando(false);
    }, 1000);
  };

  const columnas = [
    {
      field: 'imagen',
      headerName: 'Imagen',
      renderCell: (params) => <Avatar src={params.value} alt="Foto" />,
      width: 100
    },
    { field: 'matricula', headerName: 'Matrícula', flex: 1 },
    { field: 'nombre', headerName: 'Nombre', flex: 1 },
    { field: 'telefono', headerName: 'Teléfono', flex: 1 },
    {
      field: 'estado',
      headerName: 'Estado',
      renderCell: (params) => (
        <Chip label={params.value || 'SIN MEMBRESÍA'} color={params.value === 'ACTIVO' ? 'success' : params.value === 'VENCIDO' ? 'error' : 'warning'} />
      ),
      flex: 1
    },
    { field: 'fechaInicio', headerName: 'Inicio membresía', flex: 1 },
    { field: 'fechaFin', headerName: 'Fin membresía', flex: 1 },
    { field: 'membresia', headerName: 'Membresía', flex: 1 },
    {
      field: 'opciones',
      headerName: 'Opciones',
      renderCell: (params) => (
        <>
          <Tooltip title="Editar">
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Eliminar">
            <IconButton color="error" onClick={() => eliminarMiembro(params.row.id)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Generar credencial">
            <IconButton color="secondary">
              <BadgeIcon />
            </IconButton>
          </Tooltip>
          {(!params.row.estado || params.row.estado === 'VENCIDO') && (
            <Tooltip title="Realizar pago">
              <IconButton color="success">
                <PaymentIcon />
              </IconButton>
            </Tooltip>
          )}
        </>
      ),
      flex: 1,
      sortable: false
    }
  ];

  return (
    <Box sx={{ p: 2 }}>
      <h1>Miembros</h1>
      <div style={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={miembros}
          columns={columnas}
          getRowId={(row) => row.id}
          loading={cargando}
          disableRowSelectionOnClick
        />
      </div>
      <Snackbar
        open={mostrarMensaje}
        autoHideDuration={3000}
        onClose={() => setMostrarMensaje(false)}
        message={mensaje.texto}
      />
      {cargando && <CircularProgress size={64} />}
    </Box>
  );
};

export default Miembros;
