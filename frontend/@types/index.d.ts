import { SetterFunctionTypesBool, SetterFunctionTypesString } from "./_base";

export interface OutputHeaderProps {
  isOutput: true;
  editorTheme: string;
  loading: boolean;
  setError: React.Dispatch<React.SetStateAction<string>>;
}
export interface EditorHeaderProps {
  isOutput: false;
  editorTheme: string;
  p_lang: string;
  isCopied: boolean;
  setIsCopied: SetterFunctionTypesBool;
  loading: boolean;
  setLoading: setterFunctionTypesBool;
  setError: SetterFunctionTypesString;
  isShared: boolean;
}

export type HeaderProps = OutputHeaderProps | EditorHeaderProps;