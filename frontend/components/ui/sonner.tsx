"use client";

import { FaCheckCircle, FaInfoCircle } from "react-icons/fa";
import { MdError } from "react-icons/md";
import { TiWarning } from "react-icons/ti";
import { LuLoader } from "react-icons/lu";
import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      icons={{
        success: <FaCheckCircle className="size-4" />,
        info: <FaInfoCircle className="size-4" />,
        warning: <TiWarning className="size-4" />,
        error: <MdError className="size-4" />,
        loading: <LuLoader className="size-4 animate-spin" />,
      }}
      richColors
      {...props}
    />
  );
};

export { Toaster };
