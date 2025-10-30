// src/components/Encabezado.jsx
import React, { useState, useEffect, useMemo } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Divider,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import * as Icons from "@mui/icons-material";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "@/context/authContext";

// Define aquí todos los menús, indexados por rol exacto tal como viene del back:
const MENUS = {
  superadministrador: [
    { title: "Inicio",      icon: "Dashboard",     link: "/inicio" },
    { title: "Gimnasios",   icon: "Business",      link: "/gyms" },
    { title: "Usuarios",    icon: "AccountBox",    link: "/usuarios" },
    { title: "Accesos",     icon: "CalendarToday", link: "/visitas" },
    { title: "Configuración", icon: "Settings",    link: "/configuracion" },
  ],
  administrador: [
    { title: "Inicio",       icon: "Dashboard",     link: "/inicio" },
    { title: "Miembros",     icon: "FitnessCenter", link: "/miembros" },
    { title: "Membresías",   icon: "CardMembership",link: "/membresias" },
    { title: "Pagos",        icon: "AttachMoney",   link: "/pagos" },
  ],
  recepcionista: [
    { title: "Inicio",       icon: "Dashboard",     link: "/inicio" },
    { title: "Registrar visita", icon: "Home",      link: "/recepcion" },
    { title: "Miembros",     icon: "FitnessCenter", link: "/miembros" },
  ],
  usuario: [
    { title: "Mi credencial", icon: "Badge",         link: "/usuario/credencial" },
  ],
};

export default function Encabezado() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { user, logout }            = useAuth();
  const navigate                    = useNavigate();
  const location                    = useLocation();

  // Cierra automáticamente al cambiar de ruta
  useEffect(() => {
    setDrawerOpen(false);
  }, [location.pathname]);

  // Botón de salir
  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  // Icono dinámico
  const getIcon = (name) => {
    const Cmp = Icons[name] || Icons.Help;
    return <Cmp sx={{ color: "white" }} />;
  };

  // El menú para este rol (o vacío si no hay sesión)
  const menuItems = useMemo(() => {
    if (!user?.rol) return [];
    return MENUS[user.rol] || [];
  }, [user]);

  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => setDrawerOpen(true)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, ml: 2 }}>
            {user?.gymName || "OnePassFit"}
          </Typography>
          <IconButton color="inherit" onClick={handleLogout} title="Cerrar sesión">
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{ sx: { width: 260, bgcolor: "#1706FF", color: "white" } }}
      >
        <Box sx={{ p: 2, display: "flex", alignItems: "center" }}>
          <Avatar src={user?.gymLogo} sx={{ mr: 2 }} />
          <Box>
            <Typography variant="subtitle1">{user?.gymName}</Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>{user?.fullName}</Typography>
          </Box>
        </Box>
        <Divider />

        <List>
          {menuItems.map(({ title, icon, link }) => (
            <ListItem
              button
              key={link}
              component={Link}
              to={link}
              selected={location.pathname.startsWith(link)}
            >
              <ListItemIcon sx={{ color: "white", minWidth: 36 }}>
                {getIcon(icon)}
              </ListItemIcon>
              <ListItemText primary={title} />
            </ListItem>
          ))}

          {/* Siempre disponible: Mi perfil */}
          <ListItem
            button
            component={Link}
            to="/perfil"
            selected={location.pathname === "/perfil"}
          >
            <ListItemIcon sx={{ color: "white", minWidth: 36 }}>
              <Icons.AccountCircle />
            </ListItemIcon>
            <ListItemText primary="Mi perfil" />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}
