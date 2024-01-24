import { useState, useRef, useEffect, useContext } from "react";
import { Tooltip, Button, Typography } from "@material-tailwind/react";
import { RiFileUploadFill } from "react-icons/ri";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Toaster, toast } from "react-hot-toast";
import { postPlatillos } from "../../api/controllers/platillos";
import { aggFotoPlatillo } from "../../api/controllers/platillos";
import MainContext from "../../components/contexts/MainConstext";
import { useCategorias } from "../../components/widgets/Hooks/useCategorias";
import { postMenu } from "../../api/controllers/menu";

export const CheckMenu = ({ onSave }) => {
  const {
    platilloIds,
    setPlatilloIds,
    categoriasIds,
    setCategoriasIds,
    nombreMenu,
    setNombreMenu,
    bannerMenu,
    setBannerMenu,
  } = useContext(MainContext);
  // const formik = useFormik({
  //   initialValues: {
  //     nombre: nombreMenu,
  //     banner: bannerMenu,
  //     categorias: categoriasIds,
  //   },
  //   validationSchema: Yup.object({
  //     nombre: Yup.string().required("El campo es obligatorio"),
  //     descripcion: Yup.string().required("El campo es obligatorio"),
  //   }),
  //   validateOnChange: false,
  //   onSubmit: async (formData, { resetForm }) => {
  //     if (formData.categorias.length === 0 || formData.nombre === "") {
  //       formData.categorias = categoriasIds;
  //       formData.nombre = nombreMenu;
  //     }
  //     console.log(formData, "data menu componente");
  //     try {
  //       const data = await postMenu(formData);
  //       if (data) {
  //         // console.log(data);
  //         if (data == "Error al insertar categoría, posible nombre repetido") {
  //           toast.error(
  //             "Error al insertar categoría, posible nombre repetido."
  //           );
  //         } else {
  //           resetForm();
  //           toast.success(`Se creó el menu con exito.`);
  //         }
  //       }
  //     } catch (error) {
  //       console.error(error);
  //       toast.error("Error al crear menu");
  //     }
  //   },
  // });
  const handleCrearMenu = async () => {
    const formData = {
      nombre: nombreMenu,
      banner: bannerMenu,
      categorias: platilloIds,
    };
    if (formData.categorias.length === 0 || formData.nombre === "") {
      formData.categorias = categoriasIds;
      formData.nombre = nombreMenu;
    }
    try {
      const data = await postMenu(formData);
      if (data) {
        if (data);
        {
          toast.success("Se creó el menú con éxito.");
          // setNombreMenu(""); // Limpiar el nombre del menú
          // setBannerMenu(""); // Limpiar el banner del menú
          // onSave(); // Otra función que deberías implementar para manejar el éxito del menú creado
         
          // setTimeout(() => {
          //   window.location.reload();
          // }, 1200);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Error al crear menú");
    }
  };
  const { namesCategorias, setNamesCategorias, getNameCategorias } =
    useCategorias(categoriasIds);
  useEffect(() => {
    getNameCategorias(categoriasIds);
  }, [categoriasIds]);
  // console.log(namesCategorias);

  // Determinar la cantidad máxima de columnas
  const maxColumns = 4;
  const columnCount = Math.min(maxColumns, namesCategorias.length);

  return (
    <div>
      <Toaster />
      <form enctype="multipart/form-data">
        <h3 className="text-[#EC7C6A] font-semibold mb-5 mt-5">
          Datos de tu menu:
        </h3>
        <ul className="text-center mx-5  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3">
          <li className="text-white mb-10 mt-5">{`Nombre: ${nombreMenu}`}</li>
          <li className="text-white mb-10 mt-5">{`Banner: ${bannerMenu}`}</li>
        </ul>
        <h3 className="text-[#EC7C6A] font-semibold mb-5 mt-5">
          Categorias y platillos:
        </h3>
        <ul
          className={`text-center mx-5 grid grid-cols-1 md:grid-cols-${columnCount} lg:grid-cols-${columnCount} gap-3`}
        >
          {namesCategorias.map((categoria, index) => (
            <li key={index}>
              <h4 className="text-white mb-3">{`Categoría: ${categoria.nombre}`}</h4>
              {/* <p className="text-white text-left mb-3">{`Descripción: ${categoria.descripcion}`}</p> */}
              <ul>
                {categoria.platillos.map((platillo, platilloIndex) => (
                  <li
                    className="list-disc text-white text-left m-4"
                    key={platilloIndex}
                  >
                    {`Platillo ${platilloIndex + 1}: ${platillo.nombre}`}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <div className="flex justify-center">
          {namesCategorias.length === 0 ? (
            <Tooltip
              placement="left"
              content={
                <div className="w-72">
                  <Typography
                    color="black"
                    className="text-black font-medium text-center bg-white  rounded-t-md"
                  >
                    Aun no puedes crear el menu
                  </Typography>
                  <Typography
                    variant="small"
                    color="black"
                    className=" text-black font-normal bg-white  rounded-b-md"
                  >
                    Debes cumplir todos los requerimientos previos antes de la
                    creacion del menu.
                  </Typography>
                </div>
              }
              animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0, y: 25 },
              }}
            >
              <button
                // onClick={formik.handleSubmit}
                className={`bg-[#262837] text-center rounded-md bg-[#ec7c6a] px-4 py-2 flex justify-center  text-white ${
                  namesCategorias.length === 0 ? "isdisable" : ""
                }`}
                disabled={namesCategorias.length === 0}
              >
                Crear menu
              </button>
            </Tooltip>
          ) : (
            <button
              type="button"
              onClick={handleCrearMenu}
              className={`bg-[#262837] text-center rounded-md bg-[#ec7c6a] px-4 py-2 flex justify-center  text-white${
                namesCategorias.length === 0 ? "isdisable" : ""
              }`}
              disabled={namesCategorias.length === 0}
            >
              menu
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
