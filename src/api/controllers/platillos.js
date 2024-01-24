import Axios from "../AuthApi";
export const postPlatillos = async (formData) => {
  console.log(formData, "desde controller");
  try {
    const response = await Axios.post(`/createPlatillos`, formData);
    // console.log(response);
    return response.data.platillo;
  } catch (error) {
    console.log(error);
  }
};
export const aggFotoPlatillo = async (Idplatillo, formData) => {
  console.log(formData.foto, "datos de foto");
  try {
    const response = await Axios.put(`/editPlatillo/${Idplatillo}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log(response);
    // return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const getPlatillosListName = async (Idplatillo) => {
  // console.log(formData, 'datos de foto');
  try {
    const response = await Axios.get(`/platillos/${Idplatillo}`);
    // console.log(response,'nombre');
    return response.data.nombre;
  } catch (error) {
    console.log(error);
  }
};
export const getPlatillosList = async (Idplatillo) => {
  // console.log(formData, 'datos de foto');
  try {
    const response = await Axios.get(`/platillos/${Idplatillo}`);
    // console.log(response,'nombre');
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const getPlatillos = async () => {
  // console.log(formData, 'datos de foto');
  try {
    const response = await Axios.get(`/platillos/`);
    // console.log(response,'nombre');
    return response.data.nombre;
  } catch (error) {
    console.log(error);
  }
};
