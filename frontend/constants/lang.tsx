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

export const langs = [
  { link: "python", label: "Python", logo: languageLogo("python") },
  { link: "javascript", label: "JavaScript", logo: languageLogo("javascript") },
];
