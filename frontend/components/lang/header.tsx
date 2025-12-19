"use client";
import { themeConfig } from "@/config/themeConfig";
import { selectEditorTheme } from "@/redux/slices/preferenceSlice";
import { Code } from "lucide-react";
import { useSelector } from "react-redux";

export const HeaderLangTitle = ({ title }: { title: string }) => {
  const editorTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(editorTheme);

  return (
    <div className="mb-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div
          className="p-2 rounded-lg"
          style={{
            background: `${theme.activeColor}15`,
            borderColor: `${theme.activeColor}30`,
            borderWidth: "1px",
          }}
        >
          <Code
            size={20}
            style={{ color: theme.activeColor }}
            strokeWidth={2.5}
          />
        </div>
        <div>
          <h3
            className="text-lg font-semibold"
            style={{ color: theme.textColor }}
          >
            {title}
          </h3>
          <p
            className="text-xs -mt-0.5"
            style={{ color: theme.disabledTextColor }}
          >
            Choose the programming language for this editor.
          </p>
        </div>
      </div>
    </div>
  );
};