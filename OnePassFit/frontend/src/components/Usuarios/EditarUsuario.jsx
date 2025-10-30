// src/components/EditarUsuario.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Snackbar, LinearProgress, Typography, Container } from '@mui/material';
import FormUsuario from './FormUsuario'; // Este es un componente que deberás crear

const EditarUsuario = () => {
  const [cargando, setCargando] = useState(false);
  const [usuario, setUsuario] = useState({});
  const [mostrarMensaje, setMostrarMensaje] = useState(false);
  const [mensaje, setMensaje] = useState({ texto: '', color: '' });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setCargando(true);

    // TODO: Reemplazar con tu endpoint real del backend
    /*
    fetch(`/api/usuarios/${id}`)
      .then(res => res.json())
      .then(data => {
        setUsuario(data);
        setCargando(false);
      });
    */
    setTimeout(() => {
      // Simulación visual para frontend
      setUsuario({ id, fullName: 'Usuario de ejemplo', email: 'usuario@correo.com', role: 'administrador' });
      setCargando(false);
    }, 1000);
  }, [id]);

  const onRegistrado = (nuevoUsuario) => {
    setCargando(true);
    setUsuario(nuevoUsuario);

    // TODO: Reemplazar con tu lógica de PUT
    /*
    fetch(`/api/usuarios/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoUsuario)
    }).then(res => res.json()).then(() => {
      setMensaje({ texto: 'Información de usuario actualizada', color: 'success' });
      setMostrarMensaje(true);
      setTimeout(() => navigate('/usuarios'), 1000);
      setCargando(false);
    });
    */

    // Simulación
    setTimeout(() => {
      setMensaje({ texto: 'Información de usuario actualizada', color: 'success' });
      setMostrarMensaje(true);
      setTimeout(() => navigate('/usuarios'), 1000);
      setCargando(false);
    }, 1000);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Editar Usuario
      </Typography>

      <FormUsuario usuario={usuario} onRegistrado={onRegistrado} />

      {cargando && <LinearProgress color="secondary" />}

      <Snackbar
        open={mostrarMensaje}
        autoHideDuration={3000}
        onClose={() => setMostrarMensaje(false)}
        message={mensaje.texto}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      />
    </Container>
  );
};

export default EditarUsuario;