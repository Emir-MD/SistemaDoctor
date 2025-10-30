import React, { useEffect, useState } from 'react';
import {
  Box,
  TextField,
  MenuItem,
  Button,
  CircularProgress,
  Backdrop
} from '@mui/material';
import { useAuth } from '@/context/authContext';
import { getGyms } from '../../services/userService';

export default function FormUsuario({ initialData = {}, onSubmit }) {
  const { user: creador } = useAuth();
  const miRol = creador?.role; // "superadministrador", "administrador" o "recepcionista"

  // Formularios
  const [form, setForm] = useState({
    fullName: initialData.fullName || '',
    email:    initialData.email    || '',
    password: '',
    role:     initialData.role     || '',
    phone:    initialData.phone    || '',
    gymId:    initialData.gymId    || ''
  });
  const [gyms, setGyms] = useState([]);
  const [loadingGyms, setLoadingGyms] = useState(false);

  // Determina qué roles puedes crear
  let rolesPermitidos = [];
  if (miRol === 'superadministrador') {
    rolesPermitidos = [
      'superadministrador',
      'administrador',
      'recepcionista',
      'cliente'
    ];
  } else if (miRol === 'administrador') {
    rolesPermitidos = ['recepcionista'];
  } else if (miRol === 'recepcionista') {
    rolesPermitidos = ['cliente'];
  }

  // Si eres superadmin, carga lista de gyms
  useEffect(() => {
    if (miRol === 'superadministrador') {
      setLoadingGyms(true);
      getGyms()
        .then(setGyms)
        .catch(console.error)
        .finally(() => setLoadingGyms(false));
    }
  }, [miRol]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // validaciones mínimas
    if (!form.fullName || !form.email || !form.role || !form.phone) return;
    // password obligatorio solo al crear (no al editar)
    if (!initialData.fullName && form.password.length < 6) return;
    onSubmit(form);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'grid', gap: 2 }}>
      {/* Nombre completo */}
      <TextField
        label="Nombre completo"
        name="fullName"
        value={form.fullName}
        onChange={handleChange}
        required
      />

      {/* Email */}
      <TextField
        label="Email"
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        required
      />

      {/* Contraseña */}
      {!initialData.fullName && (
        <TextField
          label="Contraseña"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          helperText="Mínimo 6 caracteres"
          required
        />
      )}

      {/* Teléfono */}
      <TextField
        label="Teléfono"
        name="phone"
        value={form.phone}
        onChange={handleChange}
        required
      />

      {/* Rol del nuevo usuario */}
      <TextField
        select
        label="Rol"
        name="role"
        value={form.role}
        onChange={handleChange}
        required
      >
        {rolesPermitidos.map((r) => (
          <MenuItem key={r} value={r}>
            {r.charAt(0).toUpperCase() + r.slice(1)}
          </MenuItem>
        ))}
      </TextField>

      {/* Si eres superadmin, asigna gym */}
      {miRol === 'superadministrador' && (
        <TextField
          select
          label="Gimnasio"
          name="gymId"
          value={form.gymId}
          onChange={handleChange}
          required
        >
          {loadingGyms
            ? <MenuItem>cargando…</MenuItem>
            : gyms.map((g) => (
                <MenuItem key={g._id} value={g._id}>
                  {g.nombre}
                </MenuItem>
              ))
          }
        </TextField>
      )}

      <Button type="submit" variant="contained">
        {initialData.fullName ? 'Actualizar' : 'Crear'} Usuario
      </Button>
    </Box>
  );
}
