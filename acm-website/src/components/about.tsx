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
    <section id="about" className="text-white py-4 px-4 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            About <span className="text-yellow-400">ACM</span>
          </h2>
          <p className="text-gray-300 font-mono leading-7">
          The ACM UCF chapter fosters a community where students from all computer-related disciplines can socialize, learn, and grow throughout their degree journey. Our social events help members build lasting connections, while workshops offer hands-on learning and in-depth explanations. We also host long-term projects where members can develop real-world skills and see their efforts become tangible products. Monthly general body meetings feature industry guests, allowing members to connect with professionals and gain real-world insights. Over the past two years, our chapter has thrived, with growing membership and members achieving significant milestones in their degrees and careers. Join our Discord server today to learn more!
          </p>
        </div>

        <div className="relative">
          <AnimatedPhotoCarousel photos={photos} autoplay />
        </div>
      </div>
    </section>
  );
};

export default About;
