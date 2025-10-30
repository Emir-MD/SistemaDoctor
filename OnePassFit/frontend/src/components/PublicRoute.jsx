// src/components/PublicRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/authContext";
import Loader from "@/components/Loader";          // si quieres spinner

/**
 * Ruta pública:
 *  • Si NO hay sesión → muestra children (Login, Registro, etc.).
 *  • Si SÍ hay sesión → redirige al panel según rol.
 */
export default function PublicRoute({ children }) {
  const { user, loading } = useAuth();

  /* ⏳ Mientras valida el token */
  if (loading) return <Loader fullScreen />;   // o null

  /* ✅ Sin sesión */
  if (!user) return children;

  /* 🔄 Con sesión → a su panel */
  const destino =
    user.rol === "usuario" ? "/usuario/credencial" : "/inicio";

  return <Navigate to={destino} replace />;
}
