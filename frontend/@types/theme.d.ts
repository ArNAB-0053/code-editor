export interface EditorThemeTypes {
  editorSelectionBackground: string;
  editorLineNumberForeground: string;
  syntaxKeyword: string;
  syntaxString: string;
  syntaxVariable: string;
  syntaxFunction: string;
  syntaxComment: string;
  syntaxNumber: string;
  syntaxOperator: string;
}

export interface WebsiteThemeTypes {
  headerColor: string;
  baseTextColor: string;
  outputBackground: string;
  editorBackground: string;
  border: string;
  border20: string;
  border15: string;
  border10: string;
  border5: string;
  outputColor: string;
  splitterColor: string;
  activeColor: string;
  hoverColor: string;
  modalBg: string;
  textColor: string;
  disabledTextColor: string;
  hoverTextColor: string,
  background: string,
}

export interface ThemeTypes extends EditorThemeTypes, WebsiteThemeTypes {}

export type EditorThemeOptionsTypes = {
    dracula: string;
    "purple-night": string;
    "winter-dark": string;
    "one-dark-pro": string;
    darcula: string;
    "github-dark-dimmed": string;
    "midnight-blue": string;
    "carbon-night": string;
    "zinc-dark": string;
    "app-dark": string;
}