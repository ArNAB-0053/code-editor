import { useSelector } from "react-redux";
import { EmptyContent } from "../empty";
import {
  selectEditorTheme,
  selectWebsiteFont,
} from "@/redux/slices/preferenceSlice";
import { WebsiteFontsKey } from "@/@types/font";
import { websiteFonts } from "@/fonts";
import { themeConfig } from "@/config/themeConfig";
import { cn } from "@/lib/utils";
import { TrashImage } from "@/assets/TrashImage";

const Trash = () => {
  const websiteFont = useSelector(selectWebsiteFont);
  const font = websiteFonts[websiteFont as WebsiteFontsKey];

  const editorTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(editorTheme);
  return (
    <div
      className="h-full rounded-xl relative"
      style={{
        backgroundColor: theme.border5,
      }}
    >
      <div
        className={cn(
          "flex items-center justify-center h-full flex-col absolute left-0 -top-10 w-full",
          font?.className
        )}
      >
        <div
          className="p-10 rounded-full"
          style={{
            backgroundColor: theme.border5,
          }}
        >
          <TrashImage className=" w-36 aspect-square" />
        </div>
        <span
          className={cn(font?.className, "text-xl font-semibold mt-8")}
          style={{ color: theme.textColor }}
        >
          Trash is Empty
        </span>
        <p
          style={{
            color: theme.disabledTextColor,
          }}
          className="text-sm mt-2 opacity-80"
        >
          Deleted files and folders will stay here for <b>30</b> days before
          being permanently removed.
        </p>
      </div>
    </div>
  );
};

export default Trash;
