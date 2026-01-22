"use client";
import { useFont } from "@/context/FontProvider";
import { useTheme } from "@/context/ThemeContext";
import { spaceGrotesk } from "@/fonts";
import { cn } from "@/lib/utils";
import { AiFillThunderbolt } from "react-icons/ai";
import { BsFillRocketFill } from "react-icons/bs";
import { FaFolder } from "react-icons/fa";
import { IoColorPalette, IoGitCompare } from "react-icons/io5";

const features = [
  {
    title: "Instant Playground",
    description:
      "Run Python, JavaScript, and Java instantly — no setup, no login, no friction. Perfect for quick experiments and DSA practice.",
    icon: <AiFillThunderbolt />,
  },
  {
    title: "File-Based Practice",
    description:
      "Organize your solutions as real files. Work like a developer, not like a form filler.",
    icon: <FaFolder />,
  },
  {
    title: "One-Click GitHub Publish",
    description:
      "Push your solved problems directly to GitHub without manual repo setup or extra configuration.",
    icon: <IoGitCompare />,
  },
  {
    title: "Fast & Lightweight",
    description:
      "Optimized editor and execution flow that stays smooth even during long practice sessions.",
    icon: <BsFillRocketFill />,
  },
  {
    title: "Custom Themes & Fonts",
    description:
      "Switch between multiple color themes and coding fonts to match your style and improve readability.",
    icon: <IoColorPalette />,
  },
];

const Features = () => {
  const { theme } = useTheme();
  const {font} = useFont()
  return (
    <section className="w-full mt-8 py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2
          className={cn(
            spaceGrotesk.className,
            "text-3xl font-semibold text-center mb-12",
          )}
        >
          Why This Editor is Different
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="rounded-2xl p-6 shadow-sm hover:shadow-md transition"
              style={{
                backgroundColor: theme.border10,
              }}
            >
              <div
                className="text-3xl mb-8 place-self-center p-4 rounded-full"
                style={{
                  backgroundColor: theme.border20,
                }}
              >
                {feature.icon}
              </div>
              <h3 className={cn("text-xl text-center font-medium mb-2", font?.className)}>{feature.title}</h3>
              <p className={cn("text-sm text-center opacity-80", font?.className)}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
