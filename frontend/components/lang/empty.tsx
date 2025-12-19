import { themeConfig } from "@/config/themeConfig";
import { selectEditorTheme } from "@/redux/slices/preferenceSlice";
import { Share2 } from "lucide-react";
import { useSelector } from "react-redux";

type EmptyShareType = {
  title?: string;
  description: string;
};

const EmptyShare = ({
  title = "No shared snippets yet",
  description,
}: EmptyShareType) => {
  const editorTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(editorTheme);

  return (
    <div
      className="flex flex-col items-center justify-center py-16 px-4 rounded-xl border-2 border-dashed"
      style={{
        borderColor: theme.border20,
        backgroundColor: `${theme.editorBackground}40`,
      }}
    >
      <div
        className="p-4 rounded-full mb-4"
        style={{ backgroundColor: `${theme.activeColor}10` }}
      >
        <Share2 size={32} style={{ color: theme.disabledTextColor }} />
      </div>
      <p
        className="text-base font-medium mb-1"
        style={{ color: theme.textColor }}
      >
        {title}
      </p>
      <p
        className="text-sm text-center"
        style={{ color: theme.disabledTextColor }}
      >
        {description}
      </p>
    </div>
  );
};

export default EmptyShare;
