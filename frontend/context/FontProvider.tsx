"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { setCookies } from "@/helper/cookies";
import { websiteFonts } from "@/fonts";
import { WebsiteFontsKey } from "@/@types/font";
import { NextFont } from "next/dist/compiled/@next/font";

interface FontContextType {
  fontName: string;
  font: NextFont;
  updateFont: (newFont: string) => void;
}

const FontContext = createContext<FontContextType | undefined>(undefined);

interface IFontProviderProps {
  initialFont: string;
  children: ReactNode;
}

export function FontProvider({
  initialFont = "prompt",
  children,
}: IFontProviderProps) {
  const [fontName, setFontName] = useState(initialFont);

  useEffect(() => {
    document.documentElement.dataset.font = fontName;
  }, [fontName]);

  const updateFont = (newFont: string) => {
    setFontName(newFont);
    setCookies("font", 365, "lax", newFont);
  };

  const font = websiteFonts[fontName as WebsiteFontsKey];

  return (
    <FontContext.Provider value={{ fontName, font, updateFont }}>
      {children}
    </FontContext.Provider>
  );
}

export function useFont() {
  const context = useContext(FontContext);
  if (context === undefined) {
    throw new Error("useFont must be used within a FontProvider");
  }
  return context;
}
