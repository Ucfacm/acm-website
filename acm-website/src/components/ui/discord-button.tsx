"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface DiscordButtonProps extends React.HTMLAttributes<HTMLAnchorElement> {
  href?: string;
  label?: string;
}

export const DiscordButton: React.FC<DiscordButtonProps> = ({
  href = "https://discord.gg/cYJWFBswq7",
  label = "Join our Discord!",
  className,
  ...props
}) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    >
      <button
        className={cn(
          "group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-gray-300 bg-black/5 px-6 py-2 font-bmono text-sm font-medium text-neutral-200 backdrop-blur-xs cursor-pointer hover:scale-102",
          className
        )}
      >
        <span>{label}</span>
        <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
          <div className="relative h-full w-8 bg-white/20" />
        </div>
      </button>
    </a>
  );
};
