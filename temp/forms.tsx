"use client";
import {
  NRAForm,
  NRAFormItem,
  NRAInput,
  NRCButton,
  NRCFormLabel,
} from "@/components/ui/no-redux";
import { themeConfig } from "@/config/themeConfig";
import { useTheme } from "@/context/ThemeContext";
import { zodToFormik } from "@/lib/formik-zod-adapter";
import {
  login,
  register,
  useGetEmailAvailability,
  useGetUsernameAvailability,
} from "@/services/auth";
import { loginSchema, registerSchema } from "@/zod/auth.z";
import { Formik } from "formik";
import { FaLock, FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { cn } from "@/lib/utils";
import { jetBrainsMono, spaceGrotesk } from "@/fonts";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { Checkbox } from "antd";
import styled, { createGlobalStyle } from "styled-components";
import { ThemeTypes } from "@/@types/theme";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { appUrls } from "@/config/navigation.config";
import { toast } from "sonner";
import { ContinueWithGoogle } from "../frontend/components/auth/forms/continue-with-btns";
import { messagesConfig } from "@/config/messages.config";
import { useDispatch } from "react-redux";
import {
  setUserEmail,
  setUserId,
  setUserName,
  setUserUsername,
} from "@/redux/slices/userSlice";
import { motion, AnimatePresence } from "framer-motion";
import { useDebounce } from "@/hooks/useDebounce";
import { LuLoader } from "react-icons/lu";

const GlobalSwiperStyle = createGlobalStyle<{ $theme: ThemeTypes }>`
.swiper-pagination-bullets {
  top: 0px !important;
  pointer-events: none !important;
}

.swiper-pagination-bullet {
  width: 8px;
  height: 8px;
  background-color: ${({ $theme }) => $theme?.activeColor}80 !important; 
  border-radius: 10px; 
  transition: all 0.3s ease-in-out;
  opacity: 1;
}

.swiper-pagination-bullet-active {
  width: 60px !important;
  height: 6px !important; 
  border-radius: 10px !important; 
  background-color: ${({ $theme }) => $theme?.activeColor} !important;
}
`;

type FormItemComponentType = {
  name: string;
  formItemChildren: React.ReactNode;
  inputChildren?: React.ReactNode;
  value: string;
  onChange: any;
  errorText?: string;
  touched?: boolean;
  placeholder?: string;
  placeholderIcon?: React.ReactNode;
  type?: string;
  onBlur: any;

  showAvailabilityCheckMsg?: boolean;
  availabilityMessage?: string;
  isAvailable?: boolean;

  loading?: boolean;
};

export const FormItemComponent = ({
  name,
  formItemChildren,
  value,
  onChange,
  errorText,
  touched,
  placeholder,
  placeholderIcon,
  type = "",
  isAvailable = false,
  showAvailabilityCheckMsg = false,
  loading = false,
  availabilityMessage,
  onBlur
}: FormItemComponentType) => {
  const { themeName } = useTheme();
  const theme = themeConfig(themeName);
  return (
    <NRAFormItem
      layout="vertical"
      label={
        <NRCFormLabel className="pl-1! text-white/50!  ">
          {formItemChildren}
        </NRCFormLabel>
      }
      name={name}
      className="my-3! w-full!"
    >
      <>
        <div className="relative">
          <NRAInput
            key={name}
            value={value}
            type={type}
            onChange={onChange}
            className="hover:border-none! border-none! border-l-2! pl-8! placeholder:text-xs!"
            placeholder={placeholder}
            onBlur={onBlur}
          />
          {/* <div
            className="h-full w-0.5 absolute left-0 bottom-0 "
            style={{ background: theme.activeColor }}
          /> */}
          <div
            className="w-5 h-5 absolute left-2 bottom-px "
            style={{ color: theme.activeColor }}
          >
            {placeholderIcon}
          </div>

          {loading && (
            <LuLoader
              className="size-4 absolute right-2 top-2 animate-spin "
              style={{ color: `${theme.activeColor}50` }}
            />
          )}
        </div>
        {touched && errorText ? (
          <div
            className={cn(
              "text-[#ff0000] bg-[#ff0000]/25 mt-1 py-1 text-center rounded-sm text-[10px]",
              jetBrainsMono.className
            )}
          >
            {errorText}
          </div>
        ) : (
          <>
            {showAvailabilityCheckMsg && availabilityMessage && (
              <div
                className={cn(
                  "mt-1 py-1 text-center rounded-sm text-[10px]",
                  isAvailable
                    ? "text-[#00ff6a] bg-[#00ff6a]/25"
                    : "text-[#ff0000] bg-[#ff0000]/25",
                  jetBrainsMono.className
                )}
              >
                {availabilityMessage}
              </div>
            )}
          </>
        )}
      </>
    </NRAFormItem>
  );
};

