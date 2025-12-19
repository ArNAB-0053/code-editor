export const dateISOtoNormal = (date: string) => {
  const formatted = new Date(date)
    .toLocaleDateString("en-GB")
    .split("/")
    .join("-");

  return formatted;
};
