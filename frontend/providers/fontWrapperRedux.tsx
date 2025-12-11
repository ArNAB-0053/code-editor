"use client";
import { WebsiteFontsKey } from "@/@types/font";
import { websiteFonts } from "@/fonts";
import { selectWebsiteFont } from "@/redux/slices/preferenceSlice";
import React from "react";
import { useSelector } from "react-redux";

const FontWrapperRedux = ({ children }: { children: React.ReactNode }) => {
  const websiteFont = useSelector(selectWebsiteFont);
  const font = websiteFonts[websiteFont as WebsiteFontsKey];

  return <div className={font?.className}>{children}</div>;
};

export default FontWrapperRedux;
