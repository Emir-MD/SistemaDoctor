import api from "../api/axios";

/**
 * POST /auth/login
 * body { correo, contraseña }
 * → { token, usuario }
 */
export const loginRequest = async (correo, contraseña) => {
  const { data } = await api.post("/auth/login", { correo, contraseña });
  return data;
};

/**
 * GET /auth/perfil
 * Header Authorization: Bearer <token>
 * → { usuario }
 */
export const renewToken = async () => {
  const { data } = await api.get("/auth/perfil");
  return data;
};
