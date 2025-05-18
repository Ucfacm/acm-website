'use client';
import React, { useState, useEffect } from "react";
import { HoverBorderGradient } from "./ui/hover-border-gradient";

const Hero = () => {
  const words = [
    "is innovative",
    "creates opportunities",
    "supports you",
    "helps you develop"
  ];

  const [typingText, setTypingText] = useState<string>("");
  const [cursorVisible, setCursorVisible] = useState<boolean>(true);
  const typingSpeed = 150; 
  const cursorBlinkSpeed = 525; 
  const [isDeleting, setIsDeleting] = useState(false);
  const [wordIndex, setWordIndex] = useState<number>(0);
  const [charIndex, setCharIndex] = useState<number>(0);
  const [pause, setPause] = useState<boolean>(false);

  useEffect(() => {
    if (wordIndex >= words.length) return;

    setCursorVisible(true);

    const typeInterval = setInterval(() => {
      if (isDeleting) {
        if (charIndex > 0) {
          setTypingText((prev) => prev.slice(0, prev.length - 1));
          setCharIndex((prev) => prev - 1);
        } else {
          if (wordIndex < words.length - 1) {
            setIsDeleting(false);
            setWordIndex((prevIndex) => prevIndex + 1);
          }
        }
      } else {
        if (charIndex < words[wordIndex].length) {
          setTypingText((prev) => prev + words[wordIndex][charIndex]);
          setCharIndex((prev) => prev + 1);
        } else if (!pause && wordIndex < words.length - 1) {
          setPause(true);
          setTimeout(() => {
            setIsDeleting(true);
            setPause(false);
          }, 1000); // Wait for 1 second before deleting
        }
      }
    }, typingSpeed);

    return () => clearInterval(typeInterval); 
  }, [charIndex, wordIndex, isDeleting, pause]);

  useEffect(() => {
    if (pause || charIndex === words[wordIndex].length) {
      const cursorInterval = setInterval(() => {
        setCursorVisible((prev) => !prev);
      }, cursorBlinkSpeed);

      return () => clearInterval(cursorInterval);
    } else {
      setCursorVisible(true); 
    }
  }, [charIndex, pause, wordIndex]);

  return (
    <div className="relative flex flex-col items-start justify-center h-full text-left lg:m-24 max-lg:m-12 max-lg:items-center max-lg:text-center pt-12 max-sm:px-6">
      <h1 className="font-catamaran text-5xl font-black md:text-7xl focus:border-b-gray-500">
        Association for<br />Computing Machinery
      </h1>
      <p className="text-lg md:text-2xl mt-4 font-bmono text-white">
        A club that <span className="italic text-yellow-400">{typingText}<span className={`blink ${cursorVisible ? "visible" : ""} not-italic font-extralight`}>|</span></span>
      </p>
      <div className="mt-8 flex gap-4">
        <HoverBorderGradient
          containerClassName="rounded-full"
          as="button"
          className="font-bmono text-sm text-yellow-500 backdrop-blur-sm flex items-center space-x-2"
        >
          <span>Register</span>
        </HoverBorderGradient>
        <a href="https://discord.gg/cYJWFBswq7" target="_blank" rel="noopener noreferrer">
          <button className="border-gray-300 border-1 group relative inline-flex font-bmono text-sm items-center justify-center overflow-hidden rounded-full backdrop-blur-xs bg-black/5 px-4 py-2 cursor-pointer font-medium text-neutral-200">
            <span>Discord</span>
            <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]"><div className="relative h-full w-8 bg-white/20"></div></div></button></a>
      </div>
    </div>
  );
};

export default Hero;
