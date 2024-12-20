"use client";
import React, { useState } from "react";

const Search = () => {
  const [btn, setBtn] = useState(false);

  const toggleDropdown = () => {
    setBtn(!btn);
  };

  return (
    <div>
      <form className="max-w-lg mt-10 mb-10 mx-auto relative">
        <div className="flex relative">
          <label className="mb-2 text-sm font-medium text-gray-900 sr-only ">
            Your Email
          </label>
          <button
            onClick={toggleDropdown}
            id="dropdown-button"
            data-dropdown-toggle="dropdown"
            className="flex-shrink-0 z-10 inline-flex items-center bg-violet-500 py-2.5 px-4 text-sm  text-center text-white font-bold  border border-purple-500 rounded-s-lg  focus:ring-4 focus:outline-none focus:ring-gray-100   dark:text-white dark:border-gray-600"
            type="button"
          >
            Categorias{" "}
            <svg
              className="w-2.5 h-2.5 ms-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>

          {btn && (
            <div
              id="dropdown"
              className="absolute top-full mt-1 left-0 z-20 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
            >
              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdown-button"
              >
                <li>
                  <button
                    type="button"
                    className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Ubicacion
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Genero
                  </button>
                </li>
              </ul>
            </div>
          )}

          <div className="relative w-full">
            <input
              type="search"
              id="search-dropdown"
              className="block p-2.5 w-full z-20 text-sm text-gray-900  rounded-e-lg  border-s-2 border border-gray-300  dark:bg-gray-700 dark:border-s-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
              placeholder="Buscar Eventos ..."
              required
            />
            <button
              type="submit"
              className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-purple-500 rounded-e-lg border border-purple-500 hover:bg-purple-500 focus:ring-4 focus:outline-none  "
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span className="sr-only">Buscar Eventos</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Search;
