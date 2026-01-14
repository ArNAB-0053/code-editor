import { LangDefinition } from "@/@types/langs";
import { getProgLangLogos } from "@/helper/getPLogos";
import Image from "next/image";

export const languageLogo = (lang: string) => {
  const logo = getProgLangLogos(lang)
  return (
    <Image
      src={logo}
      alt={lang}
      width={1200}
      height={1200}
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
