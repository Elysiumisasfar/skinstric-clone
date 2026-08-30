"use client";

import React, { useState, useEffect } from "react";
import AnalysisHub from "@/components/AnalysisHub";
import Demographics from "@/components/Demographics";
// import SkinTypeDetails from "@/components/SkinTypeDetails";
// import CosmeticConcerns from "@/components/CosmeticConcerns";
// import Weather from "@/components/Weather";

export default function ResultPage() {
  // View navigation: null = 4-Diamond Hub, string = active sub-screen
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [analysisData, setAnalysisData] = useState<any>(null);

  // Load API results stored from the upload page
  useEffect(() => {
    const storedData = localStorage.getItem("skinstric_analysis");
    if (storedData) {
      setAnalysisData(JSON.parse(storedData));
    }
  }, []);

  // 1. Render Main 4-Diamond Hub Page (with Back and Get Summary buttons)
  if (!activeCategory) {
    return (
      <AnalysisHub
        onSelectCategory={(category: string) => setActiveCategory(category)}
      />
    );
  }

  // 2. Render Single Sub-Page (No sliding pages inside)
  return (
    <div className="w-full min-h-screen bg-[#f5f5f3]">
      {activeCategory === "Demographics" && (
        <Demographics
          data={analysisData?.race ? analysisData : null}
          onBackToOverview={() => setActiveCategory(null)}
        />
      )}

      {/* 
      {activeCategory === "Skin Type Details" && (
        <SkinTypeDetails onBackToOverview={() => setActiveCategory(null)} />
      )}
      */}
    </div>
  );
}