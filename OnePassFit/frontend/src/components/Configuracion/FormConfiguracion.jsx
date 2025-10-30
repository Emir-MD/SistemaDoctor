// src/components/FormConfiguracion.jsx
import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
  Box,
  Input,
  FormHelperText
} from '@mui/material';

const FormConfiguracion = ({ ajustes, onRegistrar }) => {
  const [datos, setDatos] = useState({ nombre: '', telefono: '', direccion: '' });
  const [imagen, setImagen] = useState(null);
  const [imagenUrl, setImagenUrl] = useState(null);
  const [formValido, setFormValido] = useState(false);
  const [errorImagen, setErrorImagen] = useState('');

  useEffect(() => {
    if (ajustes) {
      setDatos({
        nombre: ajustes.nombre,
        telefono: ajustes.telefono,
        direccion: ajustes.direccion
      });
      setImagenUrl(ajustes.logo?.startsWith('data:image') ? ajustes.logo : `/api/${ajustes.logo}`);
    }
  }, [ajustes]);

  const handleInputChange = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
    validarFormulario();
  };

  const validarFormulario = () => {
    const valido = datos.nombre && datos.telefono && datos.direccion;
    setFormValido(valido);
  };

  const handleImagenSeleccionada = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5000000) {
      setErrorImagen('La foto debe pesar menos de 5 MB!');
      return;
    }
    setErrorImagen('');
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagenUrl(e.target.result);
    };
    reader.readAsDataURL(file);
    setImagen(file);
  };

  const registrar = () => {
    const envio = { ...datos, logo: imagenUrl };
    onRegistrar(envio);
  };

  return (
    <Card sx={{ mb: 6, p: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Información del gimnasio
        </Typography>
        <TextField
          label="Nombre del gimnasio"
          name="nombre"
          fullWidth
          margin="normal"
          value={datos.nombre}
          onChange={handleInputChange}
          required
        />
        <TextField
          label="Teléfono"
          name="telefono"
          fullWidth
          margin="normal"
          value={datos.telefono}
          onChange={handleInputChange}
          required
        />
        <TextField
          label="Dirección"
          name="direccion"
          fullWidth
          margin="normal"
          value={datos.direccion}
          onChange={handleInputChange}
          required
        />
        <Input
          type="file"
          accept="image/png, image/jpeg, image/bmp"
          onChange={handleImagenSeleccionada}
          sx={{ mt: 2 }}
        />
        {errorImagen && <FormHelperText error>{errorImagen}</FormHelperText>}
        {imagenUrl && (
          <Box display="flex" justifyContent="center" mt={2}>
            <img src={imagenUrl} alt="logo" width="300" />
          </Box>
        )}
      </CardContent>
      <CardActions sx={{ justifyContent: 'center' }}>
        <Button variant="contained" color="primary" onClick={registrar} disabled={!formValido}>
          Registrar
        </Button>
      </CardActions>
    </Card>
  );
};

export default FormConfiguracion;
