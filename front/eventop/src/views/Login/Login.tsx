"use client"
import { ILoginProps } from '@/interfaces/ILoginProps';
import { useState } from 'react'

export const Login = () => {
   
    const [userData, setUserData] = useState<ILoginProps>({
        email: "",
        password: "",
    });
    const [error, setError] = useState({
        email: "",
        password: "",
      });
      const [touched, setTouched] = useState<{ email: boolean; password: boolean }>(
        {
          email: false,
          password: false,
        }
      );


      const handleOnChange = () => {}

      const handleOnBlur = () => {}

      const handleSubmit = () => {}
      

    return (
        <section className="max-w-md lg:w-1/4 mx-auto bg-[#eee] shadow-lg rounded-lg p-8 font-poppins transition-shadow duration-300 hover:shadow-xl">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-800">Iniciar Sesión</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6 w-full">
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="text-base font-medium text-gray-700"
            >
              Correo Electrónico:
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={userData.email}
              onChange={handleOnChange}
              onBlur={handleOnBlur}
              placeholder="user@mail.com"
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out shadow-sm hover:shadow-md focus:shadow-md"
            />
            {touched.email && error.email && (
              <span className="text-red-500 text-sm">{error.email}</span>
            )}
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="text-base font-medium text-gray-700"
            >
              Contraseña:
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={userData.password}
              onChange={handleOnChange}
              onBlur={handleOnBlur}
              placeholder="********"
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out shadow-sm hover:shadow-md focus:shadow-md"
            />
            {touched.password && error.password && (
              <span className="text-red-500 text-sm">{error.password}</span>
            )}
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="w-full text-slate-200 font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-300 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Iniciar Sesión
            </button>
          </div>
        </form>
      </section>
  )
}
