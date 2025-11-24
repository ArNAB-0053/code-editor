export const toTitleCase = (font: string) => {
  const l = font.length;
  const first = font[0].toUpperCase();
  const last = font.slice(1, l);
  return first + last;
};

export const getFontLabel = (font: string) => {
  const canBeSpilited = font.includes("_");
  const splited = canBeSpilited ? font.split("_") : [font];
  let titleCase = "";
  const titleArray = splited.map((x) => toTitleCase(x));
  for (let i = 0; i < titleArray.length; i++) {
    titleCase = titleCase + titleArray[i] + " ";
  }
  return titleCase.trim();
};
