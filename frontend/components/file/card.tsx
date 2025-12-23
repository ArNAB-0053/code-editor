"use client";
import { themeConfig } from "@/config/themeConfig";
import { selectEditorTheme } from "@/redux/slices/preferenceSlice";
import { useSelector } from "react-redux";
import { IFileFolder, IFilesModel } from "@/@types/files";
import CodePreview from "./share/code-preview";
import { BsThreeDotsVertical } from "react-icons/bs";

const FilesCard = ({ data }: { data: IFileFolder }) => {
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
                className="flex items-center mb-1"
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
                  className="text-base px-2 py-0 rounded-md"
                >
                  .<span className="text-xs">{x.lang}</span>
                </span>
              </div>

              <button className="p-1.5 hover:bg-white/5 -translate-y-1 rounded-full cursor-pointer">
                <BsThreeDotsVertical
                  size={14}
                  style={{
                    color: theme.textColor,
                  }}
                />
              </button>
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
