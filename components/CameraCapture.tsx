"use client";

import React, { useRef, useCallback } from "react";
import Webcam from "react-webcam";

export default function CameraCapture({ onCapture }: { onCapture: (base64Img: string) => void }) {
  const webcamRef = useRef<Webcam>(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      onCapture(imageSrc); // Sends base64 string to API endpoint
    }
  }, [webcamRef, onCapture]);

  return (
    <div className="flex flex-col items-center gap-4">
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={{ facingMode: "user" }}
        className="w-full max-w-md border border-black"
      />
      <button
        onClick={capture}
        className="px-6 py-3 bg-black text-white text-xs tracking-widest uppercase font-semibold"
      >
        Take Selfie
      </button>
    </div>
  );
}