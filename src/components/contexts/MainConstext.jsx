import React, { createContext, useState } from "react";

const MainContext = createContext();

export function MainContextProvider({ children }) {
  const [platilloIds, setPlatilloIds] = useState([]);
  const [nombreMenu, setNombreMenu] = useState("");
  const [bannerMenu, setBannerMenu] = useState("");
  const [categoriasIds, setCategoriasIds] = useState([]);
  return (
    <MainContext.Provider
      value={{
        platilloIds,
        setPlatilloIds,
        categoriasIds,
        setCategoriasIds,
        nombreMenu,
        setNombreMenu,
        bannerMenu,
        setBannerMenu,
      }}
    >
      {children}
    </MainContext.Provider>
  );
}

export default MainContext;
