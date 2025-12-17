import { themeConfig } from "@/config/themeConfig";
import { cn } from "@/lib/utils";
import { selectEditorTheme } from "@/redux/slices/preferenceSlice";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { useSelector } from "react-redux";

const ViewButton = ({
  sharedId,
  variant = "button",
}: {
  sharedId: string;
  variant?: "link" | "button";
}) => {
  const editorTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(editorTheme);

  return (
    <Link
      href={`/lang/${sharedId}`}
      className={cn(
        "group/btn flex items-center justify-center gap-1.5  text-xs font-medium transition-all duration-200",
        variant === "button" ? "rounded-lg px-4 py-2" : "underline-offset-4"
      )}
      style={{
        color: variant === "button" ? theme.textColor : theme.activeColor,
        backgroundColor:
          variant === "button" ? theme.activeColor : "transparent",
        textDecorationLine: variant === "button" ? "none" : "underline",
      }}
    >
      View
      <ExternalLink
        size={12}
        className="transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
      />
    </Link>
  );
};

export default ViewButton;
