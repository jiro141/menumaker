import { useState, useCallback } from "react";
import { getPlatillosListName } from "../../../api/controllers/platillos";
import { getPlatillosList } from "../../../api/controllers/platillos";
import MainContext from "../../contexts/MainConstext";

export const usePlatillos = (ids) => {
  const [namesPlatillos, setNamesPlatillos] = useState([]);

  const getName = useCallback(async (ids) => {
    try {
      // Mapea sobre cada ID y realiza la consulta
      const platillosPromises = ids.map(async (id) => {
        return await getPlatillosListName(id);
      });

      // Espera a que se completen todas las consultas
      const platillosResults = await Promise.all(platillosPromises);

      // Concatena los resultados en un solo array
      const allPlatillos = platillosResults.flat();

      // Actualiza el estado
      setNamesPlatillos(allPlatillos);

      // console.log(allPlatillos, "nombres");
    } catch (error) {
      console.log(error);
    }
  }, []);
  const getPlatillos = useCallback(async (ids) => {
    // console.log(ids,'hokk');
    try {
      // Mapea sobre cada ID y realiza la consulta
      const platillosPromises = ids.map(async (id) => {
        return await getPlatillosList(id);
      });

      // Espera a que se completen todas las consultas
      const platillosResults = await Promise.all(platillosPromises);

      // Concatena los resultados en un solo array
      const allPlatillos = platillosResults.flat();

      // Actualiza el estado
      setNamesPlatillos(allPlatillos);

      // console.log(allPlatillos, "nombres");
    } catch (error) {
      console.log(error);
    }
  }, []);


  return {
    namesPlatillos,
    setNamesPlatillos,
    getName,
    getPlatillos
  };
};
