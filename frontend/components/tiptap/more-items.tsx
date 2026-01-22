import { BsThreeDotsVertical } from "react-icons/bs";

import { selectEditorTheme } from "@/redux/slices/preferenceSlice";
import { useSelector } from "react-redux";
import { themeConfig } from "@/config/themeConfig";
import { SetterFunctionTypesBool } from "@/@types/_base";
import { cn } from "@/lib/utils";

interface MoreItemsProps {
  clicked: boolean;
  setClicked: SetterFunctionTypesBool;
}

const MoreItems = ({ clicked, setClicked }: MoreItemsProps) => {
  const editorTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(editorTheme);
  return (
    <>
      <button
        className={cn(
          "h-6 flex items-center justify-center more-items w-6 cursor-pointer rounded-md transition",
          clicked ? "bg-white/10" : "hover:bg-white/10",
        )}
        onClick={() => setClicked(!clicked)}
      >
        <BsThreeDotsVertical
          size={14}
          style={{
            color: theme.textColor,
          }}
        />
      </button>
    </>
  );
};

export default MoreItems;
