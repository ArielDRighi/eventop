import React from "react";

const DashboardAdminSection = () => {
  return (
    <div>
      <main className="p-6 bg-gray-900">
        <div className="container mx-auto">
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            <div className="bg-gray-100 text-black shadow rounded-xl p-4">
              <h2 className="text-xl font-semibold text-black mb-4">
                Gestión de Tickets
              </h2>

              <div className="mb-4">
                <div className="flex items-center justify-between bg-blue-100 p-4 rounded-lg">
                  <div>
                    <h3 className="text-lg font-semibold">Tickets Abiertos</h3>
                    <p className="text-sm text-gray-500">
                      Tickets sin resolver
                    </p>
                  </div>
                  <div className="text-xl font-semibold text-gray-800">32</div>
                </div>

                <div className="flex items-center justify-between bg-yellow-100 p-4 rounded-lg mt-4">
                  <div>
                    <h3 className="text-lg font-semibold">
                      Tickets en Progreso
                    </h3>
                    <p className="text-sm text-gray-500">
                      Tickets actualmente siendo trabajados
                    </p>
                  </div>
                  <div className="text-xl font-semibold text-gray-800">12</div>
                </div>

                <div className="flex items-center justify-between bg-green-100 p-4 rounded-lg mt-4">
                  <div>
                    <h3 className="text-lg font-semibold">Tickets Cerrados</h3>
                    <p className="text-sm text-gray-500">Tickets resueltos</p>
                  </div>
                  <div className="text-xl font-semibold text-gray-800">50</div>
                </div>
              </div>

              <div className="mt-6">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full mb-2">
                  Crear Nuevo Ticket
                </button>
                <button className="bg-gray-500 text-white px-4 py-2 rounded-lg w-full">
                  Ver Todos los Tickets
                </button>
              </div>
            </div>

            <div className="bg-gray-100 text-black shadow rounded-xl p-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Gestión de Usuarios
              </h2>

              <div className="mb-4">
                <div className="flex items-center justify-between bg-blue-100 p-4 rounded-lg">
                  <div>
                    <h3 className="text-lg font-semibold">Usuarios Activos</h3>
                    <p className="text-sm text-gray-500">
                      Usuarios actualmente activos
                    </p>
                  </div>
                  <div className="text-xl font-semibold text-gray-800">120</div>
                </div>
              </div>

              <div className="mt-6">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full mb-2">
                  Agregar Nuevo Usuario
                </button>
                <button className="bg-gray-500 text-white px-4 py-2 rounded-lg w-full">
                  Ver Todos los Usuarios
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default DashboardAdminSection;
