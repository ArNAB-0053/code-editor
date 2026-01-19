"use client";
import { useFont } from "@/context/FontProvider";
import { useTheme } from "@/context/ThemeContext";
import { spaceGrotesk } from "@/fonts";
import { cn } from "@/lib/utils";

const reasons = [
  {
    title: "Too Much Friction for Simple Practice",
    description:
      "Switching between editors, terminals, and repositories breaks focus. Practicing DSA should be about logic, not setup.",
  },
  {
    title: "GitHub Should Not Be a Chore",
    description:
      "Pushing small solutions often requires unnecessary repo creation and configuration. This tool removes that overhead.",
  },
  {
    title: "Learning ≠ Environment Management",
    description:
      "Installing packages, managing dependencies, and handling terminals distract from core problem-solving.",
  },
  {
    title: "Practice Should Feel Like Real Development",
    description:
      "File-based structure helps you think and work like a backend engineer, not like someone filling an online form.",
  },
];

export const WhyExists = () => {
  const { theme } = useTheme();
  const { font } = useFont();
  return (
    <section className="w-full py-16 px-6 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className={cn("text-3xl font-semibold", spaceGrotesk.className)}>Why This Exists</h2>
        <p className="text-gray-500 mt-3">
          Built to reduce friction, not to add features.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {reasons.map((item, index) => (
          <div
            key={index}
            className="p-6 rounded-xl border shadow-sm hover:shadow-md transition"
            style={{
                backgroundColor: theme.border5,
                borderColor: theme.border10
            }}
          >
            <h3 className={cn("text-lg font-medium mb-2", font?.className)}>{item.title}</h3>
            <p className={cn("text-sm opacity-50", font?.className)}>
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
