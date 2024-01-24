import { useState, useContext, useEffect, useRef } from "react";
import { Platillos } from "./Platillos";
import { RiFileUploadFill } from "react-icons/ri";
import { Tooltip, Button, Typography } from "@material-tailwind/react";
import { Toaster, toast } from "react-hot-toast";
import * as Yup from "yup";
import { useFormik } from "formik";
import MainContext from "../../components/contexts/MainConstext";
import { postCategorias } from "../../api/controllers/categorias";
import { usePlatillos } from "../../components/widgets/Hooks/usePlatillos";
export const Categorias = ({ prevStep, nextStep }) => {
  const { platilloIds, setPlatilloIds, categoriasIds, setCategoriasIds } =
    useContext(MainContext);
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const formik = useFormik({
    initialValues: {
      nombre: "",
      descripcion: "",
      platillos: platilloIds,
    },
    validationSchema: Yup.object({
      nombre: Yup.string().required("El campo es obligatorio"),
      descripcion: Yup.string().required("El campo es obligatorio"),
    }),
    validateOnChange: false,
    onSubmit: async (formData, { resetForm }) => {
      if (formData.platillos.length === 0) {
        formData.platillos = platilloIds;
      }
      try {
        const data = await postCategorias(formData);
        if (data) {
          // console.log(data);
          if (data == "Error al insertar categoría, posible nombre repetido") {
            toast.error(
              "Error al insertar categoría, posible nombre repetido."
            );
          } else {
            setCategoriasIds((prevIds) => [...prevIds, data.id]);
            resetForm();
            toast.success(`Se creó la categoria ${data.nombre} con exito.`);
            setPlatilloIds([]);
          }
        }
      } catch (error) {
        console.error(error);
        toast.error("Error al crear platillo");
      }
    },
  });
  const { namesPlatillos, setNamesPlatillos, getName } =
    usePlatillos(platilloIds);
  useEffect(() => {
    getName(platilloIds);
  }, [platilloIds]);
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const handleUpload = async () => {
    fileInputRef.current.click();
  };
  return (
    <form enctype="multipart/form-data">
      <Toaster />
      <div className="mx-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="mb-4">
          <label
            htmlFor="nombre"
            className="text-[#EC7C6A] block mb-2 font-medium"
          >
            Nombre:
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formik.values.nombre}
            onChange={(e) => formik.setFieldValue("nombre", e.target.value)}
            className="w-full border rounded-md py-2 px-3 mb-2"
            //   required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="descripcion"
            className="text-[#EC7C6A] block mb-2 font-medium"
          >
            Descripción:
          </label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={formik.values.descripcion}
            onChange={(e) =>
              formik.setFieldValue("descripcion", e.target.value)
            }
            className="w-full border rounded-md py-2 px-3 mb-2"
            style={{ maxHeight: "43px", resize: "vertical" }}
            required
          ></textarea>
        </div>
        <div>
          <label className="text-[#EC7C6A] block mb-2 font-medium">
            Platillos:
          </label>
          <div
            style={{
              backgroundColor: "white",
              maxHeight: "50px",
              overflowY: "auto",
              padding: "10px",
              borderRadius: "0.375rem",
            }}
          >
            <ul
              style={{
                listStyle: "none",
                padding: "0",
                margin: "0",
                display: namesPlatillos.length > 0 ? "block" : "none",
              }}
            >
              {namesPlatillos.map((nombre, index) => (
                <li key={index}>{nombre}</li>
              ))}
            </ul>
            {namesPlatillos.length === 0 && (
              <input
                type="text"
                readOnly
                placeholder="Esperando platillos..."
                style={{
                  border: "none",
                  outline: "none",
                  width: "100%",
                  backgroundColor: "transparent",
                  fontSize: "16px",
                }}
              />
            )}
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="foto"
            className="text-[#EC7C6A] block mb-2 font-medium"
          >
            {selectedFile
              ? selectedFile.name.length > 15
                ? selectedFile.name.substring(0, 15) + "..."
                : selectedFile.name
              : "Banner:"}
          </label>
          <div className="flex items-center justify-center">
            <label className="border border-[#EC7C6A] p-2 rounded-lg cursor-pointer">
              <input
                type="file"
                id="foto"
                name="foto"
                className="hidden"
                onChange={handleFileChange}
                onClick={handleUpload}
                ref={fileInputRef}
              />
              <RiFileUploadFill className="text-[#EC7C6A]" />
            </label>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        {platilloIds.length === 0 ? (
          <Tooltip
            placement="left"
            content={
              <div className="w-72">
                <Typography
                  color="black"
                  className="text-black font-medium text-center bg-white  rounded-t-md"
                >
                  Aun no puedes cargar categorias
                </Typography>
                <Typography
                  variant="small"
                  color="black"
                  className=" text-black font-normal bg-white  rounded-b-md"
                >
                  Segun el sistema de MenuMaker, debes cargar todos los
                  platillos relacionados a una categoria, para luego guardar
                  dicha categoria.
                </Typography>
              </div>
            }
            animate={{
              mount: { scale: 1, y: 0 },
              unmount: { scale: 0, y: 25 },
            }}
          >
            <button
              onClick={formik.handleSubmit}
              className={`bg-[#262837] text-center rounded-md bg-[#ec7c6a] px-4 py-2 flex justify-center  text-white ${
                platilloIds.length === 0 ? "isdisable" : ""
              }`}
              disabled={platilloIds.length === 0}
            >
              Guardar categoria
            </button>
          </Tooltip>
        ) : (
          <button
            onClick={formik.handleSubmit}
            className={`bg-[#262837] text-center rounded-md bg-[#ec7c6a] px-4 py-2 flex justify-center  text-white${
              platilloIds.length === 0 ? "isdisable" : ""
            }`}
            disabled={platilloIds.length === 0}
          >
            Guardar categoria
          </button>
        )}
      </div>

      <Platillos />
      <div className="mt-5 flex justify-between">
        <div className=" ">
          <button
            type="button"
            onClick={prevStep}
            className="bg-[#262837] text-center rounded-md bg-[#ec7c6a] px-4 py-2 flex justify-center  text-white"
          >
            Anterior
          </button>
        </div>

        <div className=" ">
          <button
            onClick={nextStep}
            className="bg-[#262837] text-center rounded-md bg-[#ec7c6a] px-4 py-2 flex justify-center  text-white"
          >
            Siguiente
          </button>
        </div>
      </div>
    </form>
  );
};
