import { FormProps } from "antd";
import { ThemeTypes } from "./theme";
import { WebsiteFontsKey } from "./font";
import { ReactNode } from "react";

export interface IBaseCAvatarProps {
    name: string; 
    theme: ThemeTypes; 
}

export interface IBaseAFormProps extends Omit<FormProps, "children"> {
  children?: ReactNode;
}

export interface IExtraAFormProps {
  theme: ThemeTypes;
  font: WebsiteFontsKey;
}

export interface IExtraProps {
  theme: ThemeTypes;
  font: WebsiteFontsKey;
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
export interface IModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}