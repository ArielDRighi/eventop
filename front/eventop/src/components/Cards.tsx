import React from "react";
import arrayCards from "../helpers/arrayCards";

const Cards = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800  py-20 px-4 sm:px-6 lg:px-8">
  <main className="max-w-7xl mx-auto">
    <h1 className="text-xl sm:text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300 text-center mb-12">
      Eventos Recientes
    </h1>
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {arrayCards.map((event, index) => (
        <div key={index} className="bg-gray-900 rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
          <div className="relative group">
            <img
              className="w-full h-56 object-cover object-center"
              src={event.imgSrc}
              alt={event.title}
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out">
              <button className="text-white bg-purple-600 hover:bg-purple-700 font-bold py-2 px-4 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 ease-in-out">
                Ver Detalles
              </button>
            </div>
          </div>
          <div className="p-6">
            <h3 className="text-white text-xl font-semibold mb-2 truncate">{event.title}</h3>
            <p className="text-gray-400 mb-4">{event.date}</p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-purple-300 font-medium px-2 py-1 bg-purple-900 rounded-full">
                {event.category}
              </span>
              <button className="text-gray-400 hover:text-pink-500 transition duration-300 ease-in-out">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ))}
    </section>
  </main>
</div>
  );
};

export default Cards;
