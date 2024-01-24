import { useState, useContext } from "react";
import { RiFileUploadFill } from "react-icons/ri";
import MainContext from "../../components/contexts/MainConstext";

export const Menu = ({ nextStep }) => {
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

  const [formData, setFormData] = useState({
    nombre: "",
    banner: null,
  });

  const handleChange = (e) => {
    // Actualizar el estado formData cuando se cambia el valor del input
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    // Actualizar el estado formData cuando se selecciona un archivo
    const file = e.target.files[0];
    setFormData({
      ...formData,
      banner: file,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setNombreMenu(formData.nombre);
    setBannerMenu(formData.banner);
    nextStep();
  };

  return (
    <form >
      <div className="flex flex-nowrap justify-evenly gap-1">
        <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
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
            value={formData.nombre}
            onChange={handleChange}
            className="w-full border rounded-md py-2 px-3 mb-2"
          />
        </div>
        <div className="w-full sm:w-1/6  mb-4 sm:mb-0">
          <div className="relative">
            <label
              htmlFor="banner"
              className="text-[#EC7C6A] block mb-2 font-medium"
            >
              Banner:
            </label>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <button
                className="border border-[#EC7C6A] p-2 rounded-lg"
                onClick={() => document.getElementById("banner").click()}
              >
                <input
                  type="file"
                  id="banner"
                  name="banner"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <RiFileUploadFill className="text-[#EC7C6A]" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          className="bg-[#262837] text-center rounded-md bg-[#ec7c6a] px-4 py-2 flex justify-center  text-white"
        >
          Siguiente
        </button>
      </div>
    </form>
  );
};
