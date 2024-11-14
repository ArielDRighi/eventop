import React from "react";
import SectionOne from "../components/SectionOne";
import Cards from "@/components/Cards";
import Blog from "@/components/Blog";
import BlogTwo from "@/components/BlogTwo";
import App from "@/components/App";

const Home = () => {
  return (
    <div className="bg-gray-900">
      <SectionOne />
      <Cards />
      <BlogTwo />
      <Blog />
      <App />
    </div>
  );
};

export default Home;
