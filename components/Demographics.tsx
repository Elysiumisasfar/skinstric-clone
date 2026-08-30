"use client";

import React, { useState } from "react";

interface DemographicsProps {
  data?: any;
  onBackToOverview: () => void;
}

export default function Demographics({ data, onBackToOverview }: DemographicsProps) {
  // Extract probabilities from API data (or fallback defaults if null)
  const raceScores = data?.race || {
    "east asian": 0.25,
    "southeast asian": 0.06,
    "white": 0.12,
    "black": 0.11,
    "south asian": 0.14,
    "latino hispanic": 0.06,
    "middle eastern": 0.23,
  };

  // Find top predicted race automatically
  const sortedRaces = Object.entries(raceScores).sort(
    ([, a], [, b]) => (b as number) - (a as number)
  );
  
  const [selectedRace, setSelectedRace] = useState(sortedRaces[0][0]);

  // Format percentage
  const getPercentage = (val: number) => Math.round(val * 100);

  return (
    <div className="relative w-full min-h-screen bg-[#f5f5f3] flex flex-col justify-between p-6 md:p-10 text-black font-sans select-none">
      
      {/* Top Header & Back Button */}
      <header className="w-full flex justify-between items-center mb-6">
        <button
          onClick={onBackToOverview}
          className="text-xs font-bold uppercase tracking-widest text-black hover:opacity-70 flex items-center gap-2 cursor-pointer"
        >
          <span>&#8592;</span> BACK TO OVERVIEW
        </button>

        <span className="text-[10px] font-semibold tracking-widest text-gray-400 uppercase">
          SKINSTRIC 2026
        </span>
      </header>

      {/* Main Layout Grid */}
      <main className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto">
        
        {/* Left Navigation Tabs */}
        <div className="lg:col-span-3 space-y-3">
          <button className="w-full p-4 text-left border bg-[#1a1b1c] text-white">
            <div className="text-sm font-bold uppercase">{selectedRace}</div>
            <div className="text-[10px] uppercase opacity-70">RACE</div>
          </button>
          <button className="w-full p-4 text-left border bg-[#eaebeb] text-black">
            <div className="text-sm font-bold uppercase">20-29</div>
            <div className="text-[10px] uppercase text-gray-500">AGE</div>
          </button>
          <button className="w-full p-4 text-left border bg-[#eaebeb] text-black">
            <div className="text-sm font-bold uppercase">MALE</div>
            <div className="text-[10px] uppercase text-gray-500">SEX</div>
          </button>
        </div>

        {/* Center Confidence Ring Display */}
        <div className="lg:col-span-5 bg-[#eaebeb] p-8 flex flex-col items-center justify-center min-h-[340px] rounded-sm relative">
          <h3 className="absolute top-4 left-4 text-2xl font-serif capitalize">{selectedRace}</h3>
          
          <div className="w-48 h-48 rounded-full border-4 border-gray-300 flex items-center justify-center">
            <span className="text-4xl font-bold">
              {getPercentage(raceScores[selectedRace] || 0)}%
            </span>
          </div>
        </div>

        {/* Right API Confidence Score Table */}
        <div className="lg:col-span-4 bg-white p-6 border border-gray-200 space-y-3">
          <div className="flex justify-between text-xs font-bold uppercase border-b pb-2 text-gray-500">
            <span>RACE</span>
            <span>A.I. CONFIDENCE</span>
          </div>

          <div className="space-y-1">
            {Object.entries(raceScores).map(([raceKey, score]) => {
              const percentage = getPercentage(score as number);
              const isSelected = selectedRace === raceKey;

              return (
                <div
                  key={raceKey}
                  onClick={() => setSelectedRace(raceKey)}
                  className={`flex justify-between items-center p-2 text-xs cursor-pointer capitalize transition ${
                    isSelected ? "bg-[#1a1b1c] text-white" : "hover:bg-gray-100 text-black"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 border rotate-45 border-current inline-block" />
                    <span>{raceKey}</span>
                  </div>
                  <span className="font-semibold">{percentage}%</span>
                </div>
              );
            })}
          </div>

          <button className="w-full bg-[#1a1b1c] text-white text-xs font-bold uppercase py-3 mt-4 tracking-widest hover:bg-gray-800 transition">
            UPDATE ATTRIBUTES
          </button>
        </div>

      </main>
    </div>
  );
}