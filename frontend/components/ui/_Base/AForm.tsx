"use client";

import { IBaseAFormProps, IExtraAFormProps } from "@/@types/_base";
import { WebsiteFontsKey } from "@/@types/font";
import { ThemeTypes } from "@/@types/theme";
import { websiteFonts } from "@/fonts";
import { Form, FormItemProps } from "antd";
import styled from "styled-components";

export interface AFormProps extends IBaseAFormProps, IExtraAFormProps {}
export interface AItemProps extends FormItemProps, IExtraAFormProps {}

const StyledForm = styled(Form)<{ $theme: ThemeTypes }>`
  .ant-form-item-required {
    color: ${({ $theme }) => $theme?.activeColor} !important;
  }
`;

const StyledFormItem = styled(Form.Item)<{
  $theme: ThemeTypes;
  $font: WebsiteFontsKey;
}>`
  label {
    color: ${({ $theme }) => $theme?.activeColor} !important;
    font-family: ${({ $font }) => $font?.style?.fontFamily} !important;
  }
`;

export const BaseAItem = ({ font, theme, children, ...rest }: AItemProps) => {
  return (
    <StyledFormItem $font={font} $theme={theme} {...rest}>
        {children}
    </StyledFormItem>
  );
};

export const BaseAForm = ({
  theme,
  font,
  style = {},
  className = "",
  children,
  ...rest
}: AFormProps) => {
  return (
    <StyledForm
      $theme={theme}
      className={`${websiteFonts[font]?.className} ${className}`}
      style={{
        fontFamily: font?.style?.fontFamily,
        ...style,
      }}
      {...rest}
    >
      {children}
    </StyledForm>
  );
};
