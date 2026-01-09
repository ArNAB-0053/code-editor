import { LangDefinition } from "@/@types/langs";
import { getDataUrls } from "@/helper/dataUrls";

export const languageLogo = (lang: string) => {
  const uri = getDataUrls(lang);
  return (
    <img
      src={uri}
      alt={lang}
      width={110}
      height={110}
      className="rounded-sm grayscale-100 brightness-[400]"
    />
  );
};

export const langs: Record<string, LangDefinition> = {
  python: {
    label: "Python",
    logo: languageLogo("python"),
    ext: ".py",
    fileIcon: "py",
  },
  javascript: {
    label: "JavaScript",
    logo: languageLogo("javascript"),
    ext: ".js",
    fileIcon: "js",
  },
} as const;
