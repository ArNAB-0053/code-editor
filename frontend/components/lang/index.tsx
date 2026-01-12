"use client";
import { WebsiteFontsKey } from "@/@types/font";
import { ThemeTypes } from "@/@types/theme";
import { appUrls } from "@/config/navigation.config";
import { themeConfig } from "@/config/themeConfig";
import { langs } from "@/constants/lang";
import { websiteFonts } from "@/fonts";
import { cn } from "@/lib/utils";
import { setLangRedux } from "@/redux/slices/editorSlice";
import {
  selectEditorTheme,
  selectWebsiteFont,
} from "@/redux/slices/preferenceSlice";
import { GlobalEditorStyles } from "@/styles/customStyledCss";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { CDivider } from "../ui/custom";
import { HeaderLangTitle } from "./header";
import { Code } from "lucide-react";

const StyledLink = styled(Link)<{ $theme: ThemeTypes }>`
  &:hover {
    background: ${({ $theme }) => $theme.border15} !important;
  }
`;

export const AllLangs = () => {
  const editorTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(editorTheme);

  const websiteFont = useSelector(selectWebsiteFont);
  const font = websiteFonts[websiteFont as WebsiteFontsKey];

  const dispatch = useDispatch();
  return (
    <div className="mb-8 grid grid-cols-3">
      {Object.entries(langs).map(([key, x], i) => (
        <StyledLink
          key={i}
          $theme={theme}
          href={`${appUrls.LANG}/${key}`}
          className={cn(
            "text-sm text-center opacity-80 hover:opacity-100 rounded-md transition-all ease-linear duration-100 flex items-center justify-center  gap-3",
            font?.className
          )}
          onClick={() => {
            dispatch(setLangRedux(key));
          }}
        >
          <div className="w-5 aspect-square">{x.logo}</div>
          <p className="truncate w-full text-start">{x.label}</p>
        </StyledLink>
      ))}
    </div>
  );
};

const Lang = () => {
  const editorTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(editorTheme);

  return (
    <>
      <GlobalEditorStyles />
      <AllLangs />
    </>
  );
};

export default Lang;
