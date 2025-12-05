import React from "react";
import { cn } from "./ui/utils"; // Assuming a utility for merging Tailwind classes

// Define the props for the component
interface GlassmorphismCardProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * A React component that applies an iPhone-style glassmorphism effect.
 * It features a frosted glass look, smooth animations, and adapts to light/dark mode.
 */
export const GlassmorphismCard: React.FC<GlassmorphismCardProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        // Base Styles
        "rounded-2xl border shadow-lg",
        "transition-all duration-300 ease-in-out",

        // Background & Theme
        "bg-white/30 dark:bg-black/30", // Semi-transparent background
        "backdrop-blur-lg", // Frosted glass effect
        "border-white/40 dark:border-black/40", // Subtle border

        // Hover Animation
        "hover:scale-105 hover:bg-white/50 dark:hover:bg-black/50",

        // Active/Click Animation
        "active:scale-95",

        // Apply any additional classes passed in props
        className
      )}
    >
      {children}
    </div>
  );
};

// --- Demo Component ---

/**
 * A simple demo to showcase the GlassmorphismCard in action.
 */
export const GlassmorphismDemo = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <GlassmorphismCard className="w-full max-w-sm">
        <div className="p-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Glassmorphism
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            This card demonstrates the glassy effect with hover and click animations.
            Toggle between light and dark mode to see it adapt.
          </p>
          <button className="mt-4 rounded-lg bg-blue-500/50 px-4 py-2 font-semibold text-white backdrop-blur-md transition-all hover:bg-blue-500/70 active:scale-95">
            Click Me
          </button>
        </div>
      </GlassmorphismCard>
    </div>
  );
};
