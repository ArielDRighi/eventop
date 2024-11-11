import React from "react";

const BlogTwo = () => {
  return (
    <div className="bg-gray-900 h-screen font-sans flex flex-col items-center justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8 pt-12 lg:pt-0">
          <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left lg:flex lg:items-center">
            <div>
              <div className="flex flex-col items-center justify-center">
                <a
                  className="inline-flex px-1 py-1 gap-x-2 rounded-xl  border-gray-400 border-2 hover:border-purple-500 items-center text-sm font-semibold text-gray-300 space-x-1"
                  href="#"
                >
                  <span className="bg-purple-500 flex items-center justify-center gap-2 text-white text-sm font-semibold px-2.5 py-0.5 rounded-lg ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6 text-white"
                    >
                      <path d="m3 11 18-5v12L3 14v-3z"></path>
                      <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"></path>
                    </svg>
                    Nuevo
                  </span>
                  <span>¡Publica tus eventos aquí!</span>
                </a>
                <h1 className="mt-4 text-4xl tracking-tight font-extrabold text-white sm:mt-5 sm:leading-none lg:mt-6 lg:text-5xl xl:text-6xl">
                  <p className="sm:block">Únete a</p>
                  <span className="text-white md:block">la comunidad de</span>
                  <p className="text-purple-500 md:block">EvenTop.</p>
                </h1>
              </div>
              <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
                <button className="inline-flex items-center text-white bg-purple-500 justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary-foreground hover:bg-gray-900 h-10 px-4 py-2 w-full sm:w-auto">
                  Empieza ahora
                </button>
              </div>
            </div>
          </div>

          <div className="mt-16 ml-6 sm:mt-24 lg:mt-0 lg:col-span-5">
            <p className="text-base ml-12 text-white sm:text-xl lg:text-lg xl:text-xl">
              Únete a la plataforma líder en venta de tickets. Llega a miles de
              personas y maximiza la visibilidad de tu evento.
            </p>
            <div className="mt-12 ml-8">
              <div className="grid grid-cols-3 gap-6 sm:gap-6 xl:gap-8">
                <div className="text-center sm:flex sm:items-center sm:justify-center">
                  <div className="sm:flex-shrink-0">
                    <div className="flow-root">
                      <div className="border w-fit transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent  inline-flex items-center justify-center px-3 py-0.5 text-sm font-medium leading-5 text-white bg-purple-500 rounded-full">
                        Usuarios Activos
                      </div>
                      <p className="text-4xl font-bold text-white">1K+</p>
                    </div>
                  </div>
                </div>
                <div className="text-center sm:flex sm:items-center sm:justify-center">
                  <div className="sm:flex-shrink-0">
                    <div className="flow-root">
                      <div className="border w-fit transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent  inline-flex items-center justify-center px-3 py-0.5 text-sm font-medium leading-5 text-white bg-purple-500 rounded-full">
                        Eventos Activos
                      </div>
                      <p className="text-4xl font-bold ml-4 text-white">2K+</p>
                    </div>
                  </div>
                </div>
                <div className="text-center sm:flex sm:items-center sm:justify-center">
                  <div className="sm:flex-shrink-0">
                    <div className="flow-root">
                      <div className="border w-fit transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-primary/80 inline-flex items-center justify-center px-3 py-0.5 text-sm font-medium leading-5 text-white bg-purple-500 rounded-full">
                        Ciudades
                      </div>
                      <p className="text-4xl font-bold ml-4 text-white">120+</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogTwo;
