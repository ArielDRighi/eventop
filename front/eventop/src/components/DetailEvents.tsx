"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, MapPin, Users } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import Payments from './Payments'

export default function DetallesEvento() {
  const [showPayment, setShowPayment] = useState(false)

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <Image
              className="h-48 w-full object-cover md:w-48"
              src="https://i.pinimg.com/474x/c6/d8/1b/c6d81bc924e7d70f02897983caa8659b.jpg"
              alt="Imagen del evento"
              width={192}
              height={192}
            />
          </div>
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-purple-500 font-semibold">Concierto</div>
            <h1 className="block mt-1 text-lg leading-tight font-medium text-black">Noche de Rock Clásico</h1>
            <p className="mt-2 text-gray-500">Una noche inolvidable con las mejores bandas de rock clásico de todos los tiempos.</p>
            <div className="mt-4 flex flex-wrap gap-4">
              <div className="flex items-center text-gray-600">
                <Calendar className="h-5 w-5 mr-2" />
                <span>15 de Diciembre, 2023</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Clock className="h-5 w-5 mr-2" />
                <span>20:00 - 23:00</span>
              </div>
              <div className="flex items-center text-gray-600">
                <MapPin className="h-5 w-5 mr-2" />
                <span>Estadio Central</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Users className="h-5 w-5 mr-2" />
                <span>Capacidad: 5000</span>
              </div>
            </div>
            <div className="mt-6">
              <h2 className="text-gray-700 font-semibold">Precios:</h2>
              <ul className="mt-2 space-y-2">
                <li className="flex text-gray-700 justify-between">
                  <span>General</span>
                  <span className="font-semibold">$50 USD</span>
                </li>
                <li className="flex text-gray-700 justify-between">
                  <span>VIP</span>
                  <span className="font-semibold">$100 USD</span>
                </li>
              </ul>
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
          className="mt-12"
          id="payment"
        >
          <Payments />
        </motion.div>
      )}
    </div>
  )
}