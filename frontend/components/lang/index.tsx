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
import Link from "next/link";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import styled from "styled-components";

const StyledLink = styled(Link)<{ $theme: ThemeTypes }>`
  &:hover {
    background: ${({ $theme }) => $theme.border15} !important;
  }
`;

const Lang = () => {
  const editorTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(editorTheme);

  const websiteFont = useSelector(selectWebsiteFont);
  const font = websiteFonts[websiteFont as WebsiteFontsKey];

  const dispatch = useDispatch();
  return (
    <div className="lg:p-8 ">
      <h3 className="mb-4 font-semibold relative pl-4">
        Select programming language
        <div
          className="h-full w-1 absolute left-0 top-1/2 -translate-y-1/2"
          style={{ background: theme.activeColor }}
        />
      </h3>
      <div
        className="mb-8 grid max-[350px]:grid-cols-1 grid-cols-2 min-[400px]:grid-cols-3 min-[600px]:grid-cols-4 min-[768px]:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-9 gap-4 flex-wrap rounded-xl relative "
        style={
          {
            // background: `${theme?.activeColor}10`,
            // borderColor: theme?.border10,
          }
        }
      >
        {langs?.map((x, i) => (
          <StyledLink
            key={i}
            $theme={theme}
            href={`${appUrls.LANG}/${x.link}`}
            className={cn(
              "border px-2 py-3 text-sm text-center opacity-80 hover:opacity-100 rounded-md transition-all ease-linear duration-100 flex items-center justify-center flex-col gap-3",
              font?.className
            )}
            style={{
              backgroundColor: `${theme.activeColor}20`,
              borderColor: theme.border20,
            }}
            onClick={() => {
              dispatch(setLangRedux(x.link));
            }}
          >
            <div className="w-7 aspect-square">{x.logo}</div>
            <p className="truncate w-full">{x.label}</p>
          </StyledLink>
        ))}
      </div>
    </div>
  );
};

export default Lang;
