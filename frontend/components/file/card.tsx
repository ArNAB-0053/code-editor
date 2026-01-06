"use client";
import { themeConfig } from "@/config/themeConfig";
import { selectEditorTheme } from "@/redux/slices/preferenceSlice";
import { useSelector } from "react-redux";
import { IFileFolder, IFilesModel } from "@/@types/files";
import CodePreview from "./share/code-preview";
import ThreeDotDropdown from "./three-dot-dropdown";
import { langs } from "@/constants/lang";

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
          <div
            key={i}
            style={{
              backgroundColor: theme.border10,
              borderColor: theme.border10,
              borderWidth: "2px",
            }}
            className="px-3 pt-2 pb-3 rounded-xl "
          >
            {/* Header */}
            <section className="flex items-center justify-between">
              <div
                className="flex items-center mb-1 text-sm"
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
                    <span className="text-sm ml-[4.5px] leading-0">{slicedExt}</span>
                  </div>
                </span>
              </div>

              <ThreeDotDropdown
                fileId={x.id}
                isTrash={isTrash}
                fileName={x.fileName}
                isFile
              />
            </section>

            {/* Body */}
            <div
              className="group relative rounded-xl overflow-hidden transition-all duration-300"
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
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FilesCard;
