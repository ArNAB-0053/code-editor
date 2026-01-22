"use client";
import { CheckIcon } from "@/assets/CheckCrossIcon";
import { useFont } from "@/context/FontProvider";
import { useTheme } from "@/context/ThemeContext";
import { spaceGrotesk } from "@/fonts";
import { cn } from "@/lib/utils";

const finalCTA = {
  heading: "Ready to code smarter?",
  subheading:
    "Practice, organize, and publish your solutions in one focused workspace.",
  ctaText: "Start Coding",
  benefits: [
    "No setup. No login required.",
    "Instant playground + file-based practice.",
    "One-click GitHub publishing.",
    "Built for DSA, not distraction.",
    "Fast, lightweight, and developer-first.",
  ],
};

const FinalCTA = () => {
  const { theme } = useTheme();
  const { font } = useFont();
  return (
    <section
      className="py-16 text-center "
      style={{
        backgroundColor: theme.border5,
      }}
    >
      <h2 className={cn(spaceGrotesk.className, "text-4xl font-bold mb-4")}>{finalCTA.heading}</h2>

      <p className="text-base mb-8 opacity-60">
        {finalCTA.subheading}
      </p>

      <ul className="max-w-xl mx-auto mb-10 space-y-3 opacity-60">
        {finalCTA.benefits.map((item, i) => (
          <li
            key={i}
            className={cn(
              "flex items-center gap-3 pb-3 px-4",
              i !== finalCTA?.benefits?.length - 1 ? "border-b" : "",
            )}
            style={{
              borderColor: theme.border20,
            }}
          >
            <span className="flex items-start ">
              <CheckIcon size={20} />
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <button
        className={cn("px-8 py-2 rounded-xl text-base", font?.className)}
        style={{
          backgroundColor: theme.activeColor,
          color: theme.textColor,
        }}
      >
        {finalCTA.ctaText}
      </button>
    </section>
  );
};

export default FinalCTA;
