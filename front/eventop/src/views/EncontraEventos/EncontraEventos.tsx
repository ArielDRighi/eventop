"use client";

import { useGetAllCategories } from "@/helpers/categories.helpers";
import { useGetAllLocations } from "@/helpers/location.helper";
import { ICategory } from "@/interfaces/ICategoty";
import { IEvents } from "@/interfaces/IEventos";
import { ILocation } from "@/interfaces/ILocations";
import { motion } from "framer-motion";
import { Search, Calendar, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const APIURL = process.env.NEXT_PUBLIC_API_URL;

export const EncontraEventos = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [events, setEvents] = useState<IEvents[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<IEvents[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [locations, setLocations] = useState<ILocation[]>([]);

  const getEvents = async () => {
    try {
      const res = await fetch(`${APIURL}/events`);
      if (res.ok) {
        const data = await res.json();
        return data;
      }
      throw new Error("Error al obtener los eventos.");
    } catch (error) {
      console.error("Error al obtener los eventos:", error);
      return [];
    }
  };

  const { result: locationsData, error: locationsError } = useGetAllLocations();
  const { result: categoriesData, error: categoriesError } =
    useGetAllCategories();

  useEffect(() => {
    const loadData = async () => {
      const eventsData = await getEvents();

      if (locationsData) {
        setLocations(locationsData);
      }

      if (categoriesData) {
        setCategories(categoriesData);
      }

      if (locationsError) {
        console.error("Error al obtener las ubicaciones:", locationsError);
      }
      if (categoriesError) {
        console.error("Error al obtener las categorías:", categoriesError);
      }

      setEvents(eventsData);
      setFilteredEvents(eventsData);
    };

    loadData();
  }, [locationsData, categoriesData, locationsError, categoriesError]);

  useEffect(() => {
    const filtered = events.filter((evento: IEvents) => {
      const matchesCategory =
        selectedCategory === "" ||
        evento.category_id.categoryId === parseInt(selectedCategory);
      const matchesLocation =
        selectedLocation === "" ||
        evento.location_id.locationId === parseInt(selectedLocation);
      const matchesSearch =
        searchTerm === "" ||
        evento.name.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesCategory && matchesLocation && matchesSearch;
    });
    setFilteredEvents(filtered);
  }, [selectedCategory, selectedLocation, searchTerm, events]);

  return (
    <div>
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16 px-4 sm:px-6 lg:px-8 min-h-screen">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center">
            <h1 className="text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-400">
              Encuentra Eventos
            </h1>
            <p className="text-md text-gray-300 max-w-3xl mx-auto">
              Descubre los mejores eventos en tu ciudad y vive experiencias
              inolvidables
            </p>
          </div>

          <div className="bg-gray-900 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl p-8 mb-10">
            <h2 className="text-3xl font-bold mb-6 text-center">
              Filtrar Eventos
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar eventos..."
                  className="w-full pl-12 pr-4 py-3 bg-gray-900 bg-opacity-50 border border-purple-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-300 transition duration-300"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-300" />
              </div>

              {["Categoría", "Ubicación"].map((label, index) => (
                <div key={label} className="relative">
                  <select
                    className="w-full pl-4 pr-10 py-3 bg-gray-900 bg-opacity-50 border border-purple-500 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 text-white transition duration-300"
                    value={index === 0 ? selectedCategory : selectedLocation}
                    onChange={(e) =>
                      index === 0
                        ? setSelectedCategory(e.target.value)
                        : setSelectedLocation(e.target.value)
                    }
                  >
                    <option value="">{`Todas las ${label.toLowerCase()}s`}</option>
                    {(index === 0 ? categories : locations).map((item: any) => (
                      <option
                        key={item[index === 0 ? "categoryId" : "locationId"]}
                        value={item[
                          index === 0 ? "categoryId" : "locationId"
                        ].toString()}
                      >
                        {index === 0 ? item.name : item.city}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event: IEvents) => (
              <motion.div
                key={event.eventId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-gray-900 bg-opacity-50 rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <div className="relative h-56">
                  <Image
                    src={
                      event.imageUrl ||
                      "https://i.pinimg.com/236x/1a/d2/30/1ad230952c410779a8f11b60818aef06.jpg"
                    }
                    alt={event.name}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-500 transform hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-4">
                    <Link
                      href={`/events/${event.eventId}`}
                      className="bg-purple-600 text-white font-semibold px-6 py-2 rounded-xl hover:bg-purple-700 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                    >
                      Ver Detalles
                    </Link>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3 line-clamp-2">
                    {event.name}
                  </h3>
                  <div className="flex items-center text-gray-300 mb-2">
                    <Calendar className="h-5 w-5 mr-2 text-purple-400" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <MapPin className="h-5 w-5 mr-2 text-purple-400" />
                    <span>{event.location_id.city}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-12">
              <p className="text-2xl text-gray-400 mb-4">
                No se encontraron eventos que coincidan con tu búsqueda.
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("");
                  setSelectedLocation("");
                }}
                className="bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
              >
                Limpiar filtros
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
