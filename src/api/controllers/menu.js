import Axios from "../AuthApi";
export const postMenu = async (formData) => {
    console.log(formData,'data menu');
  try {
    const response = await Axios.post(`/createMenu`, formData);
    // console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    // return error.response.data;
  }
};
