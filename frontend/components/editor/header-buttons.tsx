import { websiteFonts } from "@/fonts";
import { selectWebsiteFont } from "@/redux/slices/preferenceSlice";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaCheckCircle, FaPlay } from "react-icons/fa";
import { IoCopy } from "react-icons/io5";
import { useSelector } from "react-redux";
import { AButton } from "../ui/antd";
import { WebsiteFontsKey } from "@/@types/font";

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
      className={`h-full! text-white! font-medium! border-none! ${font?.className}`}
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
  );
};

// Run Button
export const RunButton = ({
  onClick,
  loading,
}: {
  onClick: () => void;
  loading: boolean;
}) => {
  const websiteFont = useSelector(selectWebsiteFont);
  const font = websiteFonts[websiteFont as WebsiteFontsKey];
  return (
    <AButton
      onClick={onClick}
      btntype="run"
      disabled={loading}
      className={`font-semibold! tracking-[1.2px]! flex! items-center! disabled:bg-green-300/80!  aspect-square p-0! ${font?.className}`}
    >
      {loading ? (
        <AiOutlineLoading3Quarters className="animate-spin" />
      ) : (
        <FaPlay />
      )}
    </AButton>
  );
};
