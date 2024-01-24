import React from "react";
import ReactDOM from "react-dom/client";
import AppRoutes from "./routes.jsx";
import { BrowserRouter } from "react-router-dom";
import { MainContextProvider } from "./components/contexts/MainConstext.jsx"; // Corrige el nombre de la importación

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <MainContextProvider>
        <AppRoutes />
        
      </MainContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
