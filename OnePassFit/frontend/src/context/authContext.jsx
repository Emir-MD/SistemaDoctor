// src/context/authContext.jsx
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { loginRequest, renewToken } from "../services/authService";

/**
 * Normaliza la respuesta del backend para unificar el campo de rol.
 * Asegura tanto `role` como `rol` en minúsculas.
 */
const normalizeUser = (u) => ({
  ...u,
  role: (u.role ?? u.rol ?? u.tipo ?? "").toLowerCase(),
  rol : (u.role ?? u.rol ?? u.tipo ?? "").toLowerCase(),
});

const AuthContext = createContext(null);

/**
 * Proveedor de autenticación.
 * Gestiona login, logout, renovación de token y estado de usuario.
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Realiza login y almacena token + usuario en localStorage.
   */
  const login = async (correo, contraseña) => {
    try {
      const { token, usuario } = await loginRequest(correo, contraseña);
      const normalized = normalizeUser(usuario);
      localStorage.setItem("token", token);
      localStorage.setItem("usuario", JSON.stringify(normalized));
      setUser(normalized);
      setError(null);
    } catch (err) {
      setError(
        typeof err === "string"
          ? err
          : err?.response?.data?.mensaje || "Credenciales inválidas"
      );
      setUser(null);
    }
  };

  /**
   * Cierra la sesión, limpia el storage y redirige a login.
   */
  const logout = () => {
    localStorage.clear();
    setUser(null);
    window.location.href = "/login";
  };

  /**
   * Al montar, valida token con renewToken y setea user.
   */
  useEffect(() => {
    const validateSession = async () => {
      const token  = localStorage.getItem("token");
      const stored = localStorage.getItem("usuario");

      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      if (stored) {
        try {
          setUser(JSON.parse(stored));
        } catch {}
      }

      try {
        const { usuario } = await renewToken();
        const normalized = normalizeUser(usuario);
        localStorage.setItem("usuario", JSON.stringify(normalized));
        setUser(normalized);
      } catch {
        logout();
      } finally {
        setLoading(false);
      }
    };
    validateSession();
  }, []);

  const value = useMemo(
    () => ({ user, loading, error, login, logout }),
    [user, loading, error]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

/**
 * Forzar cierre de sesión desde otros módulos (ej. interceptores axios)
 */
export const forceLogout = () => {
  localStorage.clear();
  window.location.href = "/login";
};
