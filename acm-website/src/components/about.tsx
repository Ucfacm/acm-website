'use client'
import React from "react";
import { AnimatedPhotoCarousel } from "./ui/animated-photo";

const About = () => {
  const photos = [
    { src: "/image1.svg" },
    { src: "/image2.svg" },
    { src: "/image3.svg" },
    { src: "/image4.svg" },
    { src: "/image5.svg" },
  ];

  return (
    <section className="text-white py-4 px-4 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Text Section */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            About <span className="text-yellow-400">ACM</span>
          </h2>
          <p className="text-gray-300 font-mono leading-7">
            Lorem ipsum dolor sit amet consectetur adipiscing elit.
            Quisque faucibus ex sapien vitae pellentesque sem placerat.
            In id cursus mi pretium tellus duis convallis.
            Tempus leo eu aenean sed diam urna tempor.
            Pulvinar vivamus fringilla lacus nec metus bibendum egestas.
            Iaculis massa nisl malesuada lacinia integer nunc posuere.
            Ut hendrerit semper vel class aptent taciti sociosqu.
            Ad litora torquent per conubia nostra inceptos himenaeos.
          </p>
        </div>

        {/* Photo Carousel Section */}
        <div className="relative">
          <AnimatedPhotoCarousel photos={photos} autoplay />
        </div>
      </div>
    </section>
  );
};

export default About;
