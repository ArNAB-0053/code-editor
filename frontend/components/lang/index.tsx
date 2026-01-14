"use client";
import { WebsiteFontsKey } from "@/@types/font";
import { appUrls } from "@/config/navigation.config";
import { langs } from "@/constants/lang";
import { websiteFonts } from "@/fonts";
import { cn } from "@/lib/utils";
import { setLangRedux } from "@/redux/slices/editorSlice";
import { selectWebsiteFont } from "@/redux/slices/preferenceSlice";
import { transitionString } from "@/styles";
import { GlobalEditorStyles } from "@/styles/customStyledCss";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

// const StyledLink = styled(Link)<{ $theme: ThemeTypes }>`
//   &:hover {
//     background: ${({ $theme }) => $theme.border15} !important;
//   }
// `;

export const AllLangs = () => {
  const websiteFont = useSelector(selectWebsiteFont);
  const font = websiteFonts[websiteFont as WebsiteFontsKey];

  const dispatch = useDispatch();
  return (
    <div className="mb-8 flex items-center flex-wrap gap-6">
      {Object.entries(langs).map(([key, x], i) => (
        <Link
          key={i}
          href={`${appUrls.LANG}/${key}`}
          className={cn(
            "text-sm text-center  flex items-center justify-center gap-x-2",
            font?.className
          )}
          onClick={() => {
            dispatch(setLangRedux(key));
          }}
        >
          <div
            className={cn(
              "w-full h-full opacity-60 hover:opacity-100 rounded-md flex items-center justify-center gap-x-2",
              transitionString
            )}
          >
            <div className="h-5 aspect-square ">{x.logo}</div>
            <p className="truncate w-full text-start">{x.label}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

const Lang = () => {
  return (
    <>
      <GlobalEditorStyles />
      <AllLangs />
    </>
  );
};

export default Lang;
