"use client";
import React, { useState, useEffect, useRef } from "react";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type Direction = "TOP" | "LEFT" | "BOTTOM" | "RIGHT";

export function HoverBorderGradient({
  children,
  containerClassName,
  className,
  as: Tag = "button",
  duration = 1,
  clockwise = true,
  ...props
}: React.PropsWithChildren<
  {
    as?: React.ElementType;
    containerClassName?: string;
    className?: string;
    duration?: number;
    clockwise?: boolean;
  } & React.HTMLAttributes<HTMLElement>
>) {
  const [hovered, setHovered] = useState<boolean>(false);
  const [direction, setDirection] = useState<Direction>("TOP");

  const rotateDirection = (currentDirection: Direction): Direction => {
    const directions: Direction[] = ["TOP", "LEFT", "BOTTOM", "RIGHT"];
    const currentIndex = directions.indexOf(currentDirection);
    const nextIndex = clockwise
      ? (currentIndex - 1 + directions.length) % directions.length
      : (currentIndex + 1) % directions.length;
    return directions[nextIndex];
  };

  const movingMap: Record<Direction, string> = {
    TOP: "radial-gradient(50% 100% at 50% 0%, #f8b332 0%, rgba(248, 179, 50, 0) 100%)",
    LEFT: "radial-gradient(100% 50% at 0% 50%, #f8b332 0%, rgba(248, 179, 50, 0) 100%)",
    BOTTOM: "radial-gradient(50% 100% at 50% 100%, #f8b332 0%, rgba(248, 179, 50, 0) 100%)",
    RIGHT: "radial-gradient(100% 50% at 100% 50%, #f8b332 0%, rgba(248, 179, 50, 0) 100%)",
  };
   

  const highlight =
  "radial-gradient(150% 200% at 50% 50%, #ffc107 0%, rgba(255, 193, 7, 0) 100%)";



  useEffect(() => {
    if (!hovered) {
      const interval = setInterval(() => {
        setDirection((prevState) => rotateDirection(prevState));
      }, duration * 1000);
      return () => clearInterval(interval);
    }
  }, [hovered]);
  return (
    <Tag
      onMouseEnter={(event: React.MouseEvent<HTMLDivElement>) => {
        setHovered(true);
      }}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "relative flex rounded-full border-amber-400 border-[1px]  content-center bg-yellow-700/20 hover:bg-yellow-700/10 transition duration-200 items-center flex-col flex-nowrap gap-10 h-min justify-center overflow-visible p-px decoration-clone w-fit",
        containerClassName
      )}
      {...props}
    >
      <div
        className={cn(
          "w-auto text-yellow-600 z-20 bg-black/20 px-4 py-2 rounded-[inherit]",
          className
        )}
      >
        {children}
      </div>
      <motion.div
        className={cn(
          "flex-none inset-[2px] overflow-hidden absolute z-0 rounded-[inherit]"
        )}
        style={{
          filter: "blur(5px)",
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
        initial={{ background: movingMap[direction] }}
        animate={{
          background: hovered
            ? [movingMap[direction], highlight]
            : movingMap[direction],
        }}
        transition={{ ease: "linear", duration: duration ?? 1 }}
      />
      <div className="bg-black/90 absolute z-1 flex-none inset-[2px] rounded-[100px]" />
    </Tag>
  );
}
