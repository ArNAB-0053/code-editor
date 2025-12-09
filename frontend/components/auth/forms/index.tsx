"use client";
import { NRAFormItem, NRAInput, NRCFormLabel } from "@/components/ui/no-redux";
import { themeConfig } from "@/config/themeConfig";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import { jetBrainsMono } from "@/fonts";
import { LuLoader } from "react-icons/lu";
import { PasswordTooltip, UsernameTooltip } from "../validation-tooltip";
import { ReactNode, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheck, FaEye } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { APopover } from "@/components/ui/antd";
import { FaEyeLowVision } from "react-icons/fa6";
import { IoEye } from "react-icons/io5";

type FormItemComponentType = {
  name: string;
  formItemChildren: React.ReactNode;
  inputChildren?: React.ReactNode;
  value: string;
  onChange: any;
  errorText?: string;
  touched?: boolean;
  enableTouch?: boolean;
  placeholder?: string;
  placeholderIcon?: React.ReactNode;
  type?: string;
  onBlur?: any;
  onFocus?: any;

  showError?: boolean;

  showAvailabilityCheckMsg?: boolean;
  availabilityMessage?: string;
  isAvailable?: boolean;

  loading?: boolean;

  footerChildren?: boolean | ReactNode;
};

export const FormItemComponent = ({
  name,
  formItemChildren,
  value,
  onChange,
  errorText,
  touched,
  enableTouch = true,
  placeholder,
  placeholderIcon,
  type = "text",
  isAvailable = false,
  showAvailabilityCheckMsg = false,
  loading = false,
  availabilityMessage,
  onBlur,
  onFocus,
  showError: showErrorProp,
  footerChildren,
}: FormItemComponentType) => {
  const { themeName } = useTheme();
  const theme = themeConfig(themeName);

  const [passwordVisible, setPasswordVisible] = useState(false);

  const showError =
    showErrorProp !== undefined
      ? showErrorProp && errorText
      : (!enableTouch && errorText) || (enableTouch && touched && errorText);

  const showAvailability =
    !showError && showAvailabilityCheckMsg && availabilityMessage;

  const showTooltip = name === "username" || name === "password";

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
            value={value}
            type={
              name === "password" || name === "confirmPassword"
                ? passwordVisible
                  ? "text"
                  : "password"
                : type
            }
            onChange={onChange}
            onFocus={onFocus}
            className="hover:border-none! border-none! border-l-2! pl-8! placeholder:text-xs!"
            placeholder={placeholder}
            onBlur={onBlur}
          />

          {/* <div
            className="h-full w-0.5 absolute left-0 bottom-0 "
            style={{ background: theme.activeColor }}
          /> */}

          {/* PLACEHOLDER */}
          <div
            className="w-5 h-5 absolute left-2 bottom-px "
            style={{ color: theme.activeColor }}
          >
            {placeholderIcon}
          </div>

          {/* LOADER */}
          {loading && (
            <LuLoader
              className="size-4 absolute right-2 top-2 animate-spin "
              style={{ color: `${theme.activeColor}50` }}
            />
          )}

          {/* AVAILABILITY (CHECK / CROSS) */}
          {showAvailability && (
            <motion.div
              key={`availability-${isAvailable}`}
              layout
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className={cn(
                "mt-1 text-center rounded-full text-[10px] absolute right-1.5 top-[3px] h-[60%] aspect-square flex items-center justify-center  ",
                isAvailable
                  ? "text-[#00ff6a] bg-[#00ff6a]/25"
                  : "text-[#ff0000] bg-[#ff0000]/25",
                jetBrainsMono.className
              )}
            >
              {isAvailable ? (
                <FaCheck size={8} />
              ) : (
                <RxCross1 strokeWidth={1.4} size={8} />
              )}
            </motion.div>
          )}

          {/* EYE (CLOSE / OPEN) for PASSWORD */}
          {(name === "password" || name === "confirmPassword") && (
            <button
              type="button"
              onClick={() => setPasswordVisible(!passwordVisible)}
              className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center cursor-pointer brightness-110"
              style={{ color: `${theme.activeColor}95` }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {passwordVisible ? (
                  <motion.span
                    key="hidden"
                    initial={{ opacity: 0.5, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0.5, scale: 0.8 }}
                    transition={{ duration: 0.1 }}
                  >
                    <FaEyeLowVision size={17} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="visible"
                    initial={{ opacity: 0.5, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0.5, scale: 0.8 }}
                    transition={{ duration: 0.1 }}
                  >
                    <IoEye size={18} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          )}
        </div>

        <div className="relative h-3 w-full">
          <AnimatePresence mode="wait">
            {showError ? (
              <motion.div
                key="error"
                layout
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className={cn(
                  "text-[#ff0000] bg-[#ff0000]/25 mt-1 py-1 px-2 text-start rounded-sm text-[10px] group absolute left-0 top-0 w-full",
                  jetBrainsMono.className
                )}
              >
                <APopover
                  placement="bottom"
                  content={
                    showTooltip && (
                      <>
                        {name === "username" && (
                          <div
                            style={{
                              backgroundColor: ``,
                              // borderLeftTopRadius: "1px",

                            }}
                            className="w-64 relative overflow-hidden rounded-l-[10px] rounded-tr-[10px] "
                          >
                            <UsernameTooltip username={value} />
                            {/* <div
                              className="backdrop-blur-3xl! absolute -right-20 top-20 w-full h-full -z-10 blur-2xl"
                              style={{
                                backgroundColor: theme.activeColor,
                              }}
                            ></div> */}
                          </div>
                        )}

                        {name === "password" && (
                          <div className=" transition-opacity duration-200 relative">
                            <PasswordTooltip password={value} />
                          </div>
                        )}
                      </>
                    )
                  }
                >
                  <p className="truncate text-center">{errorText}</p>
                </APopover>
              </motion.div>
            ) : showAvailability ? (
              <motion.div
                key={`availability-${isAvailable}`}
                layout
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className={cn(
                  "mt-1 py-1 px-2 text-center rounded-sm text-[10px] absolute left-0 top-0 w-full",
                  isAvailable
                    ? "text-[#00ff6a] bg-[#00ff6a]/25"
                    : "text-[#ff0000] bg-[#ff0000]/25",
                  jetBrainsMono.className
                )}
              >
                <p className="truncate">{availabilityMessage}</p>
              </motion.div>
            ) : (
              <motion.div
                key="footer"
                layout
                initial={{ y: -10, opacity: 0.5, height: 0 }}
                animate={{ y: 0, opacity: 1, height: "auto" }}
                exit={{ y: -10, opacity: 0.5, height: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="overflow-hidden absolute left-0 top-0 w-full"
              >
                {footerChildren}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </>
    </NRAFormItem>
  );
};

export * from "./sign-in";
export * from "./sign-up";
