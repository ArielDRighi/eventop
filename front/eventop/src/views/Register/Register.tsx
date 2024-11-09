"use client";

import { IRegisterProps, IRegisterErrors } from "@/interfaces/IRegisterProps";
import { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import Swal from "sweetalert2";
import validateRegisterForm from "@/helpers/validateRegisterForm";
import { register } from "@/helpers/auth.helper";

function Register() {
  const router = useRouter();

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

    await register(userData);

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
    })

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
    <section className="min-h-1/2 flex justify-center">
      <form onSubmit={handleSubmit}>
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-800">Register</h1>
        </div>

        {/* Name Input */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="name"
            className="text-sm font-medium text-gray-700 capitalize"
          ></label>
          <input
            type="text"
            name="name"
            id="name"
            value={userData.name}
            onChange={handleOnChange}
            onBlur={handleOnBlur}
            placeholder="Name"
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out shadow-sm hover:shadow-md focus:shadow-md"
          />
          {touched.name && error.name && (
            <span className="text-red-500 text-sm">{error.name}</span>
          )}
        </div>

        {/* Email Input */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="email"
            className="text-sm font-medium text-gray-700 capitalize"
          ></label>
          <input
            type="email"
            name="email"
            id="email"
            value={userData.email}
            onChange={handleOnChange}
            onBlur={handleOnBlur}
            placeholder="Email"
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out shadow-sm hover:shadow-md focus:shadow-md"
          />
          {touched.email && error.email && (
            <span className="text-red-500 text-sm">{error.email}</span>
          )}
        </div>

        {/* Password Input */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="password"
            className="text-sm font-medium text-gray-700 capitalize"
          ></label>
          <input
            type="password"
            name="password"
            id="password"
            value={userData.password}
            onChange={handleOnChange}
            onBlur={handleOnBlur}
            placeholder="Password"
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out shadow-sm hover:shadow-md focus:shadow-md"
          />
          {touched.password && error.password && (
            <span className="text-red-500 text-sm">{error.password}</span>
          )}
        </div>

        {/* Confirm Password Input */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="confirmPassword"
            className="text-sm font-medium text-gray-700 capitalize"
          ></label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            value={userData.confirmPassword}
            onChange={handleOnChange}
            onBlur={handleOnBlur}
            placeholder="Confirm Password"
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out shadow-sm hover:shadow-md focus:shadow-md"
          />
          {touched.confirmPassword && error.confirmPassword && (
            <span className="text-red-500 text-sm">
              {error.confirmPassword}
            </span>
          )}
        </div>

        <div className="text-center">
          <button
            type="submit"
            disabled={isAble} // Disable submit button if fields are incomplete or errors exist
            className="w-full text-slate-200 font-semibold py-2 px-4 rounded hover:bg-[#0070f3] transition duration-300 mt-2"
          >
            Register
          </button>
        </div>
      </form>
    </section>
  );
}

export default Register;
