// AppRoutes.jsx
import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./view/Login";
import App from "./App";
import Home from "./view/Home";
import Menu from "./view/createMenu";
import "./index.css";
import Pedidos from "./view/pedidos/pedidos";
import ProtectedRoute from "./components/widgets/ProtectedRoute/ProtectedRoute";

const AppRoutes = () => {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <Routes>
      {/* Ruta por defecto al Login */}
      <Route path="/" element={<Login />} />

      {/* Rutas protegidas */}
      {isAuthenticated ? (
        <>
          <Route path="/Home" element={<Home />} />
          <Route path="/Menu" element={<Menu />} />
          <Route path="/app" element={<App />} />
          <Route path="/pedidos" element={<Pedidos />} />
        </>
      ) : (
        // Redirige a "/" si no está autenticado
        <Route path="*" element={<Navigate to="/" />} />
      )}
    </Routes>
  );
};

export default AppRoutes;
