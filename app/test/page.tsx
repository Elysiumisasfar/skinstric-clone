"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function TestPage() {
  const [step, setStep] = useState(1);

  return (
    <div className="w-full h-screen bg-[#f5f5f3] flex flex-col justify-between p-8 text-black font-sans">
      <header className="flex justify-between items-center">
        <Link href="/" className="text-xs font-bold tracking-widest no-underline text-black">
          SKINSTRIC ( STEP 0{step} )
        </Link>
        <Link href="/" className="text-xs uppercase underline tracking-wider text-black">
          Exit Test
        </Link>
      </header>

      <div className="max-w-xl mx-auto text-center my-auto">
        <h2 className="text-3xl md:text-5xl font-serif mb-8">
          {step === 1 ? "What is your skin type?" : "Primary skincare goals?"}
        </h2>
        
        <div className="grid grid-cols-2 gap-4">
          {(step === 1 
            ? ["Oily", "Dry", "Combination", "Normal"] 
            : ["Anti-Aging", "Hydration", "Acne Care", "Texture"]
          ).map((option) => (
            <button
              key={option}
              onClick={() => setStep((s) => Math.min(s + 1, 2))}
              className="p-4 border border-black hover:bg-black hover:text-white transition text-xs tracking-wider uppercase font-semibold"
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <footer className="text-center text-[10px] tracking-widest text-gray-500 uppercase">
        Step {step} of 2
      </footer>
    </div>
  );
}