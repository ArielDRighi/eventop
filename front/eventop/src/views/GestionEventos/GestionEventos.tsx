"use client"

import Categorias from "@/helpers/arrayCategorias";
import Ubicaciones from "@/helpers/arrayUbicaciones";
import Events from "@/helpers/arrayEventos";
import React, { useState } from "react";
import CreateEvent from "@/components/CrearEvento";

export const GestionEventos = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  // Filtrar eventos por categoría y ubicación
  const filteredEvents = Events.filter((evento) => {

    const matchesCategory =
      selectedCategory === "" || evento.categoryId === parseInt(selectedCategory);
    const matchesLocation =
      selectedLocation === "" || evento.locationId === parseInt(selectedLocation);

    return matchesCategory && matchesLocation;
  });

  return (
    <section className="w-full lg:mx-w-6xl py-8">
      <div className="w-full lg:max-w-6xl mx-auto mb-6">
        <h1 className="text-3xl font-bold py-4 px-2 text-start">
          Gestion de Eventos
        </h1>
      </div>

      {/* CrearEventos */}
       <CreateEvent/>
     
    </section>
  );
};
