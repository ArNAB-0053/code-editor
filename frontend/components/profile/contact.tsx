import { themeConfig } from "@/config/themeConfig";
import { selectEditorTheme } from "@/redux/slices/preferenceSlice";
import React, { memo } from "react";
import { FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useSelector } from "react-redux";
import { Heading } from "./base";

interface ContactDetailsProps {
  mobileNo?: string;
  email: string;
}

const ContactDetailsComponent = ({ mobileNo, email }: ContactDetailsProps) => {
  const editorTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(editorTheme);
  return (
    <>
      <Heading className="mt-3">Contact Details</Heading>
      <div className="grid grid-cols-3">
        <div className="w-full mt-3 flex items-center justify-between gap-x-2">
          <div
            className="h-8 w-8 flex items-center justify-center aspect-square rounded-xl "
            style={{
              background: theme.border15,
            }}
          >
            <MdEmail />
          </div>
          <div className="flex-1 w-full translate-y-0.5">
            <p
              className="text-xs font-semibold"
              style={{
                color: theme.disabledTextColor,
              }}
            >
              Email
            </p>
            <h3
              className="text-sm font-normal -translate-y-0.5"
              style={{
                color: theme.textColor,
              }}
            >
              {email}
            </h3>
          </div>
        </div>

        <div className="w-full mt-3 flex items-center justify-between gap-x-2">
          <div
            className="h-8 w-8 flex items-center justify-center aspect-square rounded-xl "
            style={{
              background: theme.border15,
            }}
          >
            <FaPhone />
          </div>
          <div className="flex-1 w-full translate-y-0.5">
            <p
              className="text-xs font-semibold"
              style={{
                color: theme.disabledTextColor,
              }}
            >
              Phone
            </p>
            <h3
              className="text-sm font-normal -translate-y-0.5"
              style={{
                color: theme.textColor,
              }}
            >
              {mobileNo ?? "Not added yet"}
            </h3>
          </div>
        </div>
      </div>
    </>
  );
};

export const ContactDetails = memo(
  ContactDetailsComponent,
  (prev, next) => prev.email === next.email && prev.mobileNo == next.mobileNo
);
