"use client";

import React, { useEffect, useState } from "react";
import { submitPhaseTwo } from "@/lib/api";

interface DemographicData {
  race: Record<string, number>;
  age: Record<string, number>;
  gender: Record<string, number>;
}

export default function ResultPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [demographics, setDemographics] = useState<DemographicData>({
    race: {},
    age: {},
    gender: {},
  });

  // User-selected overrides for actual attributes
  const [selectedRace, setSelectedRace] = useState<string>("");
  const [selectedAge, setSelectedAge] = useState<string>("");
  const [selectedGender, setSelectedGender] = useState<string>("");

  useEffect(() => {
    async function analyzeImage() {
      const storedImage = localStorage.getItem("skinstric_base64_image");

      if (!storedImage) {
        setError("No image found. Please go back and upload or scan an image.");
        setLoading(false);
        return;
      }

      try {
        const res = await submitPhaseTwo(storedImage);
        // Parse nested API response structure: { data: { race, age, gender } }
        const dataPayload = res.data || res.demographics || res;

        const raceData = dataPayload.race || {};
        const ageData = dataPayload.age || {};
        const genderData = dataPayload.gender || {};

        setDemographics({
          race: raceData,
          age: ageData,
          gender: genderData,
        });

        // Default selections to top-predicted scores
        const sortedRace = getSortedEntries(raceData);
        const sortedAge = getSortedEntries(ageData);
        const sortedGender = getSortedEntries(genderData);

        if (sortedRace.length > 0) setSelectedRace(sortedRace[0][0]);
        if (sortedAge.length > 0) setSelectedAge(sortedAge[0][0]);
        if (sortedGender.length > 0) setSelectedGender(sortedGender[0][0]);
      } catch (err: any) {
        setError("Failed to analyze photo. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    analyzeImage();
  }, []);

  // Sort entries descending by value
  const getSortedEntries = (obj: Record<string, number>) => {
    return Object.entries(obj).sort(([, a], [, b]) => b - a);
  };

  // Convert raw value to percentage rounded to 2 decimal places
  const formatPercent = (val: number) => {
    const percentage = val <= 1 ? val * 100 : val;
    return percentage.toFixed(2);
  };

  if (loading) {
    return (
      <div className="w-full h-screen bg-[#f5f5f3] flex flex-col items-center justify-center font-sans text-black">
        <h2 className="text-xl md:text-2xl font-serif mb-4">Analyzing Profile...</h2>
        <div className="flex gap-2">
          <span className="w-2.5 h-2.5 bg-black rounded-full animate-bounce" />
          <span className="w-2.5 h-2.5 bg-black rounded-full animate-bounce [animation-delay:0.2s]" />
          <span className="w-2.5 h-2.5 bg-black rounded-full animate-bounce [animation-delay:0.4s]" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-screen bg-[#f5f5f3] flex flex-col items-center justify-center font-sans text-black p-8 text-center">
        <p className="text-red-500 mb-6">{error}</p>
        <button
          onClick={() => (window.location.href = "/test")}
          className="text-xs tracking-widest font-semibold uppercase border-b border-black pb-1"
        >
          &#8592; Try Again
        </button>
      </div>
    );
  }

  const sortedRace = getSortedEntries(demographics.race);
  const sortedAge = getSortedEntries(demographics.age);
  const sortedGender = getSortedEntries(demographics.gender);

  return (
    <div className="min-h-screen bg-[#f5f5f3] text-black font-sans p-8 flex flex-col justify-between select-none">
      {/* Header */}
      <header className="w-full flex justify-between items-center text-xs tracking-widest font-semibold uppercase z-20">
        <span>SKINSTRIC</span>
        <span>DEMOGRAPHIC PREDICTIONS</span>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto w-full my-8 space-y-8">
        {/* Top Summary Bar displaying currently selected actual attributes */}
        <div className="bg-black text-white p-6 rounded-lg flex flex-wrap justify-between items-center gap-4 text-xs tracking-widest uppercase">
          <div>
            <span className="text-gray-400 block mb-1">Selected Demographics</span>
            <span className="text-base font-serif capitalize">
              {selectedGender || "—"} | {selectedRace || "—"} | {selectedAge ? `Age ${selectedAge}` : "—"}
            </span>
          </div>
          <p className="text-[10px] text-gray-400 max-w-xs">
            Click any prediction score below to update your actual attributes.
          </p>
        </div>

        {/* RACE SECTION */}
        <section className="bg-white/70 backdrop-blur-sm p-6 rounded-lg border border-black/10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xs font-semibold tracking-widest uppercase text-gray-500">
              Race / Ethnicity
            </h2>
            <span className="text-[10px] text-gray-400 uppercase tracking-widest">
              Selected: <strong className="text-black capitalize">{selectedRace}</strong>
            </span>
          </div>

          <div className="space-y-2">
            {sortedRace.map(([key, val]) => {
              const isSelected = selectedRace === key;
              return (
                <div
                  key={key}
                  onClick={() => setSelectedRace(key)}
                  className={`flex justify-between items-center p-3 rounded cursor-pointer transition-all border ${
                    isSelected
                      ? "border-black bg-black/5 font-semibold"
                      : "border-transparent hover:bg-black/5"
                  }`}
                >
                  <span className="capitalize text-sm">{key}</span>
                  <span className="font-mono text-sm">{formatPercent(val)}%</span>
                </div>
              );
            })}
          </div>
        </section>

        {/* AGE & GENDER GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* AGE SECTION */}
          <section className="bg-white/70 backdrop-blur-sm p-6 rounded-lg border border-black/10">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xs font-semibold tracking-widest uppercase text-gray-500">
                Age Bracket
              </h2>
              <span className="text-[10px] text-gray-400 uppercase tracking-widest">
                Selected: <strong className="text-black">{selectedAge}</strong>
              </span>
            </div>

            <div className="space-y-2">
              {sortedAge.map(([key, val]) => {
                const isSelected = selectedAge === key;
                return (
                  <div
                    key={key}
                    onClick={() => setSelectedAge(key)}
                    className={`flex justify-between items-center p-3 rounded cursor-pointer transition-all border ${
                      isSelected
                        ? "border-black bg-black/5 font-semibold"
                        : "border-transparent hover:bg-black/5"
                    }`}
                  >
                    <span className="text-sm">{key}</span>
                    <span className="font-mono text-sm">{formatPercent(val)}%</span>
                  </div>
                );
              })}
            </div>
          </section>

          {/* GENDER SECTION */}
          <section className="bg-white/70 backdrop-blur-sm p-6 rounded-lg border border-black/10">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xs font-semibold tracking-widest uppercase text-gray-500">
                Gender Probability
              </h2>
              <span className="text-[10px] text-gray-400 uppercase tracking-widest">
                Selected: <strong className="text-black capitalize">{selectedGender}</strong>
              </span>
            </div>

            <div className="space-y-2">
              {sortedGender.map(([key, val]) => {
                const isSelected = selectedGender === key;
                return (
                  <div
                    key={key}
                    onClick={() => setSelectedGender(key)}
                    className={`flex justify-between items-center p-3 rounded cursor-pointer transition-all border ${
                      isSelected
                        ? "border-black bg-black/5 font-semibold"
                        : "border-transparent hover:bg-black/5"
                    }`}
                  >
                    <span className="capitalize text-sm">{key}</span>
                    <span className="font-mono text-sm">{formatPercent(val)}%</span>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full flex justify-between items-center h-8">
        <button
          onClick={() => (window.location.href = "/test")}
          className="text-xs tracking-widest font-semibold uppercase hover:opacity-60 transition"
        >
          &#8592; START OVER
        </button>
      </footer>
    </div>
  );
}