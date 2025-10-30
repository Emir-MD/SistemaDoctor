// src/pages/Usuarios.jsx
import React, { useEffect, useState } from 'react';
import {
  IconButton,
  Snackbar,
  Typography,
  Fab,
  Dialog,
  CircularProgress
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import DialogoEliminar from '../Dialogs/DialogoEliminar';

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [mostrarDialogoEliminar, setMostrarDialogoEliminar] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [mensaje, setMensaje] = useState({ texto: '', color: '' });
  const [mostrarMensaje, setMostrarMensaje] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const obtenerUsuarios = () => {
    setCargando(true);
    // Simulación local de datos
    setTimeout(() => {
      setUsuarios([
        { _id: '1', usuario: 'jdoe', nombre: 'John Doe', telefono: '1234567890' },
        { _id: '2', usuario: 'mjane', nombre: 'Mary Jane', telefono: '0987654321' }
      ]);
      setCargando(false);
    }, 1000);
  };

  const editarUsuario = (id) => {
    navigate(`/editar-usuario/${id}`);
  };

  const abrirDialogoEliminar = (usuario) => {
    setUsuarioSeleccionado(usuario);
    setMostrarDialogoEliminar(true);
  };

  const confirmarEliminar = () => {
    setCargando(true);
    // Simulación local de eliminación
    setTimeout(() => {
      setMensaje({ texto: 'Usuario eliminado', color: 'success' });
      setMostrarMensaje(true);
      setMostrarDialogoEliminar(false);
      obtenerUsuarios();
    }, 1000);
  };

  return (
    <div>
      {cargando && <CircularProgress color="secondary" />}

      <Typography variant="h4">Usuarios</Typography>

      <table border="1" cellPadding="8" style={{ width: '100%', marginTop: 20 }}>
        <thead>
          <tr>
            <th>Usuario</th>
            <th>Nombre</th>
            <th>Teléfono</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario._id}>
              <td>{usuario.usuario}</td>
              <td>{usuario.nombre}</td>
              <td>{usuario.telefono}</td>
              <td>
                <IconButton color="primary" onClick={() => editarUsuario(usuario._id)}>
                  <EditIcon />
                </IconButton>
                <IconButton color="error" onClick={() => abrirDialogoEliminar(usuario)}>
                  <DeleteIcon />
                </IconButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Fab
        color="primary"
        aria-label="add"
        style={{ position: 'fixed', bottom: 16, right: 16 }}
        onClick={() => navigate('/nuevo-usuario')}
      >
        <AddIcon />
      </Fab>

      <Dialog open={mostrarDialogoEliminar} onClose={() => setMostrarDialogoEliminar(false)}>
        <DialogoEliminar
          nombre={usuarioSeleccionado?.nombre}
          onCancelar={() => setMostrarDialogoEliminar(false)}
          onEliminar={confirmarEliminar}
        />
      </Dialog>

      <Snackbar
        open={mostrarMensaje}
        autoHideDuration={3000}
        onClose={() => setMostrarMensaje(false)}
        message={mensaje.texto}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      />
    </div>
  );
};

export default Usuarios;
