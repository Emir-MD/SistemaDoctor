// src/components/FormMembresia.jsx
import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  TextField,
  Button,
  Grid,
  Box
} from '@mui/material';

const FormMembresia = ({ membresia = {}, titulo = '', onCerrar, onRegistrar }) => {
  const [datos, setDatos] = useState({ nombre: '', duracion: '', precio: '' });
  const [formValido, setFormValido] = useState(false);

  useEffect(() => {
    if (membresia) {
      setDatos({
        nombre: membresia.nombre || '',
        duracion: membresia.duracion || '',
        precio: membresia.precio || ''
      });
    }
  }, [membresia]);

  useEffect(() => {
    validarFormulario();
  }, [datos]);

  const handleInputChange = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const validarFormulario = () => {
    const valido = datos.nombre && datos.duracion && datos.precio;
    setFormValido(!!valido);
  };

  const registrar = () => {
    if (formValido) onRegistrar(datos);
  };

  return (
    <Card sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        {titulo} membresía
      </Typography>
      <CardContent>
        <Box component="form" noValidate autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Nombre de la membresía"
                name="nombre"
                fullWidth
                value={datos.nombre}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Días de duración"
                name="duracion"
                type="number"
                fullWidth
                value={datos.duracion}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Precio"
                name="precio"
                type="number"
                fullWidth
                value={datos.precio}
                onChange={handleInputChange}
                required
              />
            </Grid>
          </Grid>
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button onClick={onCerrar} color="primary">
          Cerrar
        </Button>
        <Button onClick={registrar} color="primary" disabled={!formValido}>
          Registrar
        </Button>
      </CardActions>
    </Card>
  );
};

export default FormMembresia;
