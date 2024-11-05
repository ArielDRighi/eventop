
"use client";

import { IRegisterProps, IRegisterErrors } from "@/interfaces/IRegisterProps";
import { useState } from "react";
import { useRouter } from "next/navigation";

function Register() {

  const [dataUser, setDataUser] = useState<IRegisterProps>({
    name: "",
    email: "",
    password: "",
    address: "",
    phone: "",
  });
  const [error, setError] = useState<IRegisterErrors>({
    name: "",
    email: "",
    password: "",
    address: "",
    phone: "",
  });
  const [touched, setTouched] = useState<{
    name: boolean;
    email: boolean;
    password: boolean;
    address: boolean;
    phone: boolean;
  }>({
    name: false,
    email: false,
    password: false,
    address: false,
    phone: false,
  });

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setDataUser({
      ...dataUser,
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
   
};


  return (
    <section className="min-h-1/2 flex justify-center font-poppins">
      <div className="w-full max-w-md bg-[#EEE] p-8 rounded-lg shadow-lg">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-800">Register</h1>
        </div>
        <form onSubmit={handleSubmit} >
          {["name", "email", "password", "address", "phone"].map((field) => (
            <div key={field} className="flex flex-col gap-2">
              <label htmlFor={field} className="text-sm font-medium text-gray-700 capitalize">
                {field}:
              </label>
              <input
                type={field === "password" ? "password" : field === "email" ? "email" : "text"}
                name={field}
                id={field}
                value={dataUser[field as keyof IRegisterProps]}
                onChange={handleOnChange}
                onBlur={handleOnBlur}
                placeholder={`Your ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                className="border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
              />
              {touched[field as keyof typeof touched] && error[field as keyof IRegisterErrors] && (
                <span className="text-red-500 text-sm">{error[field as keyof IRegisterErrors]}</span>
              )}
            </div>
          ))}
          <div className="text-center">
            <button
              type="submit"
              className="w-full text-slate-200 font-semibold py-2 px-4 rounded hover:bg-blue-700 transition duration-300 mt-2"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Register;
