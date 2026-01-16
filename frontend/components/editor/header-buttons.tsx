import { websiteFonts } from "@/fonts";
import { selectWebsiteFont } from "@/redux/slices/preferenceSlice";
import { FaCheckCircle, FaPlay } from "react-icons/fa";
import { IoCopy } from "react-icons/io5";
import { useSelector } from "react-redux";
import { AButton } from "../ui/antd";
import { WebsiteFontsKey } from "@/@types/font";
import ATooltip from "../ui/antd/tooltip";
import { cn } from "@/lib/utils";
import { LuLoaderCircle } from "react-icons/lu";

// Clear Button
export const TransparentButton = ({
  onClick,
  loading,
}: {
  onClick: () => void;
  loading?: boolean;
}) => {
  const websiteFont = useSelector(selectWebsiteFont);
  const font = websiteFonts[websiteFont as WebsiteFontsKey];

  return (
    <AButton
      onClick={onClick}
      type="default"
      disabled={loading}
      className={`h-full! text-white/60! hover:text-white/90! font-medium! border-none! ${font?.className}`}
    >
      Clear
    </AButton>
  );
};

// Copy Button
export const CopyButton = ({
  onClick,
  isCopied,
}: {
  onClick: () => void;
  isCopied: boolean;
}) => {
  const websiteFont = useSelector(selectWebsiteFont);
  const font = websiteFonts[websiteFont as WebsiteFontsKey];

  return (
    // <AButton
    //   onClick={onClick}
    //   btntype="copy"
    //   className={`h-full! text-white! font-medium! border-none! ${font?.className}`}
    // >
    //   {isCopied ? (
    //     <span className="flex items-center justify-center gap-1 h-full">
    //       <FaCheckCircle className="text-green-500" />
    //       {/* Copied */}
    //     </span>
    //   ) : (
    //     <span className="flex items-center justify-center gap-1 h-full">
    //       <IoCopy />
    //       {/* Copy */}
    //     </span>
    //   )}
    // </AButton>
    <ATooltip title="Copy Code">
      <AButton
        onClick={onClick}
        btntype="copy"
        className={` text-white! p-0! aspect-square font-medium! border-none! ${font?.className}`}
      >
        {isCopied ? (
          <FaCheckCircle className="text-green-500" />
        ) : (
          <IoCopy className="opacity-80" size={16} />
        )}
      </AButton>
    </ATooltip>
  );
};

// Run Button
export const RunButton = ({
  onClick,
  loading,
  showTooltip = true,
  disabled,
}: {
  onClick: () => void;
  loading: boolean;
  showTooltip?: boolean;
  disabled?: boolean;
}) => {
  const websiteFont = useSelector(selectWebsiteFont);
  const font = websiteFonts[websiteFont as WebsiteFontsKey];

  const theBtn = () => (
    <AButton
      onClick={onClick}
      btntype="run"
      disabled={loading}
      className={cn(
        "font-semibold! tracking-[1.2px]! flex! items-center!  aspect-square p-0!",
        font?.className,
        disabled ? "bg-green-300/80! cursor-not-allowed!" : ""
      )}
    >
      {loading ? (
        <LuLoaderCircle className="animate-spin text-white " />
      ) : (
        <FaPlay />
      )}
    </AButton>
  );
  return showTooltip ? (
    <ATooltip title="Run Code" color="#00a63e60">
      {theBtn()}
    </ATooltip>
  ) : (
    theBtn()
  );
};
