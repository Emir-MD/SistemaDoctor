// src/pages/ConfiguracionSistema.jsx
import React, { useEffect, useState } from 'react';
import {
  CircularProgress,
  Snackbar,
  Typography,
  Container,
  Backdrop
} from '@mui/material';
import FormConfiguracion from '../Configuracion/FormConfiguracion';

const ConfiguracionSistema = () => {
  const [datosAjustes, setDatosAjustes] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [mostrarMensaje, setMostrarMensaje] = useState(false);
  const [mensaje, setMensaje] = useState({ texto: '', color: '' });

  useEffect(() => {
    obtenerAjustes();
  }, []);

  const onRegistrar = (ajustes) => {
    setCargando(true);

    const imagenCambia = ajustes.logo.includes('data:image');
    if (!imagenCambia) {
      ajustes.logo = ajustes.logo.split('api/')[1];
    }
    ajustes.logoCambia = imagenCambia;

    console.log('Ajustes a guardar:', ajustes);

    // TODO: Reemplazar con POST a /api/ajustes con el body `ajustes`
    setTimeout(() => {
      setMensaje({ texto: 'Información actualizada', color: 'success' });
      setMostrarMensaje(true);
      setCargando(false);
      obtenerAjustes();
    }, 1000);
  };

  const obtenerAjustes = () => {
    setCargando(true);

    // TODO: Reemplazar con GET a /api/ajustes
    setTimeout(() => {
      const resultado = {
        nombre: 'Gimnasio Ejemplo',
        logo: '',
        telefono: '7771234567',
        direccion: 'Av. Principal #123'
      };
      setDatosAjustes(resultado);
      console.log('Ajustes cargados:', resultado);
      setCargando(false);
    }, 1000);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Configuración del sistema
      </Typography>

      {datosAjustes && (
        <FormConfiguracion ajustes={datosAjustes} onRegistrar={onRegistrar} />
      )}

      <Backdrop open={cargando} style={{ zIndex: 9999 }}>
        <CircularProgress size={64} />
      </Backdrop>

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

export default ConfiguracionSistema;
