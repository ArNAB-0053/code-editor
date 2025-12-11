"use client";
import { NRAFormItem, NRAInput, NRCFormLabel } from "@/components/ui/no-redux";
import { themeConfig } from "@/config/themeConfig";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import { jetBrainsMono } from "@/fonts";
import { LuLoader } from "react-icons/lu";
import { PasswordTooltip, UsernameTooltip } from "../validation-tooltip";
import { ReactNode } from "react";
import { motion, AnimatePresence, color } from "framer-motion";
import { FaCheck } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { Tooltip } from "antd";
import { defaultColors } from "@/config/default-colors.config";

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
  type = "",
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

  const showError =
    showErrorProp !== undefined
      ? showErrorProp && errorText
      : (!enableTouch && errorText) || (enableTouch && touched && errorText);

  const showAvailability =
    !showError && showAvailabilityCheckMsg && availabilityMessage;

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
            type={type}
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
                  "mt-1 py-1 px-2 text-start rounded-sm text-[10px] group absolute left-0 top-0 w-full",
                  jetBrainsMono.className
                )}
                style={{
                    backgroundColor: defaultColors.ERROR.BG,
                    color: defaultColors.ERROR.TEXT
                }}
              >
                <Tooltip
                  align={{
                    offset: [-10, -10],
                  }}
                  placement="leftTop"
                  title={
                    <>
                      {name === "username" && (
                        <div
                          style={{
                            backgroundColor: `#00000050`,
                            borderRadius: "12px",
                          }}
                          className="p-4"
                        >
                          <UsernameTooltip username={value} />
                        </div>
                      )}

                      {name === "password" && (
                        <div className=" transition-opacity duration-200 relative">
                          <PasswordTooltip password={value} />
                        </div>
                      )}
                    </>
                  }
                  color={`${theme.activeColor}40`}
                  // style={{
                  //   filter: 'back'
                  // }}
                  styles={{
                    root: {
                      borderRadius: "12px",
                    },
                  }}
                  className="backdrop-blur-2xl! "
                >
                  <p className="truncate text-center">{errorText}</p>
                </Tooltip>
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
                  jetBrainsMono.className
                )}
                style={{
                    backgroundColor: isAvailable ? defaultColors.GREEN.BG : defaultColors.ERROR.BG,
                    color: isAvailable ? defaultColors.GREEN.TEXT : defaultColors.ERROR.TEXT
                }}
              >
                <p className="truncate">{availabilityMessage}</p>
              </motion.div>
            ) : (
              <motion.div
                key="footer"
                layout
                initial={{ y: -10, opacity: 0, height: 0 }}
                animate={{ y: 0, opacity: 1, height: "auto" }}
                exit={{ y: -10, opacity: 0, height: 0 }}
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
