import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Axios from "../api/AuthApi";
import { Toaster, toast } from "react-hot-toast";

function Login() {
  const [showMenu, setShowMenu] = useState(false);
  const [showOrder, setShowOrder] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false); // Nuevo estado para controlar el éxito del inicio de sesión

  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },
    validationSchema: Yup.object({
      userName: Yup.string().required("El campo es obligatorio"),
      password: Yup.string().required("El campo es obligatorio"),
    }),
    validateOnChange: false,
    onSubmit: async (formData, { resetForm }) => {
      try {
        const { data } = await Axios.post("/login/", formData);
        window.localStorage.setItem("token", data.token);
        if (data) {
          setLoginSuccess(true);
          toast.success("Inicio de sesión exitoso");
        }
      } catch (error) {
        console.log(error);
        toast.error("Error al iniciar sesión");
      }
    },
  });

  if (loginSuccess) {
    return <Navigate to="/Home" />; // Redirecciona a la página Home después del inicio de sesión exitoso
  }

  return (
    <section class="h-screen ">
      <div>
        <Toaster />
      </div>
      <div class="h-full lg:px-40">
        <div class="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
          <div class="shrink-1 mb-12 md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
            <img
              src="src\assets\login.svg"
              class="w-full lg:block hidden"
              alt="Sample image"
            />
          </div>

          <div class="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
            <form>
              <div class="mb-20 flex items-center before:flex-1 before:border-t before:border-orange-800 after:flex-1 after:border-t after:border-orange-800">
                <p class="mx-4 text-3xl mb-0 text-center font-bold dark:text-white">
                  {" "}
                  Menu Maker
                </p>
              </div>

              <div class="relative mb-8" data-te-input-wrapper-init>
                <input
                  type="text"
                  class="peer block min-h-[auto] w-full border-b-2 border-orange-800 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                  id="exampleFormControlInput1"
                  placeholder="Example label"
                  name="userName"
                  onChange={(e) =>
                    formik.setFieldValue("userName", e.target.value)
                  }
                />

                <label
                  for="exampleFormControlInput1"
                  class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                >
                  Usuario
                </label>
              </div>

              <div class="relative mb-8" data-te-input-wrapper-init>
                <input
                  type="text"
                  class="peer block min-h-[auto] w-full border-b-2 border-orange-800 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                  id="exampleFormControlInput1"
                  placeholder="Example label"
                  name="password"
                  onChange={(e) =>
                    formik.setFieldValue("password", e.target.value)
                  }
                />

                {formik.errors.password && (
                  <div style={{ marginBottom: "15px" }}>
                    <p style={{ color: "red", fontWeight: "bold" }}>
                      {formik.errors.password}
                    </p>
                  </div>
                )}

                <label
                  for="exampleFormControlInput1"
                  class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                >
                  Contraseña
                </label>
              </div>

              <div class="text-center">
                <button
                  type="button"
                  class="inline-block rounded bg-primary px-10 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#FF5722] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(255,87,34,0.3),0_4px_18px_0_rgba(255,87,34,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(255,87,34,0.3),0_4px_18px_0_rgba(255,87,34,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(255,87,34,0.3),0_4px_18px_0_rgba(255,87,34,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(255,87,34,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(255,87,34,0.2),0_4px_18px_0_rgba(255,87,34,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(255,87,34,0.2),0_4px_18px_0_rgba(255,87,34,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(255,87,34,0.2),0_4px_18px_0_rgba(255,87,34,0.1)]"
                  data-te-ripple-init
                  data-te-ripple-color="light"
                  onClick={formik.handleSubmit}
                >
                  Iniciar sesión
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
