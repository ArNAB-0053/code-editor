

export type HeaderProps = OutputHeaderProps | EditorHeaderProps;

export type EditorFontKey =
  | "cascadia"
  | "firacode"
  | "jetbrains"
  | "sourcecode"
  | "robotomono"
  | "ubuntumono"
  | "inconsolata";

export type EditorFontsMap = Record<EditorFontKey, string>;

export const _WebsiteFonts = {
  prompt,
  open_sans,
  work_sans,
  roboto,
  poppins,
  montserrat,
  rubik,
  inter,
  lato,
  nunito,
  mulish,
  outfit,
  lexend,
  urbanist,
} as const;
export type WebsiteFontsKey = keyof typeof _WebsiteFonts;
export type WebsiteFontsMap = Record<WebsiteFontsKey, NextFont>;