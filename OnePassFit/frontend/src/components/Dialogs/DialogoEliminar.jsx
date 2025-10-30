// src/components/DialogoEliminar.jsx
import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  DialogContent,
  Typography
} from '@mui/material';

const DialogoEliminar = ({ open, nombre, onCancelar, onEliminar }) => {
  return (
    <Dialog open={open} onClose={onCancelar}>
      <DialogTitle>
        ¿Seguro que deseas eliminar <strong>{nombre}</strong>?
      </DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="textSecondary">
          Esta acción no se puede deshacer.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancelar} color="primary">
          Cancelar
        </Button>
        <Button onClick={onEliminar} color="primary">
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogoEliminar;
