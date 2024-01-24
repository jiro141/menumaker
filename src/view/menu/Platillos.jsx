import { useState, useRef, useEffect, useContext } from "react";
import { RiFileUploadFill } from "react-icons/ri";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Toaster, toast } from "react-hot-toast";
import { postPlatillos } from "../../api/controllers/platillos";
import { aggFotoPlatillo } from "../../api/controllers/platillos";
import MainContext from "../../components/contexts/MainConstext";

export const Platillos = ({ onSave }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [transition, setTransition] = useState(false);
  const { platilloIds, setPlatilloIds } = useContext(MainContext);
  // console.log(platilloIds, " id. de los platillos");
  const fileInputRef = useRef(null);
  const hasMounted = useRef(false);
  const formik = useFormik({
    initialValues: {
      nombre: "",
      descripcion: "",
      ingredientes: "",
    },
    validationSchema: Yup.object({
      nombre: Yup.string().required("El campo es obligatorio"),
      descripcion: Yup.string().required("El campo es obligatorio"),
    }),
    validateOnChange: false,
    onSubmit: async (formData, { resetForm }) => {
      try {
        const data = await postPlatillos(formData);
        // console.log(data, "datos");
        if (data) {
          setPlatilloIds((prevIds) => [...prevIds, data.id]);
          toast.success(`Se creó el platillo ${data.nombre} con éxito `);
          resetForm();
          setTransition(true); // Restablecer el formulario después de un envío exitoso
        }
      } catch (error) {
        console.error(error);
        toast.error("Error al crear platillo");
      } finally {
        setTransition(false);
      }
    },
  });
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const handleUpload = async () => {
    fileInputRef.current.click();
  };
  useEffect(() => {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"]; // add more allowed types as needed
    const postDoc = async () => {
      if (selectedFile && platilloIds.length > 0) {
        if (allowedTypes.includes(selectedFile.type)) {
          console.log(selectedFile);
          const options = {
            foto: selectedFile,
          };
          try {
            const resAdjunto = await aggFotoPlatillo(
              platilloIds[platilloIds.length - 1],
              options
            ); 
          } catch (error) {
            console.error(error);
          }
        } else {
          toast.error(
            "Selecciona una imagen en el formato correcto (PGN,JPEG,GIF)."
          );
        }
      }
    };

    if (hasMounted.current) {
      postDoc();
    } else {
      hasMounted.current = true;
    }
    return () => {}; // Llama a la función directamente, no es necesario devolver una función desde useEffect
  }, [platilloIds, selectedFile]);

  return (
    <form
      enctype="multipart/form-data"
      className={`px-4 ${transition ? "slide-left" : ""}`}
      onSubmit={formik.handleSubmit}
    >
      <Toaster />
      <h2 className="text-xl text-center text-white font-bold mb-10 mt-5">
        Datos de tus platillos
      </h2>
      <div className="mx-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {["nombre", "descripcion", "ingredientes"].map((field) => (
          <div key={field} className="mb-4">
            <label
              htmlFor={field}
              className="text-[#EC7C6A] block mb-2 font-medium"
            >
              {field.charAt(0).toUpperCase() + field.slice(1)}:
            </label>
            {field === "ingredientes" ? (
              <textarea
                id={field}
                name={field}
                value={formik.values[field]}
                onChange={(e) => formik.setFieldValue(field, e.target.value)}
                className="w-full border rounded-md py-2 px-3 mb-2"
                style={{ maxHeight: "43px", resize: "vertical" }}
                required
              ></textarea>
            ) : (
              <input
                type="text"
                id={field}
                name={field}
                value={formik.values[field]}
                onChange={(e) => formik.setFieldValue(field, e.target.value)}
                className="w-full border rounded-md py-2 px-3 mb-2"
                required
              />
            )}
          </div>
        ))}
        <div className="mb-4">
          <label
            htmlFor="foto"
            className="text-[#EC7C6A] block mb-2 font-medium"
          >
            {selectedFile
              ? selectedFile.name.length > 15
                ? selectedFile.name.substring(0, 15) + "..."
                : selectedFile.name
              : "Foto del platillo:"}
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
        <button
          onClick={formik.handleSubmit}
          className="bg-[#262837] text-center rounded-md bg-[#ec7c6a] px-4 py-2 flex justify-center  text-white"
        >
          Guardar platillo
        </button>
      </div>
    </form>
  );
};
