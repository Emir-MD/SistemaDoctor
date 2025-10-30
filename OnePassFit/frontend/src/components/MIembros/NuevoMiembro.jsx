// Parte 2 - NuevoMiembro.jsx
import React, { useState } from 'react';
import { Box, Button, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions, Snackbar, Typography } from '@mui/material';
import FormMiembro from './FormMiembro';
import Breadcrumbs from '../Dialogs/Breadcrumbs';
import RealizarPago from '../MIembros/RealizarPago';
import CredencialMiembro from './CredencialMiembro';

const NuevoMiembro = () => {
  const [mostrarMensaje, setMostrarMensaje] = useState(false);
  const [mensaje, setMensaje] = useState({ color: '', texto: '' });
  const [mostrarMiembroRegistrado, setMostrarMiembroRegistrado] = useState(false);
  const [mostrarRealizarPago, setMostrarRealizarPago] = useState(false);
  const [mostrarCredencial, setMostrarCredencial] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [miembro, setMiembro] = useState({});
  const [matricula, setMatricula] = useState('');
  const [datosMiembro, setDatosMiembro] = useState({
    datosPersonales: {
      nombre: '',
      telefono: '',
      direccion: '',
      edad: 10
    },
    datosContacto: {
      sufreEnfermedad: false,
      tieneSeguro: false,
      enfermedad: '',
      institucion: '',
      nombreContacto: '',
      telefonoContacto: ''
    },
    imagen: null
  });

  const onRegistrado = (nuevoMiembro) => {
    console.log("✅ Miembro registrado (simulado):", nuevoMiembro);
    setMiembro(nuevoMiembro);
    setMatricula("GGZ-" + Math.floor(Math.random() * 10000));
    setMostrarMiembroRegistrado(true);
    setCargando(false);
  };

  const generarCredencial = () => {
    setMiembro((prev) => ({ ...prev, imagen: 'logo.jpg', fechaRegistro: new Date().toLocaleDateString() }));
    setMostrarCredencial(true);
  };

  const realizarPago = () => {
    setMostrarMiembroRegistrado(false);
    setMostrarRealizarPago(true);
  };

  const cerrarDialogoPago = () => {
    setMostrarRealizarPago(false);
  };

  const onPagado = (resultado) => {
    if (resultado) {
      setMostrarMensaje(true);
      setMensaje({ color: 'success', texto: 'Pago realizado con éxito' });
      setMostrarRealizarPago(false);
    }
  };

  const onImpreso = () => {
    setMostrarCredencial(false);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4">Registrar miembro</Typography>
      <Breadcrumbs items={[
        { text: 'Inicio', href: '/' },
        { text: 'Miembros', href: '/#/miembros' }
      ]} />

      <FormMiembro miembro={datosMiembro} onRegistrado={onRegistrado} />

      <Dialog open={mostrarMiembroRegistrado} onClose={() => setMostrarMiembroRegistrado(false)}>
        <DialogTitle>Miembro registrado</DialogTitle>
        <DialogContent>
          El miembro ha sido registrado con la matrícula <b>{matricula}</b>. Puedes pagar la membresía en este momento o en la primera visita.
        </DialogContent>
        <DialogActions>
          <Button onClick={generarCredencial}>Generar credencial</Button>
          <Button onClick={realizarPago}>Realizar pago</Button>
          <Button onClick={() => setMostrarMiembroRegistrado(false)}>Salir</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={mostrarRealizarPago} onClose={cerrarDialogoPago} maxWidth="sm" fullWidth>
        <RealizarPago matricula={matricula} onCerrar={cerrarDialogoPago} onPagado={onPagado} />
      </Dialog>

      {mostrarCredencial && (
        <CredencialMiembro matricula={matricula} miembro={miembro} onImpreso={onImpreso} />
      )}

      {cargando && <CircularProgress size={64} />}

      <Snackbar
        open={mostrarMensaje}
        autoHideDuration={3000}
        onClose={() => setMostrarMensaje(false)}
        message={mensaje.texto}
      />
    </Box>
  );
};

export default NuevoMiembro;
