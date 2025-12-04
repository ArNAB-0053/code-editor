import { Ref } from "react";
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
  setOpen: SetterFunctionTypesBool;
  loading: boolean;
  setLoading: setterFunctionTypesBool;
  setError: setterFunctionTypesString;
  isShared: boolean;
}

export type HeaderProps = OutputHeaderProps | EditorHeaderProps;