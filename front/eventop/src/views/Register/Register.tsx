"use client";

import { IRegisterProps, IRegisterErrors } from "@/interfaces/IRegisterProps";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import Swal from "sweetalert2";
import validateRegisterForm from "@/helpers/validateRegisterForm";
import { register } from "@/helpers/auth.helper";

function Register() {
  // const router = useRouter();

  const [userData, setUserData] = useState<IRegisterProps>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState<IRegisterErrors>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [touched, setTouched] = useState<{
    name: boolean;
    email: boolean;
    password: boolean;
    confirmPassword: boolean;
  }>({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const [isAble, setIsAble] = useState(true); // Default button state is disabled

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

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

    const response = await register(userData);
    console.log(response)

    Swal.fire({
      title: "Registro exitoso",
      text: "Gracias por unirte a nosotros",
      icon: "success",
      customClass: {
        popup: "bg-white shadow-lg rounded-lg p-6",
        title: "text-2xl font-semibold text-gray-800",
        confirmButton:
          "bg-[#164E78] hover:bg-[#169978] text-white font-bold py-2 px-4 rounded",
      },
      buttonsStyling: false,
    });

    // Limpiar campos después del registro
    setUserData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    setTouched({
      name: false,
      email: false,
      password: false,
      confirmPassword: false,
    });

      redirect("/micuenta");
  };

  useEffect(() => {
    const errors = validateRegisterForm(userData);
    setError(errors);
    // Enable submit button only if no errors and all fields are filled
    setIsAble(
      Object.values(userData).some((field) => field.trim() === "") ||
        Object.values(errors).some((err) => err !== "")
    );
  }, [userData]);

  return (
    <div className="bg-gray-900 text-white flex  flex-col items-center pt-16 sm:justify-center sm:pt-0">
      <a href="#">
        <div className="text-foreground font-semibold text-2xl tracking-tighter mx-auto flex items-center gap-2">
          EvenTop
        </div>
      </a>
      <div className="relative mt-12 w-full max-w-lg sm:mt-10">
        <div className="relative -mb-px h-px w-full bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
        <div className="mx-5 border border-b-white/20 sm:border-t-white/20 shadow-[20px_0_20px_20px] shadow-slate-500/10  rounded-lg border-white/20 border-l-white/20 border-r-white/20 sm:shadow-sm lg:rounded-xl lg:shadow-none">
          <div className="flex flex-col p-6">
            <h3 className="text-xl font-semibold leading-6 tracking-tighter">
              Registro
            </h3>
            <p className="mt-1.5 text-sm font-medium text-white/50">
              Crea tu cuenta!
            </p>
          </div>
          <div className="p-6 pt-0">
            <form onSubmit={handleSubmit}>
              {/* Name Input */}
              <div className="mt-4 group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                <div className="flex justify-between">
                  <label className="text-xs font-medium text-muted-foreground group-focus-within:text-white text-gray-400">
                    Name
                  </label>
                </div>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={userData.name}
                  onChange={handleOnChange}
                  onBlur={handleOnBlur}
                  placeholder="Nombre"
                  className="block w-full border-0 bg-transparent p-0 text-sm placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 sm:leading-7 text-foreground"
                />
                {touched.name && error.name && (
                  <span className="text-red-500 text-sm block">
                    {error.name}
                  </span>
                )}
              </div>

              {/* Email Input */}
              <div className="mt-4 group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                <div className="flex justify-between">
                  <label className="text-xs font-medium text-muted-foreground group-focus-within:text-white text-gray-400">
                    Email
                  </label>
                </div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={userData.email}
                  onChange={handleOnChange}
                  onBlur={handleOnBlur}
                  placeholder="Correo electrónico"
                  className="block w-full border-0 bg-transparent p-0 text-sm placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 sm:leading-7 text-foreground"
                />
                {touched.email && error.email && (
                  <span className="text-red-500 text-sm block">
                    {error.email}
                  </span>
                )}
              </div>

              {/* Password Input */}
              <div className="mt-4 group relative rounded-lg border focus-within:border-purple-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                <div className="flex justify-between">
                  <label className="text-xs font-medium text-muted-foreground group-focus-within:text-white text-gray-400">
                    Password
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={userData.password}
                    onChange={handleOnChange}
                    onBlur={handleOnBlur}
                    placeholder="Contraseña"
                    className="block w-full border-0 bg-transparent p-0 text-sm placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 sm:leading-7 text-foreground"
                  />
                </div>
                {touched.password && error.password && (
                  <span className="text-red-500 text-sm block">
                    {error.password}
                  </span>
                )}
              </div>

              {/* Confirm Password Input */}
              <div className="mt-4 group relative rounded-lg border focus-within:border-purple-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                <div className="flex justify-between">
                  <label className="text-xs font-medium text-muted-foreground group-focus-within:text-white text-gray-400">
                    Confirm Password
                  </label>
                </div>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  value={userData.confirmPassword}
                  onChange={handleOnChange}
                  onBlur={handleOnBlur}
                  placeholder="Confirmar Contraseña"
                  className="block w-full border-0 bg-transparent p-0 text-sm placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 sm:leading-7 text-foreground"
                />
                {touched.confirmPassword && error.confirmPassword && (
                  <span className="text-red-500 text-sm block">
                    {error.confirmPassword}
                  </span>
                )}
              </div>

              <div className="mt-4 flex items-center justify-end gap-x-2">
                <button
                  className="flex items-center justify-center font-bold rounded-xl bg-purple-600 px-4 py-3 text-sm text-white duration-200 hover:bg-purple-700"
                  type="submit"
                  disabled={isAble} // Disable submit button if fields are incomplete or errors exist
                >
                  Registrarse
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
