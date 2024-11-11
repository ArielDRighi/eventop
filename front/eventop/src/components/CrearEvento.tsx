import React, { useState } from "react";
import Categorias from "@/helpers/arrayCategorias";
import Locations from "@/helpers/arrayUbicaciones";

export const CrearEvento = () => {
  const [eventData, setEventData] = useState({
    titulo: "",
    descripcion: "",
    categoria: "",
    ubicacion: "",
    imagen: [],
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement >) => {
    const { name, value } = event.target;

    setEventData({
      ...eventData,
      [name]: value,
    });

    console.log(eventData)
  };


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Aquí iría la lógica para enviar `formValues` a la API
    console.log("Formulario enviado:", eventData);
    // Implementa la llamada a la API con `fetch` o `axios`
  };

  return (
    <section className="w-full lg:max-w-6xl py-8 mx-auto">
      <h2 className="text-2xl font-bold mb-4">Crear Nuevo Evento</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Título del evento
          </label>
          <input
            type="text"
            name="titulo"
            className="w-full p-2 border rounded-md"
            placeholder="Título"
            value={eventData.titulo}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Descripción
          </label>
          <textarea
            name="descripcion"
            className="w-full p-2 border rounded-md"
            placeholder="Descripción"
            value={eventData.descripcion}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Categoría
          </label>
          <select
            name="categoria"
            className="w-full p-2 border rounded-md"
            value={eventData.categoria}
            onChange={handleChange}
          >
            <option value="">Selecciona una categoría</option>
            {Categorias.map((cat) => (
              <option key={cat.categoryId} value={cat.categoryId}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Ubicación
          </label>
          <select
            name="ubicacion"
            className="w-full p-2 border rounded-md"
            value={eventData.ubicacion}
            onChange={handleChange}
          >
            <option value="">Selecciona una ubicación</option>
            {Locations.map((ubicacion) => (
              <option key={ubicacion.locationId} value={ubicacion.locationId}>
                {ubicacion.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Imagen del evento
          </label>
          <input
            type="file"
            name="imagen"
            className="w-full p-2 border rounded-md"
            onChange={handleChange}
            accept="image/*"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Crear Evento
        </button>
      </form>
    </section>
  );
};

export default CrearEvento;
