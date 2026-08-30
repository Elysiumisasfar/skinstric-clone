"use client";

import React from "react";
import Link from "next/link";

export default function HeroScreen() {
  return (
    <div className="relative w-full h-screen bg-[#f5f5f3] flex flex-col justify-between p-6 md:p-10 text-[#1a1b1c] font-sans overflow-hidden select-none">
      
      {/* 1. TOP HEADER */}
      <header className="w-full flex justify-between items-center text-xs font-semibold uppercase tracking-widest z-30">
        <div className="flex items-center gap-2">
          <span className="font-bold text-sm tracking-wider">SKINSTRIC</span>
          <span className="text-gray-400 font-normal">[ INTRO ]</span>
        </div>

        <button className="bg-black text-white text-[10px] tracking-widest px-4 py-2 uppercase font-bold hover:bg-gray-800 transition">
          ENTER CODE
        </button>
      </header>

      {/* ------------------------------------------------------------------- */}
      {/* 2. LEFT SIDE CHEVRON + BUTTON (Enlarged)                            */}
      {/* ------------------------------------------------------------------- */}
      <div className="fixed left-0 top-1/2 -translate-y-1/2 z-20 flex items-center pointer-events-none">
        {/* Larger Dotted Diamond Chevron */}
        <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-[480px] lg:h-[480px] -translate-x-1/2">
          <div className="w-full h-full border border-dotted border-[#a0a4ab] rotate-45" />
        </div>

        {/* Interactive Button */}
        <Link
          href="/discover"
          className="pointer-events-auto group absolute left-6 sm:left-12 lg:left-16 flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-[#1a1b1c] hover:opacity-70 transition z-30"
        >
          <div className="w-7 h-7 border border-[#1a1b1c] rotate-45 flex items-center justify-center bg-[#f5f5f3]">
            <span className="-rotate-45 text-[9px]">&#9666;</span>
          </div>
          <span className="hidden sm:inline">DISCOVER A.I.</span>
        </Link>
      </div>

      {/* ------------------------------------------------------------------- */}
      {/* 3. RIGHT SIDE CHEVRON + BUTTON (Enlarged)                           */}
      {/* ------------------------------------------------------------------- */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-20 flex items-center pointer-events-none">
        {/* Interactive Button */}
        <Link
          href="/test"
          className="pointer-events-auto group absolute right-6 sm:right-12 lg:right-16 flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-[#1a1b1c] hover:opacity-70 transition z-30"
        >
          <span className="hidden sm:inline">TAKE TEST</span>
          <div className="w-7 h-7 border border-[#1a1b1c] rotate-45 flex items-center justify-center bg-[#f5f5f3]">
            <span className="-rotate-45 text-[9px]">&#9656;</span>
          </div>
        </Link>

        {/* Larger Dotted Diamond Chevron */}
        <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-[480px] lg:h-[480px] translate-x-1/2">
          <div className="w-full h-full border border-dotted border-[#a0a4ab] rotate-45" />
        </div>
      </div>

      {/* ------------------------------------------------------------------- */}
      {/* 4. MAIN CENTER TYPOGRAPHY (Responsive scaling prevents collision)  */}
      {/* ------------------------------------------------------------------- */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-12 sm:px-24 md:px-32 lg:px-48 max-w-5xl mx-auto">
        <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-serif tracking-tight leading-[0.95] text-[#1a1b1c] mb-6">
          Sophisticated <br /> skincare
        </h1>

        <p className="max-w-[30ch] text-[10px] sm:text-[11px] md:text-xs font-semibold text-[#1a1b1c] uppercase leading-relaxed tracking-wider">
          SKINSTRIC DEVELOPED AN A.I. THAT CREATES A HIGHLY-PERSONALIZED ROUTINE
          TAILORED TO WHAT YOUR SKIN NEEDS.
        </p>
      </main>

      {/* 5. FOOTER */}
      <footer className="w-full flex justify-between items-center text-[10px] tracking-widest font-semibold uppercase text-gray-500 z-30">
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded-full bg-[#1a1b1c] text-white flex items-center justify-center text-[8px] font-bold">
            N
          </span>
          <span>FORMULA CALCULATOR</span>
        </div>
        <span>SKINSTRIC 2026</span>
      </footer>
    </div>
  );
}