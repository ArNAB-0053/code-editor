"use client";
import { themeConfig } from "@/config/themeConfig";
import { useTheme } from "@/context/ThemeContext";
import { LuLoader } from "react-icons/lu";
import { AFormItem, AInput, CFormLabel } from "@/components/ui/antd";
import { cn } from "@/lib/utils";
import { jetBrainsMono } from "@/fonts";

type FormItemComponentType = {
  name: string;
  formItemChildren: React.ReactNode;
  value: string;
  onChange: any;
  placeholder?: string;
  placeholderIcon?: null | React.ReactNode;
  type?: string;
  onBlur?: any;
  onFocus?: any;
  loading?: boolean;
  touched?: boolean;
  errorText?: string;
  formItemClassName?: string;
};

export const FormItemComponent = ({
  name,
  formItemChildren,
  value,
  onChange,
  placeholder,
  placeholderIcon = null,
  type = "text",
  loading = false,
  onBlur,
  onFocus,
  touched,
  errorText,
  formItemClassName = "my-3!",
}: FormItemComponentType) => {
  const { themeName } = useTheme();
  const theme = themeConfig(themeName);

  return (
    <AFormItem
      layout="vertical"
      label={
        <CFormLabel className="pl-1! text-white/50!  ">
          {formItemChildren}
        </CFormLabel>
      }
      name={name}
      className={cn(" w-full!", formItemClassName)}
    >
      <>
        <div className="relative">
          <AInput
            value={value}
            type={type}
            onChange={onChange}
            onFocus={onFocus}
            className={cn(
              "hover:border-none! border-none! border-l-2! placeholder:text-xs!",
              placeholderIcon ? "pl-8!" : "pl-2!"
            )}
            placeholder={placeholder}
            onBlur={onBlur}
          />

          {/* PLACEHOLDER */}
          {placeholderIcon && (
            <div
              className="w-5 h-5 absolute left-2 bottom-px "
              style={{ color: theme.activeColor }}
            >
              {placeholderIcon}
            </div>
          )}

          {/* LOADER */}
          {loading && (
            <LuLoader
              className="size-4 absolute right-2 top-2 animate-spin "
              style={{ color: `${theme.activeColor}50` }}
            />
          )}
        </div>

        {touched && errorText && (
          <div
            className={cn(
              "mt-1 py-1 px-2 text-center rounded-sm text-[10px] absolute left-0 top-0 w-full",
              "text-[#ff0000] bg-[#ff0000]/25",
              jetBrainsMono.className
            )}
          >
            <p className="truncate">{errorText}</p>
          </div>
        )}
      </>
    </AFormItem>
  );
};
