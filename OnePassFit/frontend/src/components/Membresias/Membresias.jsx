// src/pages/Membresias.jsx
import React, { useEffect, useState } from 'react';
import {
  Typography,
  Snackbar,
  CircularProgress,
  IconButton,
  Fab,
  Dialog,
  Box
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid } from '@mui/x-data-grid';
import FormMembresia from '../Membresias/FormMembresia';
import DialogoEliminar from '../Dialogs/DialogoEliminar';

const Membresias = () => {
  const [cargando, setCargando] = useState(false);
  const [mostrarDialogo, setMostrarDialogo] = useState(false);
  const [mostrarDialogoEliminar, setMostrarDialogoEliminar] = useState(false);
  const [membresias, setMembresias] = useState([]);
  const [membresia, setMembresia] = useState({ nombre: '', duracion: '', precio: '' });
  const [mensaje, setMensaje] = useState({ texto: '', color: '' });
  const [mostrarMensaje, setMostrarMensaje] = useState(false);
  const [titulo, setTitulo] = useState('Agregar');
  const [itemSeleccionado, setItemSeleccionado] = useState('');

  useEffect(() => {
    obtenerMembresias();
  }, []);

  const obtenerMembresias = async () => {
    setCargando(true);
    setTimeout(() => {
      setMembresias([
        { id: 1, nombre: 'Mensual', duracion: 30, precio: 300 },
        { id: 2, nombre: 'Semestral', duracion: 180, precio: 1500 },
        { id: 3, nombre: 'Anual', duracion: 365, precio: 2700 }
      ]);
      setCargando(false);
    }, 1000);
  };

  const editar = (item) => {
    setTitulo('Editar');
    setMembresia(item);
    setMostrarDialogo(true);
  };

  const eliminar = (item) => {
    setItemSeleccionado(item.nombre);
    setMembresia(item);
    setMostrarDialogoEliminar(true);
  };

  const cerrarDialogoEliminar = () => {
    setMostrarDialogoEliminar(false);
    setMembresia({ nombre: '', duracion: '', precio: '' });
  };

  const confirmarEliminar = () => {
    setCargando(true);
    setTimeout(() => {
      setMembresias(prev => prev.filter(m => m.id !== membresia.id));
      setMostrarDialogoEliminar(false);
      setMensaje({ texto: 'Membresía eliminada', color: 'success' });
      setMostrarMensaje(true);
      setCargando(false);
    }, 1000);
  };

  const onCerrado = () => {
    setMostrarDialogo(false);
    setMembresia({ nombre: '', duracion: '', precio: '' });
    setTitulo('Agregar');
  };

  const onRegistrar = (data) => {
    setCargando(true);
    const nuevo = { ...data };
    if (titulo === 'Agregar') {
      nuevo.id = Date.now();
      setMembresias(prev => [...prev, nuevo]);
    } else {
      setMembresias(prev => prev.map(m => (m.id === data.id ? data : m)));
    }
    setMostrarDialogo(false);
    setMensaje({ texto: 'Membresía registrada', color: 'success' });
    setMostrarMensaje(true);
    setCargando(false);
    setMembresia({ nombre: '', duracion: '', precio: '' });
    setTitulo('Agregar');
  };

  const columnas = [
    { field: 'nombre', headerName: 'Membresía', flex: 1 },
    { field: 'duracion', headerName: 'Duración', flex: 1 },
    { field: 'precio', headerName: 'Precio', flex: 1 },
    {
      field: 'opciones',
      headerName: 'Opciones',
      sortable: false,
      flex: 1,
      renderCell: (params) => (
        <>
          <IconButton color="primary" onClick={() => editar(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton color="error" onClick={() => eliminar(params.row)}>
            <DeleteIcon />
          </IconButton>
        </>
      )
    }
  ];

  return (
    <Box sx={{ p: 3 }}>
      {cargando && <CircularProgress color="secondary" />}
      <Typography variant="h4" gutterBottom>Membresías</Typography>

      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={membresias}
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
        ContentProps={{ sx: { backgroundColor: mensaje.color === 'success' ? 'green' : 'red' } }}
      />

      <Dialog open={mostrarDialogo} maxWidth="sm" fullWidth>
        <FormMembresia
          membresia={membresia}
          titulo={titulo}
          onRegistrar={onRegistrar}
          onClose={onCerrado}
        />
      </Dialog>

      <Dialog open={mostrarDialogoEliminar} maxWidth="sm">
        <DialogoEliminar nombre={itemSeleccionado} onCancelar={cerrarDialogoEliminar} onEliminar={confirmarEliminar} />
      </Dialog>

      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        onClick={() => setMostrarDialogo(true)}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
};

export default Membresias;
