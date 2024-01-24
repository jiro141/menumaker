import Axios from "../AuthApi";
export const postCategorias = async (formData) => {
  //   console.log(formData);
  try {
    const response = await Axios.post(`/createCategorias`, formData);
    // console.log(response);
    return response.data.categoria;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};
export const getCategoriasName = async (id) => {
  //   console.log(formData);
  try {
    const response = await Axios.get(`/categorias/${id}`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};
export const getCategorias = async () => {
  //   console.log(formData);
  try {
    const response = await Axios.get(`/categorias/`);
    // console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};
