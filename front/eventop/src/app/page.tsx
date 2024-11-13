"use client";
import React from "react";
import SectionOne from "../components/SectionOne";
import Cards from "@/components/Cards";
import Blog from "@/components/Blog";
import BlogTwo from "@/components/BlogTwo";
import App from "@/components/App"; // Importa el componente App

import { initMercadoPago } from "@mercadopago/sdk-react";

const Home = () => {
  initMercadoPago("APP_USR-55cf3037-c59b-4609-bd0c-2becbaf6c258");

  return (
    <div className="bg-gray-900">
      <App /> {/* Usa el componente App */}
      <SectionOne />
      <Cards />
      <BlogTwo />
      <Blog />
    </div>
  );
};

export default Home;
