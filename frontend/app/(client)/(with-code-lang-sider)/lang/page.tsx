"use client";
import { CheckIcon, CrossIcon } from "@/assets/CheckCrossIcon";
import Lang from "@/components/lang";
import { themeConfig } from "@/config/themeConfig";
import {
  accountBenefitsNote,
  features,
  guestFeatures,
} from "@/constants/welcome/lang";
import { asimovian, sora, spaceGrotesk } from "@/fonts";
import { cn } from "@/lib/utils";
import { selectEditorTheme } from "@/redux/slices/preferenceSlice";
import { selectedUserId } from "@/redux/slices/userSlice";
import { transitionString } from "@/styles";
import { AnimatePresence, motion } from "motion/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Page = () => {
  const editorTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(editorTheme);

  const userId = useSelector(selectedUserId);

  const [isHoveringLang, setIsHoveringLang] = useState(false);

  const welcomes = [
    { text: "Welcome", lang: "en", isNonLatin: false, fullLangName: "English" },
    { text: "स्वागत है", lang: "hi", isNonLatin: true, fullLangName: "Hindi" },
    {
      text: "Bienvenue",
      lang: "fr",
      isNonLatin: false,
      fullLangName: "French",
    },
    {
      text: "Willkommen",
      lang: "de",
      isNonLatin: false,
      fullLangName: "German",
    },
    {
      text: "Bienvenido",
      lang: "es",
      isNonLatin: false,
      fullLangName: "Spanish",
    },
    {
      text: "ようこそ",
      lang: "ja",
      isNonLatin: true,
      fullLangName: "Japanese",
    },
    {
      text: "환영합니다",
      lang: "ko",
      isNonLatin: true,
      fullLangName: "Korean",
    },
  ];

  const [currWelcome, setCurrWelcome] = useState(welcomes[0]);
  const indexRef = React.useRef(0);

  useEffect(() => {
    if (isHoveringLang) return;
    const interval = setInterval(() => {
      indexRef.current = (indexRef.current + 1) % welcomes.length;
      setCurrWelcome(welcomes[indexRef.current]);
    }, 3000); // use 30000 for production

    return () => clearInterval(interval);
  }, [isHoveringLang]);

  return (
    <div
      className="h-full w-full px-6 custom-scrollbar overflow-y-auto overflow-x-hidden flex items-center justify-center border-2 border-l-0 border-b-0 "
      style={{
        height: "calc(100svh - 68px)",
        borderColor: theme.border15,
        color: theme.textColor,
      }}
    >
      <div className={cn("max-w-md space-y-4", spaceGrotesk.className)}>
        {/* <Logo
          className="opacity-50 justify-start"
          textColor={`${theme.activeColor}80`}
          dotColor={`${theme.activeColor}80`}
        /> */}

        <div className=" mt-10 relative w-fit ">
          <AnimatePresence mode="wait">
            <motion.h2
              key={currWelcome.text}
              initial={{ opacity: 0, y: 16, filter: "blur(2px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0.5px)" }}
              exit={{ opacity: 0, y: -16, filter: "blur(2px)" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className={cn(
                "text-xl font-semibold uppercase flex w-fit cursor-pointer rounded-md langName group",
                currWelcome?.isNonLatin ? sora.className : asimovian.className
              )}
              style={{ color: theme.textColor }}
              onMouseEnter={() => setIsHoveringLang(true)}
              onMouseLeave={() => setIsHoveringLang(false)}
              onFocus={() => setIsHoveringLang(true)}
              onBlur={() => setIsHoveringLang(false)}
              tabIndex={0}
            >
              <p className={cn("group-hover:opacity-80", transitionString)}>
                {currWelcome.text}
              </p>
              <p
                className={cn(
                  "text-[10px] pl-1 opacity-40 tracking-widest uppercase font-normal",
                  spaceGrotesk.className
                )}
              >
                {currWelcome.lang}
              </p>
            </motion.h2>

            <motion.div
              initial={false}
              className={cn(
                "langFullName",
                "absolute left-20 -bottom-3 px-2 rounded-md backdrop-blur-2xl",
                "pointer-events-none",
                "text-[11px]"
              )}
              style={{
                backgroundColor: theme.activeColor,
              }}
            >
              {currWelcome.fullLangName}
            </motion.div>
          </AnimatePresence>
        </div>

        <p className="text-xs leading-relaxed opacity-50">
          Select a programming language from the sidebar to start coding.
        </p>

        <div className="space-y-2 text-xs opacity-50">
          {userId ? (
            features.map((feat, i) => (
              <span className="flex items-start gap-x-2" key={i}>
                {feat.featureAvailable ? (
                  <CheckIcon size={17} />
                ) : (
                  <CrossIcon size={17} />
                )}
                <p>{feat.featureHeading}</p>
              </span>
            ))
          ) : (
            <>
              {guestFeatures.map((feat, i) => (
                <span className="flex items-start gap-x-2" key={i}>
                  {feat.featureAvailable ? (
                    <CheckIcon size={17} />
                  ) : (
                    <CrossIcon size={17} />
                  )}
                  <p>{feat.featureHeading}</p>
                </span>
              ))}

              <div className="mt-4 rounded-md border border-dashed p-3 text-xs text-muted-foreground">
                <p className="font-medium mb-1">{accountBenefitsNote.title}</p>
                <ul className="list-disc pl-4 space-y-1">
                  {accountBenefitsNote.points.map((p, i) => (
                    <li key={i}>Save your code automatically</li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>
        <Lang />
      </div>
    </div>
  );
};

export default Page;
