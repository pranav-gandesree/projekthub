import React from "react";
import { cn } from "@/lib/utils"; // Utility from Shadcn for conditional classes

const BackgroundGrid = () => {
  const gridItems = Array.from({ length: 9 });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="grid grid-cols-3 gap-4">
        {gridItems.map((_, index) => (
          <div
            key={index}
            className={cn(
              "w-24 h-24 bg-white border border-gray-300 transition-all duration-300 ease-in-out hover:bg-blue-200 hover:scale-105"
            )}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default BackgroundGrid;
