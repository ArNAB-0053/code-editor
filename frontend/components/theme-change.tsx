"use client";

import { useTheme } from "next-themes";
import { useEffect } from "react";

export function ThemeChange() {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    console.log("THEME => ", theme);
  }, [theme]);
  return (
    <>
      <button onClick={() => setTheme("dracula")}>Dracula</button>
      <button onClick={() => setTheme("purple-night")}>Purple</button>
      <button onClick={() => setTheme("winter-dark")}>Winter</button>
    </>
  );
}
