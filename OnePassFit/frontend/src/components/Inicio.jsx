// src/pages/Inicio.jsx
import React, { useEffect, useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import CartasPersonalizadas from './Dialogs/CartasPersonalizadas';
import SparklineComponent from './Dialogs/SparklineComponent';

const Inicio = () => {
  const [cargando, setCargando] = useState(false);
  const [datosVisitas, setDatosVisitas] = useState([]);
  const [datosPagos, setDatosPagos] = useState([]);

  const [etiquetasVisitasHora, setEtiquetasVisitasHora] = useState([]);
  const [valoresVisitasHora, setValoresVisitasHora] = useState([]);
  const [etiquetasVisitasSemana, setEtiquetasVisitasSemana] = useState([]);
  const [valoresVisitasSemana, setValoresVisitasSemana] = useState([]);
  const [etiquetasVisitasMes, setEtiquetasVisitasMes] = useState([]);
  const [valoresVisitasMes, setValoresVisitasMes] = useState([]);

  const [etiquetasPagosSemana, setEtiquetasPagosSemana] = useState([]);
  const [valoresPagosSemana, setValoresPagosSemana] = useState([]);
  const [etiquetasPagosMes, setEtiquetasPagosMes] = useState([]);
  const [valoresPagosMes, setValoresPagosMes] = useState([]);
  const [etiquetasPagosMeses, setEtiquetasPagosMeses] = useState([]);
  const [valoresPagosMeses, setValoresPagosMeses] = useState([]);

  useEffect(() => {
    obtenerDatos();
  }, []);

  const obtenerDatos = () => {
    setCargando(true);

    // TODO: Conectar con el endpoint real: /api/dashboard o similar
    setTimeout(() => {
      const visitas = {
        totalVisitas: 1200,
        visitasHoy: 30,
        visitasSemana: 140,
        visitasMes: 540
      };
      const pagos = {
        totalPagos: 45200,
        pagosHoy: 900,
        pagosSemana: 3800,
        pagosMes: 18200
      };
      setDatosVisitas([
        { color: 'purple', icono: 'EventAvailable', nombre: 'Total visitas', total: visitas.totalVisitas },
        { color: 'pink', icono: 'Event', nombre: 'Visitas hoy', total: visitas.visitasHoy },
        { color: 'red', icono: 'DateRange', nombre: 'Visitas semana', total: visitas.visitasSemana },
        { color: 'indigo', icono: 'CalendarMonth', nombre: 'Visitas mes', total: visitas.visitasMes }
      ]);
      setDatosPagos([
        { color: 'blue', icono: 'AttachMoney', nombre: 'Total pagos', total: `$${pagos.totalPagos}` },
        { color: 'teal', icono: 'Event', nombre: 'Pagos hoy', total: `$${pagos.pagosHoy}` },
        { color: 'green', icono: 'DateRange', nombre: 'Pagos semana', total: `$${pagos.pagosSemana}` },
        { color: 'orange', icono: 'CalendarMonth', nombre: 'Pagos mes', total: `$${pagos.pagosMes}` }
      ]);

      setEtiquetasVisitasHora(['6 AM', '9 AM', '12 PM', '3 PM', '6 PM']);
      setValoresVisitasHora([5, 10, 12, 8, 15]);

      setEtiquetasVisitasSemana(['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']);
      setValoresVisitasSemana([20, 18, 22, 19, 25, 15, 21]);

      setEtiquetasVisitasMes(['1', '5', '10', '15', '20', '25', '30']);
      setValoresVisitasMes([10, 18, 30, 40, 25, 22, 17]);

      setEtiquetasPagosSemana(['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']);
      setValoresPagosSemana([300, 400, 350, 500, 800, 600, 450]);

      setEtiquetasPagosMes(['1', '5', '10', '15', '20', '25', '30']);
      setValoresPagosMes([500, 1200, 1800, 900, 1000, 1300, 1400]);

      setEtiquetasPagosMeses(['Ene', 'Feb', 'Mar', 'Abr', 'May']);
      setValoresPagosMeses([3500, 4200, 4700, 4900, 6000]);

      setCargando(false);
    }, 1000);
  };

  return (
    <Box sx={{ p: 2 }}>
      <CartasPersonalizadas cartas={datosVisitas} />
      <Box className="row">
        <Box className="col-sm-6 col-lg-4 col-12">
          <SparklineComponent etiquetas={etiquetasVisitasHora} valores={valoresVisitasHora} color='pink' titulo='Visitas por hora' subtitulo='Visitas registradas por hora' />
        </Box>
        <Box className="col-sm-6 col-lg-4 col-12">
          <SparklineComponent etiquetas={etiquetasVisitasSemana} valores={valoresVisitasSemana} color='red' titulo='Visitas semana' subtitulo='Visitas registradas esta semana' />
        </Box>
        <Box className="col-sm-6 col-lg-4 col-12">
          <SparklineComponent etiquetas={etiquetasVisitasMes} valores={valoresVisitasMes} color='indigo' titulo='Visitas mes' subtitulo='Visitas registradas este mes' />
        </Box>
      </Box>

      <CartasPersonalizadas cartas={datosPagos} />
      <Box className="row mt-3">
        <Box className="col-sm-6 col-lg-4 col-12">
          <SparklineComponent etiquetas={etiquetasPagosSemana} valores={valoresPagosSemana} color='green' titulo='Pagos semana' subtitulo='Pagos registrados esta semana' />
        </Box>
        <Box className="col-sm-6 col-lg-4 col-12">
          <SparklineComponent etiquetas={etiquetasPagosMes} valores={valoresPagosMes} color='orange' titulo='Pagos mes' subtitulo='Pagos registrados este mes' />
        </Box>
        <Box className="col-sm-6 col-lg-4 col-12">
          <SparklineComponent etiquetas={etiquetasPagosMeses} valores={valoresPagosMeses} color='blue' titulo='Pagos por meses' subtitulo='Pagos registrados por meses del año' />
        </Box>
      </Box>

      {cargando && <CircularProgress size={64} />}
    </Box>
  );
};

export default Inicio;
