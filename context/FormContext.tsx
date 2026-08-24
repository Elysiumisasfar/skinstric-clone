"use client";

import React, { createContext, useContext, useState } from "react";

type FormAnswers = {
  skinType?: string;
  concerns?: string[];
  ageGroup?: string;
  image?: string | null;
};

type FormContextType = {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  answers: FormAnswers;
  updateAnswers: (key: keyof FormAnswers, value: any) => void;
  nextStep: () => void;
  prevStep: () => void;
};

const FormContext = createContext<FormContextType | undefined>(undefined);

export function FormProvider({ children }: { children: React.ReactNode }) {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<FormAnswers>({ concerns: [] });

  const updateAnswers = (key: keyof FormAnswers, value: any) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  return (
    <FormContext.Provider value={{ step, setStep, answers, updateAnswers, nextStep, prevStep }}>
      {children}
    </FormContext.Provider>
  );
}

export const useForm = () => {
  const context = useContext(FormContext);
  if (!context) throw new Error("useForm must be used within FormProvider");
  return context;
};