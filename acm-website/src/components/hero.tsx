'use client';
import React, { useState, useEffect } from "react";
import { SpinningBorderButton } from "./ui/spinning-border-button";
import { DiscordButton } from "./ui/discord-button";

const Hero = () => {
  const words = [
    " is innovative",
    "creates opportunities",
    "supports you",
    " helps you develop"
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
          }, 1000); 
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
    <>
      <div id="home" className="pointer-events-none -translate-y-1/12 
        relative flex flex-col items-start justify-center h-screen text-left max-sm:mx-2 lg:max-2xl:mx-24 max-lg:mx-12 max-lg:items-center max-lg:text-center  max-sm:px-6 2xl:pt-20 z-20">
          <div className="!pointer-events-auto">
            <h1 className="font-catamaran max-sm:text-4xl text-5xl font-black text-shadow-lg text-shadow-black md:text-7xl 2xl:text-8xl">
              Association for<br />Computing Machinery
            </h1>
            <p className=" text-lg max-sm:text-sm md:text-2xl mt-4 font-bmono text-white 2xl:text-3xl 2xl:mt-8">
              A club that <span className="italic text-yellow-400">{typingText}
                <span className={`not-italic font-extralight ${cursorVisible ? "opacity-100" : "opacity-0"}`}>|</span>
              </span>
            </p>
            <div className="mt-8 max-lg:justify-center flex gap-4">
              <SpinningBorderButton className="hover:shadow-[0_0_25px_rgba(253,216,53,0.8)] hover:shadow-yellow-600/60 duration-200">
                Register
              </SpinningBorderButton>
              <DiscordButton className="hover:shadow-[0_0_25px_rgba(0,0,0,0.8)] hover:shadow-white/40 duration-200" />
            </div>
          </div>
        </div>
        </>
  );
};

export default Hero;
