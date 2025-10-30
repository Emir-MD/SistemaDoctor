// src/components/PeriodoBusqueda.jsx
import React, { useState } from 'react';
import {
  TextField,
  Button,
  Popover,
  Box
} from '@mui/material';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { esES } from '@mui/x-date-pickers/locales';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const PeriodoBusqueda = ({ onBuscar }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [value, setValue] = useState([null, null]);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleBuscar = () => {
    onBuscar(value);
    handleClose();
  };

  const open = Boolean(anchorEl);

  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      adapterLocale="es"
      localeText={esES.components.MuiLocalizationProvider.defaultProps.localeText}
    >
      <Box>
        <TextField
          label="Selecciona un periodo"
          value={
            value[0] && value[1]
              ? `${dayjs(value[0]).format('DD/MM/YYYY')} - ${dayjs(value[1]).format('DD/MM/YYYY')}`
              : ''
          }
          onClick={handleClick}
          fullWidth
          InputProps={{
            readOnly: true
          }}
        />
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        >
          <Box sx={{ p: 2 }}>
            <DateRangePicker
              calendars={1}
              value={value}
              onChange={(newValue) => setValue(newValue)}
            />
            <Box display="flex" justifyContent="flex-end" mt={2}>
              <Button onClick={handleClose} color="inherit">Cancelar</Button>
              <Button onClick={handleBuscar} color="primary">Buscar</Button>
            </Box>
          </Box>
        </Popover>
      </Box>
    </LocalizationProvider>
  );
};

export default PeriodoBusqueda;
