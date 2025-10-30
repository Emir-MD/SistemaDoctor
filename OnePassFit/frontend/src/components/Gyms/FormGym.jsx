// src/components/Gyms/FormGym.jsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Typography,
  Avatar
} from '@mui/material';

/**
 * Formulario para crear o editar un gimnasio.
 * Props:
 * - initialData: { id, name, location, phone, membershipPrices, logoUrl }
 * - onSubmit: function(formData)
 */
export default function FormGym({ initialData = {}, onSubmit }) {
  const [form, setForm] = useState({
    id:       initialData._id  || '',
    name:     initialData.name || '',
    location: initialData.location || '',
    phone:    initialData.phone || '',
    mensual:  initialData.membershipPrices?.mensual  || '',
    semestral:initialData.membershipPrices?.semestral|| '',
    anual:    initialData.membershipPrices?.anual    || '',
    logo:     null,
    preview:  initialData.logoUrl || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setForm(f => ({
      ...f,
      logo: file,
      preview: URL.createObjectURL(file)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validaciones mínimas
    if (!form.id || !form.name || !form.location) return;
    onSubmit({
      id: form.id,
      name: form.name,
      location: form.location,
      phone: form.phone,
      membershipPrices: {
        mensual:   form.mensual,
        semestral: form.semestral,
        anual:     form.anual
      },
      logo: form.logo
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'grid', gap: 2 }}>
      <Typography variant="h6">
        {initialData._id ? 'Editar Gimnasio' : 'Crear Gimnasio'}
      </Typography>

      <TextField
        label="ID único"
        name="id"
        value={form.id}
        onChange={handleChange}
        required
      />

      <TextField
        label="Nombre"
        name="name"
        value={form.name}
        onChange={handleChange}
        required
      />

      <TextField
        label="Localidad"
        name="location"
        value={form.location}
        onChange={handleChange}
        required
      />

      <TextField
        label="Teléfono"
        name="phone"
        value={form.phone}
        onChange={handleChange}
      />

      <TextField
        type="number"
        label="Precio Mensual"
        name="mensual"
        value={form.mensual}
        onChange={handleChange}
      />
      <TextField
        type="number"
        label="Precio Semestral"
        name="semestral"
        value={form.semestral}
        onChange={handleChange}
      />
      <TextField
        type="number"
        label="Precio Anual"
        name="anual"
        value={form.anual}
        onChange={handleChange}
      />

      <Button variant="contained" component="label">
        Subir Logo
        <input hidden accept="image/*" type="file" onChange={handleFile} />
      </Button>

      {form.preview && (
        <Avatar
          src={form.preview}
          variant="square"
          sx={{ width: 100, height: 100, mb: 2 }}
        />
      )}

      <Button type="submit" variant="contained">
        {initialData._id ? 'Actualizar' : 'Crear'} Gimnasio
      </Button>
    </Box>
  );
}
