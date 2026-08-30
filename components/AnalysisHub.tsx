"use client";

import React from "react";

interface AnalysisHubProps {
  onSelectCategory?: (category: string) => void;
}

export default function AnalysisHub({ onSelectCategory }: AnalysisHubProps) {
  const handleCategoryClick = (category: string) => {
    if (onSelectCategory) {
      onSelectCategory(category);
    }
  };

  return (
    <div className="relative w-full h-screen bg-[#f5f5f3] flex flex-col justify-between p-8 text-black font-sans overflow-hidden select-none">
      {/* Outer Dotted Diamond Frame */}
      <main className="relative flex-1 flex items-center justify-center w-full">
        <div className="absolute w-[80vw] h-[80vw] max-w-[500px] max-h-[500px] aspect-square border border-dashed border-gray-400 rotate-45 pointer-events-none" />

        {/* 2x2 Grid Rotated 45 Degrees to Form Diamond Layout */}
        <div className="relative rotate-45 grid grid-cols-2 gap-3 p-2 z-10">
          {/* Top Diamond Box: Demographics */}
          <button
            onClick={() => handleCategoryClick("Demographics")}
            className="w-28 h-28 md:w-36 md:h-36 bg-[#cfd3d8] hover:bg-[#bdc2c8] transition-colors flex items-center justify-center shadow-sm cursor-pointer group"
          >
            <span className="-rotate-45 text-xs md:text-sm font-semibold tracking-wide text-gray-800 group-hover:scale-105 transition-transform">
              Demographics
            </span>
          </button>

          {/* Right Diamond Box: Skin Type Details */}
          <button
            onClick={() => handleCategoryClick("Skin Type Details")}
            className="w-28 h-28 md:w-36 md:h-36 bg-[#f0f2f5] hover:bg-[#e4e7eb] transition-colors flex items-center justify-center shadow-sm cursor-pointer group"
          >
            <span className="-rotate-45 text-xs md:text-sm font-semibold tracking-wide text-gray-700 text-center leading-tight px-2 group-hover:scale-105 transition-transform">
              Skin Type <br /> Details
            </span>
          </button>

          {/* Left Diamond Box: Cosmetic Concerns */}
          <button
            onClick={() => handleCategoryClick("Cosmetic Concerns")}
            className="w-28 h-28 md:w-36 md:h-36 bg-[#f0f2f5] hover:bg-[#e4e7eb] transition-colors flex items-center justify-center shadow-sm cursor-pointer group"
          >
            <span className="-rotate-45 text-xs md:text-sm font-semibold tracking-wide text-gray-700 text-center leading-tight px-2 group-hover:scale-105 transition-transform">
              Cosmetic <br /> Concerns
            </span>
          </button>

          {/* Bottom Diamond Box: Weather */}
          <button
            onClick={() => handleCategoryClick("Weather")}
            className="w-28 h-28 md:w-36 md:h-36 bg-[#f0f2f5] hover:bg-[#e4e7eb] transition-colors flex items-center justify-center shadow-sm cursor-pointer group"
          >
            <span className="-rotate-45 text-xs md:text-sm font-semibold tracking-wide text-gray-700 group-hover:scale-105 transition-transform">
              Weather
            </span>
          </button>
        </div>
      </main>
    </div>
  );
}