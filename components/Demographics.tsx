"use client";

import React, { useState } from "react";

interface DemographicsProps {
  onBack?: () => void;
}

export default function Demographics({ onBack }: DemographicsProps) {
  // 0 = Summary View, 1 = Full Demographic Percentages Breakdown
  const [activeTab, setActiveTab] = useState<number>(0);

  const demographicsData = {
    selectedRace: "BLACK",
    raceList: [
      { name: "BLACK", percent: "85.85%" },
      { name: "WHITE", percent: "0.84%" },
      { name: "LATINO HISPANIC", percent: "4.56%" },
      { name: "MIDDLE EASTERN", percent: "0.84%" },
      { name: "EAST ASIAN", percent: "0.36%" },
      { name: "SOUTH ASIAN", percent: "0.14%" },
    ],
    selectedGender: "MALE",
    genderList: [
      { name: "MALE", percent: "81.86%" },
      { name: "FEMALE", percent: "18.14%" },
    ],
    selectedAge: "20-29",
    ageList: [
      { range: "20-29", percent: "49.74%" },
      { range: "50-59", percent: "33.48%" },
      { range: "70-79", percent: "6.24%" },
      { range: "60-69", percent: "0.18%" },
      { range: "10-19", percent: "3.29%" },
    ],
  };

  return (
    <div className="relative w-full min-h-screen bg-[#f5f5f3] flex flex-col justify-between p-6 md:p-10 text-black font-sans overflow-hidden select-none">
      
      {/* ------------------------------------------------------------- */}
      {/* RESPONSIVE DIAMOND FRAMEWORK                                 */}
      {/* Expanded: Two half-diamonds on left & right screen edges     */}
      {/* Constricted: Merges into single centered diamond             */}
      {/* ------------------------------------------------------------- */}
      
      {/* Left Half-Diamond (Visible on Wide Screens) */}
      <div className="hidden xl:block absolute left-0 top-1/2 -translate-y-1/2 w-48 h-48 border-r border-b border-gray-300 rotate-[-45deg] -translate-x-1/2 pointer-events-none transition-all duration-500" />

      {/* Right Half-Diamond (Visible on Wide Screens) */}
      <div className="hidden xl:block absolute right-0 top-1/2 -translate-y-1/2 w-48 h-48 border-l border-t border-gray-300 rotate-[-45deg] translate-x-1/2 pointer-events-none transition-all duration-500" />

      {/* Centered Diamond (Visible on Constricted / Medium Screens) */}
      <div className="xl:hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] h-[85vw] max-w-[620px] max-h-[620px] border border-gray-300/70 rotate-45 pointer-events-none transition-all duration-500" />

      {/* ------------------------------------------------------------- */}

      {/* Top Header */}
      <header className="w-full flex justify-between items-center text-xs tracking-widest font-semibold uppercase z-30">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-black transition cursor-pointer"
        >
          <span>&#8592;</span>
          <span>BACK TO OVERVIEW</span>
        </button>

        {/* 3-Dot Navigation Switcher */}
        <div className="flex items-center gap-2 cursor-pointer">
          {[0, 1].map((index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                activeTab === index
                  ? "bg-black scale-110"
                  : "bg-black/30 hover:bg-black/60"
              }`}
              title={`Switch to View ${index + 1}`}
            />
          ))}
        </div>
      </header>

      {/* Main Content Card Container */}
      <main className="relative flex-1 flex items-center justify-center z-20 my-6">
        {activeTab === 0 ? (
          /* TAB 0: Summary Gauge View */
          <div className="w-full max-w-4xl bg-white p-8 md:p-12 shadow-sm border border-gray-200/60 z-10 transition-all duration-300">
            <div className="mb-8">
              <span className="text-[11px] uppercase tracking-[0.2em] text-gray-400 font-bold block mb-1">
                A.I. ANALYSIS
              </span>
              <h1 className="text-3xl md:text-5xl font-black tracking-tight uppercase">
                DEMOGRAPHICS
              </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              {/* Left Side: Dial Gauge + Progress Bar */}
              <div className="flex flex-col items-center justify-center md:border-r md:border-gray-200/80 md:pr-10">
                <div className="relative w-44 h-44 flex items-center justify-center mb-6">
                  <svg
                    className="w-full h-full transform -rotate-90"
                    viewBox="0 0 36 36"
                  >
                    <path
                      className="text-gray-200"
                      strokeWidth="2.8"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-black"
                      strokeDasharray="50, 100"
                      strokeWidth="2.8"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <span className="absolute text-4xl font-black">50%</span>
                </div>

                {/* Horizontal Progress Bar matching video */}
                <div className="w-full max-w-xs bg-gray-200 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-black h-full w-1/2 rounded-full" />
                </div>
              </div>

              {/* Right Side: A.I. Confidence Metrics */}
              <div className="space-y-6">
                <span className="text-[10px] tracking-[0.2em] font-bold text-gray-400 uppercase">
                  A.I. CONFIDENCE
                </span>
                <div className="space-y-4 text-xs tracking-wider">
                  <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                    <span className="font-semibold text-gray-700">
                      RACE CONFIDENCE
                    </span>
                    <span className="font-mono font-bold text-sm">85.85%</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                    <span className="font-semibold text-gray-700">
                      GENDER CONFIDENCE
                    </span>
                    <span className="font-mono font-bold text-sm">81.86%</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                    <span className="font-semibold text-gray-700">
                      AGE CONFIDENCE
                    </span>
                    <span className="font-mono font-bold text-sm">49.74%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* TAB 1: Detailed Breakdown Lists */
          <div className="w-full max-w-5xl bg-white p-6 md:p-10 shadow-sm border border-gray-200/60 z-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-xs">
            <div className="md:col-span-3 bg-black text-white p-4 rounded-sm flex justify-between items-center uppercase tracking-widest text-xs">
              <div>
                <span className="text-gray-400 block text-[10px]">
                  SELECTED DEMOGRAPHICS
                </span>
                <span className="font-bold">
                  {demographicsData.selectedGender} |{" "}
                  {demographicsData.selectedRace} | AGE{" "}
                  {demographicsData.selectedAge}
                </span>
              </div>
              <button className="text-[10px] underline text-gray-300 hover:text-white">
                UPDATE ATTRIBUTES
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between font-bold tracking-widest text-[10px] text-gray-400 uppercase pb-1 border-b">
                <span>RACE / ETHNICITY</span>
                <span>SELECTED: {demographicsData.selectedRace}</span>
              </div>
              {demographicsData.raceList.map((item, i) => (
                <div key={i} className="flex justify-between items-center py-1 font-mono">
                  <span
                    className={
                      item.name === demographicsData.selectedRace
                        ? "font-bold text-black"
                        : "text-gray-600"
                    }
                  >
                    {item.name}
                  </span>
                  <span className="font-bold">{item.percent}</span>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <div className="flex justify-between font-bold tracking-widest text-[10px] text-gray-400 uppercase pb-1 border-b">
                <span>GENDER PROBABILITY</span>
                <span>SELECTED: {demographicsData.selectedGender}</span>
              </div>
              {demographicsData.genderList.map((item, i) => (
                <div key={i} className="flex justify-between items-center py-1 font-mono">
                  <span
                    className={
                      item.name === demographicsData.selectedGender
                        ? "font-bold text-black"
                        : "text-gray-600"
                    }
                  >
                    {item.name}
                  </span>
                  <span className="font-bold">{item.percent}</span>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <div className="flex justify-between font-bold tracking-widest text-[10px] text-gray-400 uppercase pb-1 border-b">
                <span>AGE BRACKET</span>
                <span>SELECTED: {demographicsData.selectedAge}</span>
              </div>
              {demographicsData.ageList.map((item, i) => (
                <div key={i} className="flex justify-between items-center py-1 font-mono">
                  <span
                    className={
                      item.range === demographicsData.selectedAge
                        ? "font-bold text-black"
                        : "text-gray-600"
                    }
                  >
                    {item.range}
                  </span>
                  <span className="font-bold">{item.percent}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full flex justify-between items-center text-[10px] tracking-widest font-semibold uppercase text-gray-400 z-30">
        <span>A.I. FORMULA CALCULATOR</span>
        <span>SKINSTRIC 2026</span>
      </footer>
    </div>
  );
}