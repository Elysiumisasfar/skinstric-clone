"use client";

import React, { useRef, useState, useEffect } from "react";

export default function ScanPage() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [hasCamera, setHasCamera] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    async function enableCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
          audio: false,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setHasCamera(true);
        }
      } catch (err: any) {
        setErrorMsg("Camera access denied or not available.");
      }
    }

    enableCamera();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const capturePhoto = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const base64Image = canvas.toDataURL("image/jpeg");
      localStorage.setItem("skinstric_base64_image", base64Image);
      window.location.href = "/result";
    }
  };

  return (
    <div className="relative w-full h-screen bg-[#f5f5f3] flex flex-col justify-between p-8 text-black font-sans overflow-hidden select-none">
      {/* Top Header */}
      <header className="w-full flex justify-between items-center text-xs tracking-widest font-semibold uppercase z-20">
        <span>SKINSTRIC</span>
        <span>FACE SCANNING</span>
      </header>

      {/* Camera Viewport Area */}
      <main className="relative flex-1 flex flex-col items-center justify-center">
        {/* Diamond Outline Overlay */}
        <div className="absolute w-[280px] h-[280px] md:w-[380px] md:h-[380px] border-2 border-black/30 rotate-45 pointer-events-none z-10" />

        <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-2 border-black flex items-center justify-center bg-black/5">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover scale-x-[-1]"
          />
          {!hasCamera && !errorMsg && (
            <p className="text-xs uppercase tracking-widest text-gray-500">Starting Camera...</p>
          )}
          {errorMsg && (
            <p className="text-xs uppercase tracking-widest text-red-500 text-center px-4">{errorMsg}</p>
          )}
        </div>

        {hasCamera && (
          <button
            onClick={capturePhoto}
            className="mt-8 px-6 py-3 bg-black text-white text-xs tracking-widest uppercase font-semibold hover:opacity-80 transition z-20"
          >
            TAKE SNAPSHOT
          </button>
        )}
      </main>

      {/* Navigation Footer */}
      <footer className="w-full flex justify-between items-center z-20 h-8">
        <button
          onClick={() => (window.location.href = "/test")}
          className="text-xs uppercase tracking-widest font-semibold flex items-center gap-2 hover:opacity-60 transition"
        >
          &#8592; BACK
        </button>
      </footer>
    </div>
  );
}