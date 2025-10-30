// src/router/AppRouter.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import PublicRoute from "../components/PublicRoute";

/* ——— Vistas Públicas ——— */
import Login from "../components/Usuarios/Login";
import CambiarPassword from "../components/Usuarios/CambiarPassword";

/* ——— Layout General ——— */
import Encabezado from "../components/Encabezado";
import PieComponent from "../components/Dialogs/PieComponent";
import InicioComponent from "../components/Inicio";

/* ——— SuperAdmin ——— */
import Usuarios from "../components/Usuarios/Usuarios";
import NuevoUsuario from "../components/Usuarios/NuevoUsuario";
import EditarUsuario from "../components/Usuarios/EditarUsuario";
import ConfiguracionSistema from "../components/Configuracion/ConfiguracionSistema";
import Gym from "./../components/Gyms/Gyms";
import NuevoGym from "./../components/Gyms/NuevoGym";
import FormGym from "../components/Gyms/FormGym";


/* ——— Admin / Recepcionista ——— */
import MIembros from "../components/MIembros/MIembros";
import NuevoMiembro from "../components/MIembros/NuevoMiembro";
import RealizarPago from "../components/MIembros/RealizarPago";
import Membresias from "../components/Membresias/Membresias";
import FormMembresia from "../components/Membresias/FormMembresia";

/* ——— Perfil & Cliente Final ——— */
import MIPerfil from "../components/Usuarios/MIPerfil";
import CredencialMiembro from "../components/MIembros/CredencialMiembro";

export default function AppRouter() {
  return (
    <Routes>
      {/* — Root: redirige a login — */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* — Rutas Públicas — */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/cambiar-password"
        element={
          <PublicRoute>
            <CambiarPassword />
          </PublicRoute>
        }
      />

      {/* — Dashboard General — */}
      <Route
        path="/inicio"
        element={
          <PrivateRoute allowedRoles={["superadministrador", "administrador", "recepcionista"]}>
            <>
              <Encabezado />
              <InicioComponent />
              <PieComponent />
            </>
          </PrivateRoute>
        }
      />

      {/* — SuperAdmin — */}
      <Route
        path="/usuarios"
        element={
          <PrivateRoute allowedRoles={["superadministrador"]}>
            <Encabezado />
            <Usuarios />
          </PrivateRoute>
        }
      />

      <Route
        path="/gyms"
        element={
          <PrivateRoute allowedRoles={["superadministrador"]}>
            <Encabezado />
            <Gym />
            <NuevoGym />
          </PrivateRoute>
        }

      />
      <Route
        path="/usuarios/nuevo"
        element={
          <PrivateRoute allowedRoles={["superadministrador"]}>
            <Encabezado />
            <NuevoUsuario />
          </PrivateRoute>
        }
      />
      <Route
        path="/usuarios/editar/:id"
        element={
          <PrivateRoute allowedRoles={["superadministrador"]}>
            <EditarUsuario />
          </PrivateRoute>
        }
      />
      <Route
        path="/configuracion"
        element={
          <PrivateRoute allowedRoles={["superadministrador"]}>
            <Encabezado />
            <ConfiguracionSistema />
          </PrivateRoute>
        }
      />

      {/* — Admin / Recepcionista — */}
      <Route
        path="/miembros"
        element={
          <PrivateRoute allowedRoles={["administrador", "recepcionista"]}>
            <MIembros />
          </PrivateRoute>
        }
      />
      <Route
        path="/miembros/nuevo"
        element={
          <PrivateRoute allowedRoles={["administrador", "recepcionista"]}>
            <NuevoMiembro />
          </PrivateRoute>
        }
      />
      <Route
        path="/miembros/pago/:id"
        element={
          <PrivateRoute allowedRoles={["administrador", "recepcionista"]}>
            <RealizarPago />
          </PrivateRoute>
        }
      />
      <Route
        path="/membresias"
        element={
          <PrivateRoute allowedRoles={["administrador", "recepcionista"]}>
            <Membresias />
          </PrivateRoute>
        }
      />
      <Route
        path="/membresias/nueva"
        element={
          <PrivateRoute allowedRoles={["administrador", "recepcionista"]}>
            <FormMembresia />
          </PrivateRoute>
        }
      />

      {/* — Perfil (todos los roles) — */}
      <Route
        path="/perfil"
        element={
          <PrivateRoute allowedRoles={["superadministrador", "administrador", "recepcionista", "usuario"]}>
            <MIPerfil />
          </PrivateRoute>
        }
      />

      {/* — Cliente Final — */}
      <Route
        path="/usuario/credencial"
        element={
          <PrivateRoute allowedRoles={["usuario"]}>
            <CredencialMiembro />
          </PrivateRoute>
        }
      />

      {/* — 404: cualquier otra ruta redirige a login — */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
