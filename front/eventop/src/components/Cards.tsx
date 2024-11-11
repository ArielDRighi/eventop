import React from "react";
import arrayCards from "../helpers/arrayCards";

const Cards = () => {
  return (
    <div>
      <main className="grid -mt-44 place-items-center bg-gradient-to-t from-blue-200 to-indigo-900 p-5">
        <div>
          <h1 className="text-4xl sm:text-5xl md:text-3xl font-semibold text-purple-300 mb-4">
            Eventos Recientes
          </h1>
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {arrayCards.map((event, index) => (
              <div key={index} className="bg-gray-900 shadow-lg rounded p-3">
                <div className="group relative">
                  <img
                    className="w-full md:w-72 block rounded"
                    src={event.imgSrc}
                    alt={event.title}
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
                  <h3 className="text-white text-lg">{event.title}</h3>
                  <p className="text-gray-400">{event.date}</p>
                </div>
              </div>
            ))}
          </section>
        </div>
      </main>
    </div>
  );
};

export default Cards;
