"use client";

import {  useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import Payments from '@/components/Payments';
import { useEventById } from '@/helpers/events.helper';



export default function DetallesEvento () {
  const [showPayment, setShowPayment] = useState(false);
  const params = useParams();
  console.log(params);
  const eventId = params.eventId as string;
  console.log(eventId);
  
  const { event, loading, error } = useEventById(eventId);

  if (loading) {
    return <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">Loading...</div>;
  }

  if (error) {
    return <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">{error}</div>;
  }

  if (!event) {
    return <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">Evento no encontrado.</div>;
  }

  return (
     
    <div className='bg-gray-900'>
    <div className="min-h-screen  bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <Image
              className="h-64 text-black font-semibold w-full object-cover md:w-48"
              src={event.imageUrl || "https://i.pinimg.com/736x/1a/d2/30/1ad230952c410779a8f11b60818aef06.jpg"}
              alt={event.name}
              width={192}
              height={192}
            />
          </div>
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-purple-500 font-semibold">
              {event.category_id.name}
            </div>
            <h1 className="block mt-1 text-lg leading-tight font-medium text-black">
              {event.name}
            </h1>
            <p className="mt-2 text-gray-500">Descripción del evento aquí.</p>
            <div className="mt-4 flex flex-wrap gap-4">
              <div className="flex items-center text-gray-600">
                <Calendar className="h-5 w-5 mr-2" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Clock className="h-5 w-5 mr-2" />
                <span>Horario</span>
              </div>
              <div className="flex items-center text-gray-600">
                <MapPin className="h-5 w-5 mr-2" />
                <span>{event.location_id.city}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Users className="h-5 w-5 mr-2" />
                <span>Capacidad</span>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-8"
            >
              {!showPayment ? (
                <button
                  onClick={() => setShowPayment(true)}
                  className="w-full bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600 font-semibold transition duration-300"
                >
                  Comprar Entradas
                </button>
              ) : (
                <Link
                  href="#payment"
                  className="block w-full text-center bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-300"
                >
                  Ir al pago
                </Link>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {showPayment && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-12 bg-gray-900"
          id="payment"
        >
          <Payments />
        </motion.div>
      )}
    </div>
   

    </div> 

  );
}