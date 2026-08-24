"use client";

import React, { useState } from "react";

interface DemographicData {
  race: Record<string, number>;
  age: Record<string, number>;
  gender: Record<string, number>;
}

export default function Demographics({ apiData }: { apiData: DemographicData }) {
  // State to track user's confirmed attribute selections
  const [selectedRace, setSelectedRace] = useState<string>("");
  const [selectedAge, setSelectedAge] = useState<string>("");
  const [selectedGender, setSelectedGender] = useState<string>("");

  // Helper function to sort scores descending and format to 2 decimal places
  const formatScores = (categoryObj: Record<string, number>) => {
    return Object.entries(categoryObj)
      .sort(([, a], [, b]) => b - a)
      .map(([key, score]) => ({
        label: key,
        value: (score * 100).toFixed(2), // Format as percentage rounded to 2 decimal places
      }));
  };

  return (
    <div className="flex flex-col md:flex-row w-full gap-8 p-6 font-sans">
      {/* Left Sidebar: Display Selected Actual Attributes */}
      <aside className="w-full md:w-1/3 bg-[#f5f5f3] p-6 border border-black flex flex-col gap-4">
        <h3 className="font-serif text-xl border-b border-black pb-2">Confirmed Attributes</h3>
        <p className="text-xs uppercase">
          <strong className="block text-gray-500">Race:</strong> {selectedRace || "Not selected"}
        </p>
        <p className="text-xs uppercase">
          <strong className="block text-gray-500">Age:</strong> {selectedAge || "Not selected"}
        </p>
        <p className="text-xs uppercase">
          <strong className="block text-gray-500">Gender:</strong> {selectedGender || "Not selected"}
        </p>
      </aside>

      {/* Main List: Descending Demographics */}
      <main className="w-full md:w-2/3 flex flex-col gap-6">
        <div>
          <h4 className="font-semibold text-sm uppercase tracking-wider mb-2">Race Analysis</h4>
          <div className="flex flex-col gap-2">
            {formatScores(apiData.race).map(({ label, value }) => (
              <button
                key={label}
                onClick={() => setSelectedRace(label)}
                className={`flex justify-between items-center p-3 border border-black text-xs uppercase transition ${
                  selectedRace === label ? "bg-black text-white" : "bg-white hover:bg-gray-100"
                }`}
              >
                <span>{label}</span>
                <span className="font-mono">{value}%</span>
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}