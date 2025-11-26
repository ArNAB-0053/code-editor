"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { setCookies } from "@/helper/cookies";

interface ThemeContextType {
  themeName: string;
  updateTheme: (newTheme: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface IThemeProviderProps {
  initialTheme: string;
  children: ReactNode;
}

export function ThemeProvider({
  initialTheme = "app-dark",
  children,
}: IThemeProviderProps) {
  const [themeName, setThemeName] = useState(initialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = themeName;
    console.log(themeName)
  }, [themeName]);

  // useLayoutEffect(() => {
  //   const localItem = localStorage.getItem("persist:prefercence");
  //   const paresedItem = JSON.parse(localItem!)
  //   console.log("Local => ", paresedItem?.editorTheme)
  //   // setThemeName(paresedItem?.editorTheme);
  // }, []);

  const updateTheme = (newTheme: string) => {
    setThemeName(newTheme);
    setCookies("theme", 365, "lax", newTheme);
  };

  return (
    <ThemeContext.Provider value={{ themeName, updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
