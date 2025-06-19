"use client";

import { IoMdArrowDropleftCircle, IoMdArrowDroprightCircle } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

type Photo = {
  src: string;
};

export const AnimatedPhotoCarousel = ({
  photos,
  autoplay = false,
}: {
  photos: Photo[];
  autoplay?: boolean;
}) => {
  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % photos.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const isActive = (index: number) => index === active;

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay]);

  const randomRotateY = () => Math.floor(Math.random() * 21) - 10;

  return (
    <div className="mx-auto max-w-4xl px-4 py-20">
      <div className="relative h-96 w-full">
        <AnimatePresence>
          {photos.map((photo, index) => (
            <motion.div
              key={photo.src}
              initial={{
                opacity: 0,
                scale: 0.9,
                z: -100,
                rotate: randomRotateY(),
              }}
              animate={{
                opacity: isActive(index) ? 1 : 0.7,
                scale: isActive(index) ? 1 : 0.95,
                z: isActive(index) ? 0 : -100,
                rotate: isActive(index) ? 0 : randomRotateY(),
                zIndex: isActive(index) ? 40 : photos.length + 2 - index,
                y: isActive(index) ? [0, -80, 0] : 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.9,
                z: 100,
                rotate: randomRotateY(),
              }}
              transition={{
                duration: 0.4,
                ease: "easeInOut",
              }}
              className="absolute inset-0 origin-bottom"
            >
              <img
                src={photo.src}
                alt=""
                width={500}
                height={500}
                draggable={false}
                className="h-full w-full rounded-3xl object-cover object-center"
              />
            </motion.div>
          ))}
        </AnimatePresence>
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-4">
          <button
            onClick={handlePrev}
            className="group/button flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-800"
          >
            <IoMdArrowDropleftCircle className="h-6 w-6 text-black dark:text-neutral-400 group-hover/button:rotate-12 transition-transform duration-300" />
          </button>
          <button
            onClick={handleNext}
            className="group/button flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-800"
          >
            <IoMdArrowDroprightCircle className="h-6 w-6 text-black dark:text-neutral-400 group-hover/button:-rotate-12 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </div>
  );
};
