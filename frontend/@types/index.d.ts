import { SetterFunctionTypesBool, SetterFunctionTypesString } from "./_base";

export interface OutputHeaderProps {
  isOutput: true;
  editorTheme: string;
  loading: boolean;
  setOutput: React.Dispatch<React.SetStateAction<string>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
}



export interface EditorHeaderProps {
  isOutput: false;
  editorTheme: string;
  code: string;
  setCode: SetterFunctionTypesString;
  p_lang: string;
  isCopied: boolean;
  setIsCopied: SetterFunctionTypesBool;
  setOutput: setterFunctionTypesString;
  loading: boolean;
  setLoading: setterFunctionTypesBool;
  setError: setterFunctionTypesString;
}

