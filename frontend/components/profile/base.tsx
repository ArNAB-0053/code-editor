import { themeConfig } from "@/config/themeConfig";
import { cn } from "@/lib/utils";
import { selectEditorTheme } from "@/redux/slices/preferenceSlice";
import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { CDivider } from "../ui/custom";
import { AInput, CFormLabel } from "../ui/antd";

interface AInputWithLabelProps {
  label: string;
  value: string;
  disabled?: boolean;
}

export const Description = ({ children }: { children: ReactNode }) => {
  const editorTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(editorTheme);
  return (
    <p
      className="text-sm mt-4"
      style={{
        color: theme.disabledTextColor,
      }}
    >
      {children}
    </p>
  );
};

export const Heading = ({
  children,
  className,
  dividerClassName,
  headerClassName,
}: {
  children: ReactNode;
  className?: string;
  dividerClassName?: string;
  headerClassName?: string;
}) => {
  const editorTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(editorTheme);
  return (
    <div className={cn("flex flex-col", className)}>
      <h1
        className={cn("text-sm mt-4", headerClassName)}
        style={{
          color: theme.textColor,
        }}
      >
        {children}
      </h1>
      <CDivider className={cn("mb-0! my-2!", dividerClassName)} />
    </div>
  );
};

export const AInputWithLabel = ({ value, label, disabled }: AInputWithLabelProps) => {
  const editorTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(editorTheme);
  return (
    <div className="flex flex-col gap-y-2 w-full!">
      <CFormLabel className="translate-x-0.5!">{label}</CFormLabel>
      <div className="relative">
        <AInput
          value={value}
          disabled={disabled}
          className={cn(disabled ? "opacity-50! blur-[0.2px]" : "")}
        />

        {disabled && (
          <div
            className="w-full h-full absolute left-0 top-0 rounded-md"
            style={{
              backgroundColor: theme.border10,
            }}
          />
        )}
      </div>
    </div>
  );
};