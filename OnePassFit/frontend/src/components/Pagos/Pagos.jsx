// Pagos.jsx
import React, { useEffect, useState } from 'react';
import {
  Typography,
  TextField,
  CircularProgress,
  Avatar,
  Alert,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Box
} from '@mui/material';
import HttpService from '../../Servicios/HttpService';
import Utiles from '../../Servicios/Utiles';
import PeriodoBusqueda from '../Dialogos/PeriodoBusqueda';
import CartasTotales from '../Dialogos/CartasTotales';
import CartasTotalesMiembros from '../Dialogos/CartasTotalesMiembros';
import DataTable from '../Dialogos/DataTable'; // componente personalizado para tabla con filtros

const Pagos = () => {
  const [busqueda, setBusqueda] = useState('');
  const [cargando, setCargando] = useState(false);
  const [pagos, setPagos] = useState([]);
  const [filtros, setFiltros] = useState({ fechaInicio: null, fechaFin: null });
  const [totalPagos, setTotalPagos] = useState(0);
  const [totalesMembresias, setTotalesMembresias] = useState([]);
  const [totalesUsuarios, setTotalesUsuarios] = useState([]);
  const [totalesMiembros, setTotalesMiembros] = useState([]);

  const encabezadoTabla = [
    { text: 'Imagen', value: 'imagen' },
    { text: 'Miembro', value: 'nombre' },
    { text: 'Matrícula', value: 'matricula' },
    { text: 'Fecha', value: 'fecha' },
    { text: 'Monto pagado', value: 'monto' },
    { text: 'Membresía pagada', value: 'membresia' },
    { text: 'Cobró', value: 'usuario' }
  ];

  useEffect(() => {
    obtenerPagos();
  }, []);

  const onBuscar = (fechas) => {
    setFiltros({ fechaInicio: fechas[0], fechaFin: fechas[1] });
    obtenerPagos(fechas);
  };

  const obtenerPagos = (fechas = filtros) => {
    setCargando(true);
    const payload = {
      metodo: 'obtener',
      filtros: fechas
    };
    HttpService.obtenerConDatos(payload, 'pagos.php').then((respuesta) => {
      setPagos(respuesta.pagos);
      setTotalPagos(respuesta.totalPagos);
      setTotalesMembresias(respuesta.totalesMembresias);
      setTotalesUsuarios(respuesta.totalesUsuario);
      setTotalesMiembros(respuesta.totalesMiembros);
      setCargando(false);
    });
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Pagos <span style={{ color: '#3f51b5' }}>${totalPagos}</span>
      </Typography>

      <PeriodoBusqueda onBuscar={onBuscar} />

      {pagos.length > 0 && (
        <CartasTotales
          totales={totalesMembresias}
          titulo="Pagos realizados por membresía"
          icono="mdi-currency-usd"
          color="deep-orange darken-1"
        />
      )}

      <Card className="mt-3">
        <CardHeader
          title={`Pagos realizados: ${filtros.fechaInicio ? `${filtros.fechaInicio} al ${filtros.fechaFin}` : 'hoy'}`}
          action={
            <TextField
              label="Buscar"
              variant="outlined"
              size="small"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          }
        />
        <CardContent>
          <DataTable
            loading={cargando}
            headers={encabezadoTabla}
            items={pagos}
            search={busqueda}
            renderItemImage={(item) =>
              item.imagen ? <Avatar alt="foto" src={Utiles.generarURL(item.imagen)} /> : null
            }
            noDataText={<Alert severity="error">No se han encontrado datos :(</Alert>}
          />
        </CardContent>
      </Card>

      {pagos.length > 0 && (
        <>
          <Box mt={3}>
            <CartasTotales
              totales={totalesUsuarios}
              titulo="Pagos realizados por usuario"
              icono="mdi-account-cash"
              color="green darken-3"
            />
          </Box>
          <Box mt={3}>
            <CartasTotalesMiembros
              totales={totalesMiembros}
              titulo="Pagos realizados por miembros"
            />
          </Box>
        </>
      )}

      {cargando && (
        <Box mt={4} display="flex" justifyContent="center">
          <CircularProgress size={64} />
        </Box>
      )}
    </div>
  );
};

export default Pagos;
