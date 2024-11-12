"use client";

const APIURL = process.env.NEXT_PUBLIC_API_URL;

import React, { useEffect, useState } from "react";
import { IEvents } from "@/interfaces/IEventos";
import { useGetAllCategories } from "@/helpers/categories.helpers";
import { useGetAllLocations } from "@/helpers/location.helper";
import { ICategory } from "@/interfaces/ICategoty";
import { ILocation } from "@/interfaces/ILocations";
import { ResponseTypeCategory, ResponseTypeLocation } from "@/interfaces/IResponse";

export const EncontraEventos = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [events, setEvents] = useState<IEvents[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<IEvents[]>([]);

  const categories: ResponseTypeCategory = useGetAllCategories();
  const locations: ResponseTypeLocation = useGetAllLocations();
  

  const getEvents = async () => {
    try {
      const res = await fetch(`${APIURL}/events`, {
        method: "GET",
      });
      if (res.ok) {
        const data = await res.json();
        return data;
      }
      throw new Error("Error al obtener los eventos.");
    } catch (error: any) {
      console.log(error);
      throw new Error("Error al obtener los eventos.");
    }
  };

  useEffect(() => {
    const loadEvents = async () => {
      const eventsData = await getEvents();
      setEvents(eventsData);
    };
    loadEvents();
  }, []);

  useEffect(() => {
    const filtered = events.filter((evento: IEvents) => {
      const matchesCategory =
        selectedCategory === "" || evento.category_id.categoryId === parseInt(selectedCategory);
      const matchesLocation =
        selectedLocation === "" || evento.location_id.locationId === parseInt(selectedLocation);

      return matchesCategory && matchesLocation;
    });
    setFilteredEvents(filtered);
  }, [selectedCategory, selectedLocation, events]);

  return (
    <section className="bg-gray-900 text-gray-800 py-8">
      <div className="w-full lg:max-w-6xl mx-auto mb-6">
        <h1 className="text-3xl text-white font-bold py-4 px-2">Encuentra Eventos</h1>
      </div>

      {/* Filtro de eventos */}
      <div className="w-full lg:max-w-6xl mx-auto mb-10 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Filtrar Eventos</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Filtro por categoría */}
          <div className="flex-1">
            <label className="block text-gray-700 font-medium mb-2">Categoría</label>
            <select
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Selecciona una categoría</option>
              {categories.loading ? (
                <option>Cargando categorías...</option>
              ) : categories.result ? (
                categories.result.map((cat: ICategory) => (
                  <option key={cat.categoryId} value={cat.categoryId}>
                    {cat.name}
                  </option>
                ))
              ) : (
                <option>No se encontraron categorías</option>
              )}
            </select>
          </div>

          {/* Filtro por ubicación */}
          <div className="flex-1">
            <label className="block text-gray-700 font-medium mb-2">Ubicación</label>
            <select
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              <option value="">Selecciona una ubicación</option>
              {locations.loading ? (
                <option>Cargando ubicaciones...</option>
              ) : locations.result ? (
                locations.result.map((location: ILocation) => (
                  <option key={location.locationId} value={location.locationId}>
                    {location.city}
                  </option>
                ))
              ) : (
                <option>No se encontraron ubicaciones</option>
              )}
            </select>
          </div>
        </div>
      </div>

      {/* Mostrar eventos filtrados */}
     <section className="flex flex-row flex-wrap w-full lg:max-w-6xl mx-auto mb-6">
     {filteredEvents.map((event: IEvents) => (
        <div key={event.eventId} className="bg-gray-900 shadow-lg rounded p-3 w-1/3 h-[200px]">
         <div className="group relative">
           <img
             className="w-full md:w-72 block rounded"
             src={event.imageUrl}
             alt={event.name}
           />
           <div className="absolute bg-black rounded bg-opacity-0 group-hover:bg-opacity-60 w-full h-full top-0 flex items-center group-hover:opacity-100 transition justify-evenly">
             <button className="hover:scale-110 text-white opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition">
               <svg
                 xmlns="http://www.w3.org/2000/svg"
                 width="20"
                 height="20"
                 fill="currentColor"
                 className="bi bi-heart"
                 viewBox="0 0 16 16"
               >
                 <path d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
               </svg>
             </button>
           </div>
         </div>
         <div className="p-5">
           <h3 className="text-white text-lg">{event.name}</h3>
           <p className="text-white text-lg">{event.location_id.city}</p>
           <p className="text-gray-400">{event.date}</p>
         </div>
       </div>
     ))}
   </section>
   </section>
  );
};
