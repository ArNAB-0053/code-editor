import { themeConfig } from "@/config/themeConfig";
import { cn } from "@/lib/utils";
import { selectEditorTheme } from "@/redux/slices/preferenceSlice";
import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { CDivider } from "../ui/custom";
import { AInput, ASelect, CFormLabel } from "../ui/antd";

interface AInputWithLabelProps {
  label: string;
  value: string;
  disabled?: boolean;
  onChange?: any;
  placeholder?: string;
  rootClassName?: string;
}
interface ASelectWithLabelProps {
  options: any;
  label: string;
  value: string;
  disabled?: boolean;
  onChange?: any;
  placeholder?: string;
  rootClassName?: string;
  selectClassName?: string;
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

export const AInputWithLabel = ({
  value,
  label,
  disabled,
  onChange,
  placeholder,
  rootClassName,
}: AInputWithLabelProps) => {
  const editorTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(editorTheme);
  return (
    <div className={cn("flex flex-col gap-y-2 w-full!", rootClassName)}>
      <CFormLabel className="translate-x-0.5!">{label}</CFormLabel>
      <div className="relative">
        <AInput
          value={value}
          disabled={disabled}
          className={cn(disabled ? "opacity-50! blur-[0.2px]" : "")}
          onChange={onChange}
          placeholder={placeholder}
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

export const ASelectWithLabel = ({
  value,
  label,
  disabled,
  onChange,
  options,
  placeholder,
  rootClassName,
  selectClassName,
}: ASelectWithLabelProps) => {
  const editorTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(editorTheme);
  return (
    <div className={cn("flex flex-col gap-y-2 w-full!", rootClassName)}>
      <CFormLabel className="translate-x-0.5!">{label}</CFormLabel>
      <div className="relative">
        <ASelect
          value={value}
          onChange={onChange}
          options={options}
          placeholder={placeholder}
          className={cn(
            "w-full! rounded-md! backdrop-blur-2xl!",
            selectClassName
          )}
          optionBorderRadius="6px"
          dropdownRadius="8px"
          dropdownStyle={{
            backdropFilter: "blur(80px)",
          }}
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
