"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlay } from "react-icons/fa";
import { firaCode, jetBrainsMono, lexend, play_us_modern, spaceGrotesk } from "@/fonts";

const langs = ["Python", "JavaScript", "Java", "Cpp", "C", "Go lang"];

export const RotatingLanguageHero = ({ activeColor = "#10b981" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % langs.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="my-10 text-xl flex items-center justify-center gap-x-3">
      <span className={`${spaceGrotesk.className}`}>Run</span>

      <motion.div
        className="rounded-full p-3.5"
        style={{ backgroundColor: "white" }}
        animate={{ rotate: [0, 35, 0] }}
        transition={{
          duration: 1,
          times: [0, 0.4, 1],
          ease: "easeInOut",
        }}
        key={currentIndex}
      >
        <FaPlay
          size={18}
          className="translate-x-px brightness-110"
          style={{ color: activeColor }}
        />
      </motion.div>

      <div className="relative h-7 w-32 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.span
            key={currentIndex}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
            }}
            className={`absolute inset-0 flex items-center font-medium text-base brightness-120 ${jetBrainsMono.className}`}
            style={{ color: activeColor }}
          >
            {langs[currentIndex]} 
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
};
