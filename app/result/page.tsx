"use client";

import React, { useState } from "react";
import AnalysisHub from "@/components/AnalysisHub";
import Demographics from "@/components/Demographics";

export default function ResultPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-[#f5f5f3]">
      {!selectedCategory ? (
        <AnalysisHub onSelectCategory={(category) => setSelectedCategory(category)} />
      ) : (
        selectedCategory === "Demographics" && (
          <Demographics onBack={() => setSelectedCategory(null)} />
        )
      )}
    </main>
  );
}