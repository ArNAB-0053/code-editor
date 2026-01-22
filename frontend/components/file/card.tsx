"use client";
import { themeConfig } from "@/config/themeConfig";
import { selectEditorTheme } from "@/redux/slices/preferenceSlice";
import { useSelector } from "react-redux";
import { IFileFolder, IFilesModel } from "@/@types/files";
import CodePreview from "./share/code-preview";
import { langs } from "@/constants/lang";
import Link from "next/link";
import { appUrls } from "@/config/navigation.config";
import { setCreatedFileIdRedux } from "@/redux/slices/createdFilesEditorSlice";
import { useDispatch } from "react-redux";
import { ThemeTypes } from "@/@types/theme";
import styled from "styled-components";
import { setFolderId } from "@/redux/slices/fileFolderSlice";
import { ThreeDotDropdown } from "../dropdown/three-dot-dropdown";

const StyledLink = styled(Link)<{ $theme: ThemeTypes }>`
  background: ${({ $theme }) => $theme.border10} !important;
  &:hover {
    background: ${({ $theme }) => $theme.border15} !important;
  }
`;

const FilesCard = ({
  data,
  isTrash,
}: {
  data: IFileFolder;
  isTrash?: boolean;
}) => {
  const editorTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(editorTheme);
  // const websiteFont = useSelector(selectWebsiteFont);
  // const font = websiteFonts[websiteFont as WebsiteFontsKey];

  const dispatch = useDispatch();
  return (
    <div
      className="
          grid
          grid-cols-1
          min-[640px]:grid-cols-2
          min-[700px]:grid-cols-2
          min-[950px]:grid-cols-3
          min-[1100px]:grid-cols-3
          min-[1250px]:grid-cols-4
          min-[1460px]:grid-cols-5
          gap-4
        "
    >
      {data?.files?.map((x: IFilesModel, i) => {
        const ext = langs[x?.lang]?.ext;
        const slicedExt = ext?.slice(1, ext?.length);

        return (
          <StyledLink
            $theme={theme}
            href={`${appUrls.CODE}/${x.id}`}
            key={i}
            style={{
              borderColor: theme.border10,
              borderWidth: "2px",
            }}
            onClick={() => {
              dispatch(setCreatedFileIdRedux(x.id));
              dispatch(setFolderId(x.parentId));
            }}
            className="px-3 pt-2 pb-3 rounded-xl relative transition-all duration-200 ease-linear group"
          >
            {/* Header */}
            <section className="flex items-center justify-between">
              <div
                className="flex items-center mb-1 text-sm "
                style={{
                  color: theme.disabledTextColor,
                }}
              >
                {x.fileName}
                <span
                  style={{
                    backgroundColor: `${theme.activeColor}40`,
                    color: theme.activeColor,
                  }}
                  className=" h-4 px-1 py-0 rounded-md translate-x-[3px]  translate-y-0.5 "
                >
                  <div className="-translate-y-1.5">
                    <div
                      className="h-[3px] w-[3px] rounded-full translate-y-3"
                      style={{
                        background: theme.activeColor,
                      }}
                    />
                    <span className="text-sm ml-[4.5px] leading-0">
                      {slicedExt}
                    </span>
                  </div>
                </span>
              </div>

              <div
                className="absolute right-1.5 top-1.5"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
              >
                <ThreeDotDropdown
                  fileId={x.id}
                  isTrash={isTrash}
                  fileName={x.fileName}
                  isFile
                  lang={x.lang}
                />
              </div>
            </section>

            {/* Body */}
            <div className="overflow-hidden rounded-xl relative">
              <div
                className="group relative rounded-xl transition-all duration-300 group-hover:scale-105 "
                style={{
                  backgroundColor: theme.editorBackground,
                  borderColor: theme.border15,
                  borderWidth: "2px",
                }}
              >
                <CodePreview
                  code={x?.codeContent.code}
                  lang={x?.lang || x.codeContent.lang}
                  showLangBadge={false}
                  // editorFontSizeProp="8px"
                />

                {/* <div className="grain-overlay pointer-events-none absolute inset-0" /> */}
              </div>
            </div>
          </StyledLink>
        );
      })}
    </div>
  );
};

export default FilesCard;
