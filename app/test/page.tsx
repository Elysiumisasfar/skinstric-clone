"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { submitPhaseOne } from "@/lib/api";

const slideVariants = {
  initial: { opacity: 0, x: 120, scale: 0.95 },
  animate: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, x: -120, scale: 0.95, transition: { duration: 0.35, ease: [0.7, 0, 0.84, 0] } },
} as const;

export default function TestPage() {
  const [step, setStep] = useState<"name" | "location" | "processing" | "thankyou" | "select_method">("name");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");

  const isValidString = (value: string) => {
    return /^[a-zA-Z\s'-]+$/.test(value.trim());
  };

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (!isValidString(name)) {
      setError("Name must contain letters only.");
      return;
    }
    setError("");
    setStep("location");
  };

  const handleLocationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!location.trim()) {
      setError("Please enter your city.");
      return;
    }
    if (!isValidString(location)) {
      setError("City name must contain letters only.");
      return;
    }

    try {
      setError("");
      setStep("processing");
      await submitPhaseOne(name, location);
      setStep("thankyou");
    } catch (err: any) {
      setError(err.message || "Failed to submit");
      setStep("location");
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        localStorage.setItem("skinstric_base64_image", reader.result as string);
        window.location.href = "/result";
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative w-full h-screen bg-[#f5f5f3] flex flex-col justify-between p-8 text-black font-sans overflow-hidden select-none">
      {/* Header */}
      <header className="w-full flex justify-between items-center text-xs tracking-widest font-semibold uppercase z-20">
        <span>SKINSTRIC</span>
        <span>TO START ANALYSIS</span>
      </header>

      {/* Main Content Area */}
      <main className="relative flex-1 flex items-center justify-center">
        {/* Diamond Box Frame */}
        <div className="absolute w-[300px] h-[300px] md:w-[420px] md:h-[420px] border border-black/15 rotate-45 pointer-events-none" />

        <AnimatePresence mode="wait">
          {/* STEP 1: Name Input */}
          {step === "name" && (
            <motion.form
              key="name"
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              onSubmit={handleNameSubmit}
              className="flex flex-col items-center justify-center text-center max-w-md w-full z-10"
            >
              <span className="text-[10px] uppercase tracking-widest text-gray-500 mb-4">
                Click to type
              </span>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (error) setError("");
                }}
                placeholder="Introduce Yourself"
                className="w-full text-center text-3xl md:text-5xl font-serif bg-transparent border-b border-black focus:outline-none pb-2 placeholder-gray-400"
                autoFocus
              />
              {error && <p className="text-red-500 text-xs mt-3">{error}</p>}
              <button type="submit" className="hidden" />
            </motion.form>
          )}

          {/* STEP 2: Location Input */}
          {step === "location" && (
            <motion.form
              key="location"
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              onSubmit={handleLocationSubmit}
              className="flex flex-col items-center justify-center text-center max-w-md w-full z-10"
            >
              <span className="text-[10px] uppercase tracking-widest text-gray-500 mb-4">
                Click to type
              </span>
              <input
                type="text"
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value);
                  if (error) setError("");
                }}
                placeholder="Where Are You From?"
                className="w-full text-center text-3xl md:text-5xl font-serif bg-transparent border-b border-black focus:outline-none pb-2 placeholder-gray-400"
                autoFocus
              />
              {error && <p className="text-red-500 text-xs mt-3">{error}</p>}
              <button type="submit" className="hidden" />
            </motion.form>
          )}

          {/* STEP 3: Processing Loader */}
          {step === "processing" && (
            <motion.div
              key="processing"
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex flex-col items-center gap-4 text-center z-10"
            >
              <h2 className="text-xl md:text-2xl font-serif">Processing submission</h2>
              <div className="flex gap-2 mt-2">
                <span className="w-2 h-2 bg-black rounded-full animate-bounce" />
                <span className="w-2 h-2 bg-black rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 bg-black rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </motion.div>
          )}

          {/* STEP 4: Thank You Screen */}
          {step === "thankyou" && (
            <motion.div
              key="thankyou"
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="text-center z-10"
            >
              <h2 className="text-4xl md:text-6xl font-serif mb-3">Thank you!</h2>
              <p className="text-xs uppercase tracking-widest text-gray-600">
                Proceed for the next step
              </p>
            </motion.div>
          )}

          {/* STEP 5: Method Selection */}
          {step === "select_method" && (
            <motion.div
              key="select_method"
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex flex-col md:flex-row gap-16 items-center justify-center z-10"
            >
              <button
                onClick={() => (window.location.href = "/scan")}
                className="flex flex-col items-center gap-4 group"
              >
                <div className="w-32 h-32 rounded-full border border-black flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors duration-300">
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="9" strokeWidth="1.5" />
                    <path strokeWidth="1.5" d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6L5.6 18.4" />
                  </svg>
                </div>
                <span className="text-[10px] tracking-widest uppercase font-semibold">
                  ALLOW A.I. TO SCAN YOUR FACE
                </span>
              </button>

              <label className="flex flex-col items-center gap-4 group cursor-pointer">
                <div className="w-32 h-32 rounded-full border border-black flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors duration-300">
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="9" strokeWidth="1.5" />
                    <path strokeWidth="1.5" d="M12 3a9 9 0 010 18 4.5 4.5 0 000-9z" />
                  </svg>
                </div>
                <span className="text-[10px] tracking-widest uppercase font-semibold">
                  ALLOW A.I. ACCESS GALLERY
                </span>
                <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
              </label>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Navigation Footer */}
      <footer className="w-full flex justify-between items-center z-20 h-8">
        <button
          onClick={() => {
            if (step === "location") setStep("name");
            else if (step === "thankyou") setStep("location");
            else if (step === "select_method") setStep("thankyou");
            else window.location.href = "/";
          }}
          className="text-xs uppercase tracking-widest font-semibold flex items-center gap-2 hover:opacity-60 transition"
        >
          &#8592; BACK
        </button>

        {step === "thankyou" && (
          <button
            onClick={() => setStep("select_method")}
            className="text-xs uppercase tracking-widest font-semibold flex items-center gap-2 hover:opacity-60 transition"
          >
            PROCEED &#8594;
          </button>
        )}
      </footer>
    </div>
  );
}