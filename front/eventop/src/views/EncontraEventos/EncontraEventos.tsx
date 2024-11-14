"use client";

import { ICategory } from "@/interfaces/ICategoty";
import { IEvents } from "@/interfaces/IEventos";
import { ILocation } from "@/interfaces/ILocations";
import { motion } from "framer-motion";
import { Search, Calendar, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const APIURL = process.env.NEXT_PUBLIC_API_URL;

const getAllCategories = async (): Promise<ICategory[]> => {
  try {
    const res = await fetch(`${APIURL}/categories`);
    if (res.ok) {
      return await res.json();
    }
    throw new Error("Error al obtener las categorías.");
  } catch (error) {
    console.error("Error al obtener las categorías:", error);
    return [];
  }
};

const getAllLocations = async (): Promise<ILocation[]> => {
  try {
    const res = await fetch(`${APIURL}/locations`);
    if (res.ok) {
      return await res.json();
    }
    throw new Error("Error al obtener las ubicaciones.");
  } catch (error) {
    console.error("Error al obtener las ubicaciones:", error);
    return [];
  }
};

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

  useEffect(() => {
    const loadData = async () => {
      const [eventsData, categoriesData, locationsData] = await Promise.all([
        getEvents(),
        getAllCategories(),
        getAllLocations(),
      ]);
      console.log(eventsData);
      
      setEvents(eventsData);
      setFilteredEvents(eventsData);
      setCategories(categoriesData);
      setLocations(locationsData);
    };
    loadData();
  }, []);

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
    <section className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Encuentra Eventos</h1>

        <div className="bg-gray-800 rounded-lg shadow-md p-6 mb-10">
          <h2 className="text-2xl font-semibold mb-4">Filtrar Eventos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar eventos..."
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>

            <div>
              <select
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">Todas las categorías</option>
                {categories.map((cat: ICategory) => (
                  <option
                    key={cat.categoryId}
                    value={cat.categoryId.toString()}
                  >
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <select
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
                <option value="">Todas las ubicaciones</option>
                {locations.map((location: ILocation) => (
                  <option
                    key={location.locationId}
                    value={location.locationId.toString()}
                  >
                    {location.city}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event: IEvents) => (
            <motion.div
              key={event.eventId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-800 rounded-lg shadow-md overflow-hidden"
            >
              <div className="relative h-48">
                <Image
                  src={
                    event.imageUrl ||
                    "https://i.pinimg.com/236x/1a/d2/30/1ad230952c410779a8f11b60818aef06.jpg"
                  }
                  alt={event.name}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 transform hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <Link
                    href={`/events/${event.eventId}`}
                    className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition duration-300"
                  >
                    Ver Detalles
                  </Link>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{event.name}</h3>
                <div className="flex items-center text-gray-400 mb-2">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span className="text-sm">{event.date}</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span className="text-sm">{event.location_id.city}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <p className="text-center text-gray-400 mt-8">
            No se encontraron eventos que coincidan con tu búsqueda.
          </p>
        )}
      </div>
    </section>
  );
};
