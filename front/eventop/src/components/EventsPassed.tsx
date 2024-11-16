'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'


// Este es un array de ejemplo. Reemplázalo con tus propias imágenes y datos.
const galleryItems = [
  { id: 1, src: 'https://i.pinimg.com/736x/b4/3f/2d/b43f2d582cd671732f66e6c0f627739a.jpg', alt: 'Concierto de rock', caption: 'Increíble concierto de rock con más de 10,000 asistentes' },
  { id: 2, src: 'https://i.pinimg.com/736x/08/cd/a6/08cda654c04adf69f1ac455001c6c58e.jpg', alt: 'Festival de música electrónica', caption: 'Luces y sonidos espectaculares en nuestro festival anual' },
  { id: 3, src: 'https://i.pinimg.com/736x/ab/d0/c4/abd0c4cff92998ae1f47429a4dedab5e.jpg', alt: 'Evento de jazz', caption: 'Noche de jazz con los mejores músicos de la ciudad' },
  { id: 4, src: 'https://i.pinimg.com/736x/ec/f5/b5/ecf5b56ce6efc5b17a29c34cccf5449f.jpg', alt: 'Concierto acústico', caption: 'Íntimo concierto acústico en el parque central' },
  { id: 5, src: 'https://i.pinimg.com/736x/cb/36/2f/cb362fc5c3025b2158e00255e16b452e.jpg', alt: 'Festival de verano', caption: 'Gran festival de verano con múltiples escenarios' },
  { 
    id: 6, 
    src: 'https://i.pinimg.com/736x/f0/3c/c5/f03cc5f6fa65be00e4d8c477b9ed975b.jpg', 
    alt: 'Orquesta tocando en un teatro', 
    caption: 'Un espectáculo de música clásica en un majestuoso teatro' 
  },
  { 
    id: 7, 
    src: 'https://i.pinimg.com/236x/2c/d4/b4/2cd4b4e5e00e0c169c89e1d2aafad035.jpg', 
    alt: 'Concierto de música clásica', 
    caption: 'La sinfonía que cautivó a todos los asistentes en el concierto' 
  },
  { 
    id: 8, 
    src: 'https://i.pinimg.com/736x/23/c8/76/23c876f02f0d9433c3a5db0d15eac052.jpg', 
    alt: 'Músicos tocando en el escenario', 
    caption: 'El arte de la música clásica llevado a un nuevo nivel' 
  },
  { 
    id: 9, 
    src: 'https://i.pinimg.com/736x/f9/42/08/f94208745406e631b1ab64f630d85358.jpg', 
    alt: 'Concierto en el escenario principal', 
    caption: 'Una noche de armonía perfecta con la orquesta sinfónica' 
  }
]

export default function Component() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  return (
    <div className="bg-gray-900">
    <div className="bg-gradient-to-b from-gray-900 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-semibold text-white mb-8 text-center">
          Galería de Eventos Pasados
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item) => (
            <motion.div
              key={item.id}
              className="relative overflow-hidden rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <Image
                src={item.src}
                alt={item.alt}
                width={600}
                height={400}
                className="w-full h-64 object-cover transition-transform duration-300 ease-in-out transform hover:scale-110"
              />
              <motion.div
                className="absolute inset-0 bg-black bg-opacity-60 flex items-end justify-center p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredId === item.id ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-gray-300 text-center font-semibold text-sm sm:text-base">
                  {item.caption}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
    </div>

  )
}