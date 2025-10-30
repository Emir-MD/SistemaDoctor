// src/components/CambiarPassword.jsx
import React, { useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  CardActions,
  TextField,
  Snackbar,
  Typography,
  Container
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';

const CambiarPassword = () => {
  const [mostrarMensaje, setMostrarMensaje] = useState(false);
  const [mensaje, setMensaje] = useState({ texto: '', color: '' });
  const [formValido, setFormValido] = useState(true);
  const [mostrarPasswordActual, setMostrarPasswordActual] = useState(false);
  const [mostrarNueva, setMostrarNueva] = useState(false);
  const [mostrarRepetida, setMostrarRepetida] = useState(false);
  const [passwordActual, setPasswordActual] = useState('');
  const [nuevaPassword, setNuevaPassword] = useState('');
  const [repitePassword, setRepitePassword] = useState('');

  const validarMin = (v) => v.length >= 8;

  const cambiar = async () => {
    // TODO: Verificar contraseña actual con backend
    const passwordActualCoincide = true; // simulado

    if (!passwordActualCoincide) {
      setMensaje({ texto: 'La contraseña actual ingresada es incorrecta', color: 'error' });
      setMostrarMensaje(true);
      return;
    }

    if (nuevaPassword !== repitePassword) {
      setMensaje({ texto: 'La contraseña repetida debe coincidir con la nueva', color: 'error' });
      setMostrarMensaje(true);
      return;
    }

    // TODO: Cambiar contraseña en backend
    // Enviar payload: { idUsuario, password: repitePassword }

    setMensaje({ texto: 'La contraseña se ha actualizado. Debes iniciar sesión de nuevo', color: 'success' });
    setMostrarMensaje(true);
    localStorage.removeItem('logeado');
    window.location.reload();
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Cambiar Contraseña
      </Typography>

      <Card elevation={5}>
        <CardContent>
          <TextField
            fullWidth
            label="Contraseña actual"
            type={mostrarPasswordActual ? 'text' : 'password'}
            value={passwordActual}
            onChange={(e) => setPasswordActual(e.target.value)}
            margin="normal"
            InputProps={{
              endAdornment: (
                <IconButton onClick={() => setMostrarPasswordActual(!mostrarPasswordActual)}>
                  {mostrarPasswordActual ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              )
            }}
          />

          <TextField
            fullWidth
            label="Contraseña nueva"
            type={mostrarNueva ? 'text' : 'password'}
            value={nuevaPassword}
            onChange={(e) => setNuevaPassword(e.target.value)}
            margin="normal"
            error={!validarMin(nuevaPassword)}
            helperText={!validarMin(nuevaPassword) ? 'Mínimo 8 caracteres' : ''}
            InputProps={{
              endAdornment: (
                <IconButton onClick={() => setMostrarNueva(!mostrarNueva)}>
                  {mostrarNueva ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              )
            }}
          />

          <TextField
            fullWidth
            label="Repite la nueva contraseña"
            type={mostrarRepetida ? 'text' : 'password'}
            value={repitePassword}
            onChange={(e) => setRepitePassword(e.target.value)}
            margin="normal"
            error={!validarMin(repitePassword)}
            helperText={!validarMin(repitePassword) ? 'Mínimo 8 caracteres' : ''}
            InputProps={{
              endAdornment: (
                <IconButton onClick={() => setMostrarRepetida(!mostrarRepetida)}>
                  {mostrarRepetida ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              )
            }}
          />
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            color="primary"
            onClick={cambiar}
            disabled={!(validarMin(nuevaPassword) && validarMin(repitePassword))}
          >
            Registrar
          </Button>
        </CardActions>
      </Card>

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

export default CambiarPassword;
