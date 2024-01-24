import { useState, useCallback } from "react";
import { getCategoriasName } from "../../../api/controllers/categorias";
import { getCategorias } from "../../../api/controllers/categorias";
import MainContext from "../../contexts/MainConstext";

export const useCategorias = (ids) => {
  const [namesCategorias, setNamesCategorias] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const getNameCategorias = useCallback(async (ids) => {
    try {
      // Mapea sobre cada ID y realiza la consulta
      const categoriasPromises = ids.map(async (id) => {
        return await getCategoriasName(id);
      });

      // Espera a que se completen todas las consultas
      const categoriasResults = await Promise.all(categoriasPromises);

      // Concatena los resultados en un solo array
      const allCategorias = categoriasResults.flat();

      // Actualiza el estado
      setNamesCategorias(allCategorias);

      // console.log(allPlatillos, "nombres");
    } catch (error) {
      console.log(error);
    }
  }, []);

  const consultaCategorias = useCallback(async () => {
    try {
      const categoriasResults = await getCategorias();
      if (categoriasResults) {
        setCategorias(categoriasResults);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  return {
    namesCategorias,
    setNamesCategorias,
    getNameCategorias,
    setCategorias,
    categorias,
    consultaCategorias,
  };
};
