"use client";

import Categorias from "@/helpers/arrayCategorias";
import Ubicaciones from "@/helpers/arrayUbicaciones";
import Events from "@/helpers/arrayEventos";
import { useState } from "react";
import { getAllEvents } from "@/helpers/events.helper";

export const EncontraEventos =  () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  const { result } =  getAllEvents();
  console.log(result);

  // Filtrar eventos por categoría y ubicación
  const filteredEvents = Events.filter((evento) => {
    const matchesCategory =
      selectedCategory === "" ||
      evento.categoryId === parseInt(selectedCategory);
    const matchesLocation =
      selectedLocation === "" ||
      evento.locationId === parseInt(selectedLocation);

    return matchesCategory && matchesLocation;
  });

  return (
    <section className="w-full lg:mx-w-6xl py-8 bg-gray-900">
      <div className="w-full lg:max-w-6xl mx-auto mb-6">
        <h1 className="text-3xl font-bold py-4 px-2 text-start">
          Encuentra Eventos
        </h1>
      </div>

      {/* Buscador de filtro */}
      <div className="w-full lg:max-w-6xl mx-auto mb-10 p-4 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Filtrar Eventos</h2>
        <div className="flex flex-col md:flex-row gap-4">
          {/* Filtro por categoría */}
          <div className="flex-1">
            <label className="block text-gray-700 font-semibold mb-2">
              Categoría
            </label>
            <select
              className="w-full p-2 border rounded-md"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Selecciona una categoría</option>
              {Categorias.map((cat) => (
                <option key={cat.categoryId} value={cat.categoryId}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Filtro por ubicación */}
          <div className="flex-1">
            <label className="block text-gray-700 font-semibold mb-2">
              Ubicación
            </label>
            <select
              className="w-full p-2 border rounded-md"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              <option value="">Selecciona una ubicación</option>
              {Ubicaciones.map((ubicacion) => (
                <option key={ubicacion.locationId} value={ubicacion.locationId}>
                  {ubicacion.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Mostrar eventos filtrados */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full lg:max-w-6xl mx-auto">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((evento) => (
            <div
              key={evento.eventId}
              className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow duration-300"
            >
              <h4 className="text-lg font-bold mb-1 text-blue-500">
                {evento.name}
              </h4>
              <p className="text-gray-500 mb-1">
                <span className="font-semibold">Ubicación ID:</span>{" "}
                {evento.locationId}
              </p>
              <p className="text-gray-500 mb-1">
                <span className="font-semibold">Fecha:</span> {evento.date}
              </p>
              <p className="text-gray-700 mb-2">{evento.description}</p>
              <p className="text-gray-800 font-bold">
                Precio: {evento.currency} {evento.price.toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">
            No se encontraron eventos que coincidan con los filtros
            seleccionados.
          </p>
        )}
      </div>
    </section>
  );
};
