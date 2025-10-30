// src/services/gymService.js
import api from '../api/axios';

/**
 * Obtiene la lista de gimnasios.
 * @returns {Promise<Array>} Array de objetos Gym
 */
export const getGyms = async () => {
  const { data } = await api.get('/gyms');
  // Puedes ajustar según tu payload: { gyms: [...] }
  return data.gyms || data;
};

/**
 * Crea un nuevo gimnasio.
 * @param {object} gymData
 * @param {string} gymData.id                ID único del gimnasio (_id)
 * @param {string} gymData.name              Nombre del gimnasio
 * @param {string} gymData.location          Localidad o dirección
 * @param {string} [gymData.phone]           Teléfono del gimnasio
 * @param {{mensual:number,semestral:number,anual:number}} gymData.membershipPrices
 * @param {File} [gymData.logo]              Archivo de imagen para el logo
 * @returns {Promise<object>} Gym creado
 */
export const createGym = async (gymData) => {
  const formData = new FormData();
  formData.append('_id', gymData.id);
  formData.append('name', gymData.name);
  formData.append('location', gymData.location);
  if (gymData.phone) formData.append('phone', gymData.phone);
  if (gymData.membershipPrices) {
    formData.append('membershipPrices[mensual]',   gymData.membershipPrices.mensual);
    formData.append('membershipPrices[semestral]', gymData.membershipPrices.semestral);
    formData.append('membershipPrices[anual]',     gymData.membershipPrices.anual);
  }
  if (gymData.logo) formData.append('logo', gymData.logo);

  const { data } = await api.post(
    '/gyms',
    formData,
    { headers: { 'Content-Type': 'multipart/form-data' } }
  );
  return data.gym || data;
};

/**
 * Actualiza un gimnasio existente.
 * @param {string} id                         ID del gimnasio a actualizar
 * @param {object} gymData                    Campos a actualizar
 * @param {string} [gymData.name]
 * @param {string} [gymData.location]
 * @param {string} [gymData.phone]
 * @param {{mensual:number,semestral:number,anual:number}} [gymData.membershipPrices]
 * @param {File} [gymData.logo]
 * @returns {Promise<object>} Gym actualizado
 */
export const updateGym = async (id, gymData) => {
  const formData = new FormData();
  if (gymData.name)      formData.append('name', gymData.name);
  if (gymData.location)  formData.append('location', gymData.location);
  if (gymData.phone)     formData.append('phone', gymData.phone);
  if (gymData.membershipPrices) {
    formData.append('membershipPrices[mensual]',   gymData.membershipPrices.mensual);
    formData.append('membershipPrices[semestral]', gymData.membershipPrices.semestral);
    formData.append('membershipPrices[anual]',     gymData.membershipPrices.anual);
  }
  if (gymData.logo)      formData.append('logo', gymData.logo);

  const { data } = await api.put(
    `/gyms/${id}`,
    formData,
    { headers: { 'Content-Type': 'multipart/form-data' } }
  );
  return data.gym || data;
};

/**
 * Elimina (lógico) un gimnasio por su ID.
 * @param {string} id ID del gimnasio
 * @returns {Promise<object>} Resultado de la operación
 */
export const deleteGym = async (id) => {
  const { data } = await api.delete(`/gyms/${id}`);
  return data;
};
