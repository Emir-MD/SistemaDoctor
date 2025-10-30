// src/services/userService.js
import api from '@/api/axios';

export const getGyms = async () => {
  const { data } = await api.get('/gyms');
  return data.gyms;              // ajusta según tu payload
};

export const listUsers = async () => {
  const { data } = await api.get('/usuarios');
  return data.usuarios;
};

export const createUser = async (userData) => {
  const { data } = await api.post('/usuarios', userData);
  return data.usuario;
};

export const updateUser = async (id, userData) => {
  const { data } = await api.put(`/usuarios/${id}`, userData);
  return data.usuario;
};
