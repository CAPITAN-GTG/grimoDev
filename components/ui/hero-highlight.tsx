"use client";
import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface HeroHighlightProps extends React.HTMLAttributes<HTMLDivElement> {}

export const HeroHighlight = ({ children, className, ...props }: HeroHighlightProps) => {
  return (
    <div
      className={cn("relative flex flex-col items-center justify-center overflow-hidden", className)}
      {...props}
    >
      {/* Animated radial gradient backdrop */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <motion.div
          className="h-[180%] w-[180%] rounded-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#7F00FF]/50 via-transparent to-transparent"
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
      </div>
      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl px-4">{children}</div>
    </div>
  );
};

interface HighlightProps extends React.HTMLAttributes<HTMLSpanElement> {}

export const Highlight = ({ children, className, ...props }: HighlightProps) => {
  return (
    <span className={cn("relative inline-block", className)} {...props}>
      <span className="absolute inset-0 -skew-y-3 bg-yellow-400/60 rounded-md" />
      <span className="relative">{children}</span>
    </span>
  );
}; 