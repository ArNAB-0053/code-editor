import { FormProps } from "antd";
import { ThemeTypes } from "./theme";
import { WebsiteFontsKey } from "./font";
import React, { ReactNode } from "react";
import { RegisterFormType } from "@/zod/auth.z";
import { NextFont } from "next/dist/compiled/@next/font";

export interface IBaseAFormProps extends Omit<FormProps, "children"> {
  children?: ReactNode;
}

export interface IExtraAFormProps {
  theme: ThemeTypes;
  font: WebsiteFontsKey;
}

export interface IExtraProps {
  theme: ThemeTypes;
  font?: WebsiteFontsKey;
  fontClass?: NextFont;
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
export type SetterFunctionTypesArray = React.Dispatch<
  React.SetStateAction<string[]>
>;
export interface IModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IBaseCustomProps {
  children: ReactNode;
  style?: React.CSSProperties;
  className?: string;
}
export interface IBaseStylingProps {
  style?: React.CSSProperties;
  className?: string;
}

export interface IProfileDetails
  extends Pick<RegisterFormType, "password" | "email"> {
  name: string;
  userId: string;
  nameObj: NameObjType;
  username: string;
  mobileNo?: string
}

export type NameObjType = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export interface IBaseLogoProps {
  size?: number;
  style?: React.CSSProperties;
  className?: string;
}

export interface IBaseReturn {
  status: "success" | "error";
  message?: string
}