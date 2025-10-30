// src/pages/MiPerfil.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Box } from '@mui/material';
import CartasPersonalizadas from '../Dialogs/CartasPersonalizadas';

const MiPerfil = () => {
  const navigate = useNavigate();
  const nombreUsuario = localStorage.getItem('nombreUsuario');
  const [datosVisitas, setDatosVisitas] = useState([]);
  const [datosPagos, setDatosPagos] = useState([]);

  useEffect(() => {
    obtenerInformacion();
  }, []);

  const cambiarPassword = () => {
    navigate('/cambiar-password');
  };

  const obtenerInformacion = () => {
    const idUsuario = localStorage.getItem('idUsuario');

    // TODO: Reemplazar con fetch o Axios a /api/usuarios/:id para obtener info del perfil
    const resultado = {
      datosVisitas: {
        totalVisitas: 48,
        visitasHoy: 2,
        visitasSemana: 6,
        visitasMes: 14
      },
      datosPagos: {
        totalPagos: 1200,
        pagosHoy: 150,
        pagosSemana: 300,
        pagosMes: 800
      }
    };

    crearCartas(resultado.datosVisitas, resultado.datosPagos);
  };

  const crearCartas = (visitas, pagos) => {
    setDatosVisitas([
      { color: 'purple', icono: 'mdi-calendar-star', nombre: 'Total visitas', total: visitas.totalVisitas },
      { color: 'pink', icono: 'mdi-calendar', nombre: 'Visitas hoy', total: visitas.visitasHoy },
      { color: 'red', icono: 'mdi-calendar-range', nombre: 'Visitas semana', total: visitas.visitasSemana },
      { color: 'indigo', icono: 'mdi-calendar-month', nombre: 'Visitas mes', total: visitas.visitasMes },
    ]);

    setDatosPagos([
      { color: 'blue', icono: 'mdi-currency-usd', nombre: 'Total pagos', total: `$${pagos.totalPagos}` },
      { color: 'teal', icono: 'mdi-calendar', nombre: 'Pagos hoy', total: `$${pagos.pagosHoy}` },
      { color: 'green', icono: 'mdi-calendar-range', nombre: 'Pagos semana', total: `$${pagos.pagosSemana}` },
      { color: 'orange', icono: 'mdi-calendar-month', nombre: 'Pagos mes', total: `$${pagos.pagosMes}` },
    ]);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>{nombreUsuario}</Typography>
      <Button variant="contained" color="primary" onClick={cambiarPassword}>
        Cambiar contraseña
      </Button>

      <CartasPersonalizadas cartas={datosVisitas} />
      <CartasPersonalizadas cartas={datosPagos} />
    </Box>
  );
};

export default MiPerfil;
