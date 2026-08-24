"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative w-full h-screen bg-[#f5f5f3] text-black flex flex-col justify-between p-8 overflow-hidden font-sans border-b border-gray-300">
      
      {/* Top Navigation Bar */}
      <header className="w-full flex justify-between items-center z-20">
        <div className="flex items-center gap-2">
          <span className="font-bold text-xs tracking-wider">SKINSTRIC</span>
          <span className="text-[10px] text-gray-500">( INTRO )</span>
        </div>
        <button className="bg-black text-white text-xs font-semibold px-4 py-2 hover:bg-gray-800 transition">
          ENTER CODE
        </button>
      </header>

      {/* Hero Center Grid */}
      <div className="relative w-full flex-1 flex items-center justify-center">
        
        {/* Left Diamond Button: Discover A.I. */}
        <Link href="#discover" className="absolute left-4 md:left-12 flex items-center gap-3 group z-20">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="w-14 h-14 border border-black rotate-45 flex items-center justify-center bg-transparent group-hover:bg-black transition-colors"
          >
            <span className="-rotate-45 text-black group-hover:text-white transition-colors text-sm">
              &#8592;
            </span>
          </motion.div>
          <span className="text-[11px] font-semibold tracking-wider hidden sm:inline-block">
            DISCOVER A.I.
          </span>
        </Link>

        {/* Center Headline */}
        <h1 className="text-4xl md:text-7xl font-serif tracking-tight text-center max-w-2xl leading-tight">
          Sophisticated skincare
        </h1>

        {/* Right Diamond Button: Take Test */}
        <Link href="/test" className="absolute right-4 md:right-12 flex items-center gap-3 group z-20">
          <span className="text-[11px] font-semibold tracking-wider hidden sm:inline-block">
            TAKE TEST
          </span>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="w-14 h-14 border border-black rotate-45 flex items-center justify-center bg-transparent group-hover:bg-black transition-colors"
          >
            <span className="-rotate-45 text-black group-hover:text-white transition-colors text-sm">
              &#8594;
            </span>
          </motion.div>
        </Link>
      </div>

      {/* Bottom Sub-text */}
      <footer className="w-full max-w-sm text-[10px] tracking-wide uppercase leading-relaxed text-gray-800 z-20">
        SKINSTRIC DEVELOPED AN A.I. THAT CREATES A HIGHLY-PERSONALIZE ROUTINE TAILORED TO WHAT YOUR SKIN NEEDS.
      </footer>
    </section>
  );
}