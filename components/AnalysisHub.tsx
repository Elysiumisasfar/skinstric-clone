"use client";

import React from "react";
import Link from "next/link";

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
    <div className="relative w-full h-screen bg-[#f5f5f3] flex flex-col justify-between p-6 md:p-10 text-black font-sans overflow-hidden select-none">
      
      {/* Top Header */}
      <header className="flex justify-between items-center z-20">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest">
          <span className="font-bold text-sm">SKINSTRIC</span>
          <span className="text-gray-400 font-normal">[ INTRO ]</span>
        </div>
        <button className="bg-black text-white text-[10px] tracking-widest px-4 py-2 uppercase font-bold">
          ENTER CODE
        </button>
      </header>

      {/* Main Content Title */}
      <div className="absolute top-16 left-6 md:left-10 z-10">
        <h2 className="text-xs font-bold uppercase tracking-widest text-black">A.I. ANALYSIS</h2>
        <p className="text-[11px] text-gray-500 uppercase tracking-wide mt-1">
          A.I. HAS ESTIMATED THE FOLLOWING.<br />
          FIX ESTIMATED INFORMATION IF NEEDED.
        </p>
      </div>

      {/* Center 4-Diamond Layout */}
      <main className="relative flex-1 flex items-center justify-center w-full">
        {/* Outer Dotted Frame */}
        <div className="absolute w-[80vw] h-[80vw] max-w-[500px] max-h-[500px] aspect-square border border-dashed border-gray-400 rotate-45 pointer-events-none" />

        <div className="relative rotate-45 grid grid-cols-2 gap-3 p-2 z-10">
          <button
            onClick={() => handleCategoryClick("Demographics")}
            className="w-28 h-28 md:w-36 md:h-36 bg-[#e2e5e9] hover:bg-[#d5d9de] transition-colors flex items-center justify-center cursor-pointer group"
          >
            <span className="-rotate-45 text-xs md:text-sm font-semibold tracking-wide text-gray-800">
              DEMOGRAPHICS
            </span>
          </button>

          <button
            onClick={() => handleCategoryClick("Skin Type Details")}
            className="w-28 h-28 md:w-36 md:h-36 bg-[#f0f2f5] hover:bg-[#e4e7eb] transition-colors flex items-center justify-center cursor-pointer group"
          >
            <span className="-rotate-45 text-xs md:text-sm font-semibold tracking-wide text-gray-700 text-center leading-tight">
              SKIN TYPE <br /> DETAILS
            </span>
          </button>

          <button
            onClick={() => handleCategoryClick("Cosmetic Concerns")}
            className="w-28 h-28 md:w-36 md:h-36 bg-[#f0f2f5] hover:bg-[#e4e7eb] transition-colors flex items-center justify-center cursor-pointer group"
          >
            <span className="-rotate-45 text-xs md:text-sm font-semibold tracking-wide text-gray-700 text-center leading-tight">
              COSMETIC <br /> CONCERNS
            </span>
          </button>

          <button
            onClick={() => handleCategoryClick("Weather")}
            className="w-28 h-28 md:w-36 md:h-36 bg-[#f0f2f5] hover:bg-[#e4e7eb] transition-colors flex items-center justify-center cursor-pointer group"
          >
            <span className="-rotate-45 text-xs md:text-sm font-semibold tracking-wide text-gray-700">
              WEATHER
            </span>
          </button>
        </div>
      </main>

      {/* Bottom Navigation Bar */}
      <footer className="w-full flex justify-between items-center z-30">
        <Link
          href="/scan"
          className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-black hover:opacity-70 transition"
        >
          <div className="w-7 h-7 border border-black rotate-45 flex items-center justify-center bg-[#f5f5f3]">
            <span className="-rotate-45 text-[9px]">&#9666;</span>
          </div>
          <span>BACK</span>
        </Link>

        <Link
          href="/summary"
          className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-black hover:opacity-70 transition"
        >
          <span>GET SUMMARY</span>
          <div className="w-7 h-7 border border-black rotate-45 flex items-center justify-center bg-[#f5f5f3]">
            <span className="-rotate-45 text-[9px]">&#9656;</span>
          </div>
        </Link>
      </footer>
    </div>
  );
}