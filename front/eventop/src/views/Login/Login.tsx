"use client";
import { ILoginErrors, ILoginProps } from "@/interfaces/ILoginProps";
import { useEffect, useState } from "react";
import validateLoginForm from "@/helpers/validateLoginForm";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { login } from "@/helpers/auth.helper";

export const Login = () => {
  const router = useRouter();

  const [userData, setUserData] = useState<ILoginProps>({
    email: "",
    password: "",
  });
  const [error, setErrors] = useState<ILoginErrors>({
    email: "",
    password: "",
  });
  const [touched, setTouched] = useState<{ email: boolean; password: boolean }>(
    {
      email: false,
      password: false,
    }
  );

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;

    setUserData({
      ...userData,
      [name]: value,
    });

  };

  const handleOnBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name } = event.target;

    setTouched({
      ...touched,
      [name]: true,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errors = validateLoginForm(userData);
    setErrors(errors);

    // Comprobación si hay errores, incluyendo un mensaje si los campos están vacíos
    if (Object.values(errors).some((error) => error !== "")) {
      Swal.fire({
        title: "Error",
        text: "Por favor, completa todos los campos antes de continuar.",
        icon: "warning",
        customClass: {
          popup: "bg-white shadow-lg rounded-lg p-6",
          title: "text-2xl font-semibold text-gray-800",
          confirmButton:
            "bg-[#D9534F] hover:bg-[#C9302C] text-white font-bold py-2 px-4 rounded",
        },
        buttonsStyling: false,
      });
      return;
    }

    try {

      const response = await login(userData);

      console.log(response)
      
      const { token, user } = response;

      // Almacenar token y datos de usuario en localStorage
      localStorage.setItem("userSession", JSON.stringify({ token, user }));

      // Pop-up de éxito
      Swal.fire({
        title: "¡Éxito!",
        text: "Has iniciado sesión correctamente.",
        icon: "success",
        customClass: {
          popup: "bg-white shadow-lg rounded-lg p-6",
          title: "text-2xl font-semibold text-gray-800",
          confirmButton:
            "bg-[#164E78] hover:bg-[#169978] text-white font-bold py-2 px-4 rounded",
        },
        buttonsStyling: false,
      });

      router.push("/");
    } catch (error) {
      setErrors({ email: "Email o contraseña incorrectos.", password: "" });

      // Pop-up de error
      Swal.fire({
        title: "Error",
        text: "No se pudo iniciar sesión. Por favor verifica tus credenciales.",
        icon: "error",
        customClass: {
          popup: "bg-white shadow-lg rounded-lg p-6",
          title: "text-2xl font-semibold text-gray-800",
          confirmButton:
            "bg-[#D9534F] hover:bg-[#C9302C] text-white font-bold py-2 px-4 rounded",
        },
        buttonsStyling: false,
      });
    }
  };

  useEffect(() => {
    const errors = validateLoginForm(userData);
    setErrors(errors);
  }, [userData]);

  return (
    <section className="flex justify-center h-1/2">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-around gap-2 w-full h-full md:w-1/2 mx-auto"
      >
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-800">Iniciar Sesión</h1>
        </div>
        <div>
          <label
            htmlFor="email"
            className="text-base font-medium text-gray-700"
          ></label>
          <input
            type="email"
            name="email"
            id="email"
            value={userData.email}
            onChange={handleOnChange}
            onBlur={handleOnBlur}
            placeholder="correo electronico"
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out shadow-sm hover:shadow-md focus:shadow-md"
          />
          {touched.email && error.email && (
            <span className="text-red-500 text-sm block">{error.email}</span>
          )}
        </div>
        <div>
          <label
            htmlFor="password"
            className="text-base font-medium text-gray-700"
          ></label>
          <input
            type="password"
            name="password"
            id="password"
            value={userData.password}
            onChange={handleOnChange}
            onBlur={handleOnBlur}
            placeholder="contraseña"
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out shadow-sm hover:shadow-md focus:shadow-md"
          />
          {touched.password && error.password && (
            <span className="text-red-500 text-sm block">{error.password}</span>
          )}
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="text-slate-200 font-semibold py-3 px-3 rounded-lg hover:bg-[#0070f3] stransition duration-300 focus:ring-2 focus:ring-blue-500 "
          >
            Iniciar Sesión
          </button>
        </div>
      </form>
    </section>
  );
};

export default Login;
