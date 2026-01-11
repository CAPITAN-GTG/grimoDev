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
          className="h-[180%] w-[180%] rounded-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/30 via-blue-800/10 to-transparent"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
      </div>
      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
    </div>
  );
};

interface HighlightProps extends React.HTMLAttributes<HTMLSpanElement> {}

export const Highlight = React.forwardRef<HTMLSpanElement, HighlightProps>(({ children, className, ...props }, ref) => {
  return (
    <span ref={ref} className={cn("relative inline-block", className)} {...props}>
      <span className="absolute inset-0 -skew-y-3 bg-blue-900/20 rounded-md" />
      <span className="relative">{children}</span>
    </span>
  );
});

Highlight.displayName = "Highlight"; 