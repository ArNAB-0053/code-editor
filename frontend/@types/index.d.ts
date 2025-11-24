export interface OutputHeaderProps {
  isOutput: true;
  editorTheme: string;
  loading: boolean;
  setOutput: React.Dispatch<React.SetStateAction<string>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
}

export type SetterFunctionTypesBool = React.Dispatch<
  React.SetStateAction<boolean>
>;
export type SetterFunctionTypesString = React.Dispatch<
  React.SetStateAction<string>
>;
export type SetterFunctionTypesNumber = React.Dispatch<
  React.SetStateAction<number>
>;

export interface EditorHeaderProps {
  isOutput: false;
  editorTheme: string;
  code: string;
  setCode: setterFunctionTypesString;
  p_lang: string;
  isCopied: boolean;
  setIsCopied: setterFunctionTypesBool;
  setOutput: setterFunctionTypesString;
  loading: boolean;
  setLoading: setterFunctionTypesBool;
  setError: setterFunctionTypesString;
}

