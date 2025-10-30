// src/components/BusquedaMiembro.jsx
import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  TextField,
  CircularProgress,
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Autocomplete
} from '@mui/material';

const BusquedaMiembro = ({ onSeleccionado }) => {
  const [cargando, setCargando] = useState(false);
  const [busqueda, setBusqueda] = useState('');
  const [miembros, setMiembros] = useState([]);
  const [miembroSeleccionado, setMiembroSeleccionado] = useState(null);

  const buscarMiembros = async (texto) => {
    if (!texto) return;
    setCargando(true);
    setBusqueda(texto);

    // TODO: Reemplazar con llamada real a API
    setTimeout(() => {
      setMiembros([
        { id: 1, nombre: 'Juan Pérez', matricula: '12345', imagen: '' },
        { id: 2, nombre: 'Ana Gómez', matricula: '67890', imagen: '' }
      ]);
      setCargando(false);
    }, 1000);
  };

  const customFilter = (options, state) => {
    return options.filter(opt => {
      const texto = state.inputValue.toLowerCase();
      return (
        opt.nombre.toLowerCase().includes(texto) ||
        opt.matricula.toLowerCase().includes(texto)
      );
    });
  };

  useEffect(() => {
    if (miembroSeleccionado) {
      onSeleccionado(miembroSeleccionado);
    }
  }, [miembroSeleccionado]);

  return (
    <Card>
      <CardContent>
        <Autocomplete
          options={miembros}
          loading={cargando}
          getOptionLabel={(option) => option.nombre}
          filterOptions={customFilter}
          onInputChange={(e, value) => buscarMiembros(value)}
          onChange={(e, value) => setMiembroSeleccionado(value)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Escribe el nombre o la matrícula del miembro"
              variant="outlined"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {cargando ? <CircularProgress color="inherit" size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </>
                )
              }}
            />
          )}
          renderOption={(props, option) => (
            <ListItem {...props} key={option.id} alignItems="flex-start">
              <ListItemAvatar>
                <Avatar src={option.imagen || '/avatar.png'} />
              </ListItemAvatar>
              <ListItemText
                primary={option.nombre}
                secondary={option.matricula}
              />
            </ListItem>
          )}
        />
      </CardContent>
    </Card>
  );
};

export default BusquedaMiembro;
