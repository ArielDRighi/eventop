"use client";

const APIURL = process.env.NEXT_PUBLIC_API_URL;

import React, { useEffect, useState } from "react";
import { IEvents } from "@/interfaces/IEventos";
import { Edit2 } from "lucide-react";
import Link from "next/link";


export const GestionEventos = () => {
  const [events, setEvents] = useState<IEvents[]>([]);


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


  return (
    <section className="bg-gray-900 h-screen text-gray-800 py-8">
      
      {/* Mostrar eventos filtrados */}
     <section className="flex flex-row flex-wrap w-full h-screen lg:max-w-6xl mx-auto mb-6">
     {events.map((event: IEvents) => (
        <div key={event.eventId} className="bg-gray-900 shadow-lg rounded p-3 w-1/3 h-[200px]">
         <div className="group relative">
           <img
             className="h-[250px] w-full md:w-72 contain text-center rounded"
             aria-placeholder={event.name}
             src={event.imageUrl}
             alt={event.name}
           />
           <div className="absolute bg-black rounded bg-opacity-0 group-hover:bg-opacity-60 w-full h-full top-0 flex items-center group-hover:opacity-100 transition justify-evenly">
             <Link 
              href={`/edit-event/${event.eventId}`}
             className="hover:scale-110 text-white opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition">
               <Edit2 />
             </Link>
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

export default GestionEventos