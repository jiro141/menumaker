// ProtectedRoute.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../../../view/Home";
import Login from "../../../view/Login";
import App from "../../../App";
import Menu from "../../../view/createMenu";
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <Routes>
      {isAuthenticated ? (
        <>
          <Route path="/Home" element={<Home />} />
          <Route path="/Menu" element={<Menu />} />
          <Route path="/app" element={<App />} />
        </>
      ) : (
        <Route path="*" element={<Navigate to="/" />} />
      )}
    </Routes>
  );
};

export default ProtectedRoute;
