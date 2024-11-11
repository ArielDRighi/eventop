"use client"

import React, { useState } from "react";
import { createEvent } from "@/helpers/events.helper";
import { IEventsCreate } from "@/interfaces/IEventos";

export const CreateEvent = () => {
  const [eventData, setEventData] = useState<IEventsCreate>({
    name: "",
    description: "",
    date: "",
    price: 0,
    currency: "",
    imagenURl: ""
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;

    setEventData({
      ...eventData,
      [name]: name === "price" ? parseFloat(value) : value, // Asegura que el precio sea numérico
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await createEvent(eventData);
    console.log(response)
    
    return response

  };

  return (
    <section className="w-full lg:max-w-6xl py-8 mx-auto">
      <h2 className="text-2xl font-bold mb-4">Crear Nuevo Evento</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Título del evento</label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full p-2 border rounded-md"
            placeholder="Título"
            value={eventData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">Descripción</label>
          <textarea
            id="description"
            name="description"
            className="w-full p-2 border rounded-md"
            placeholder="Descripción"
            value={eventData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="date" className="block text-gray-700 font-semibold mb-2">Fecha</label>
          <input
            type="date"
            id="date"
            name="date"
            className="w-full p-2 border rounded-md"
            value={eventData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700 font-semibold mb-2">Precio</label>
          <input
            type="number"
            id="price"
            name="price"
            className="w-full p-2 border rounded-md"
            placeholder="Precio"
            value={eventData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="currency" className="block text-gray-700 font-semibold mb-2">Moneda</label>
          <select
            id="currency"
            name="currency"
            className="w-full p-2 border rounded-md"
            value={eventData.currency}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona una moneda</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="MXN">MXN</option>
            {/* Agrega más opciones según sea necesario */}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="imagenURl" className="block text-gray-700 font-semibold mb-2">URL de la imagen</label>
          <input
            type="text"
            id="imagenURl"
            name="imagenURl"
            className="w-full p-2 border rounded-md"
            placeholder="URL de la imagen"
            value={eventData.imagenURl}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md" >Crear Evento</button>
      </form>
    </section>
  );
};

export default CreateEvent
