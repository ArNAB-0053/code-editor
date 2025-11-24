"use client";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import NRACard from "@/components/ui/no-redux/card";
import { useCookieItems } from "@/hooks/useItemFromCookie";
import { NRCButton } from "@/components/ui/no-redux";
import ACard from "@/components/ui/antd/card";
import {
  selectEditorFont,
  selectEditorTheme,
} from "@/redux/slices/preferenceSlice";
import { themeConfig } from "@/config/themeConfig";
import { useSelector } from "react-redux";
import { CButton } from "@/components/ui/custom";

const Page = () => {
  const editorTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(editorTheme);

  const font = useSelector(selectEditorFont);
  const features = [
    { text: "Database Support", guest: false, user: true },
    { text: "File Creation", guest: false, user: true },
    { text: "Multiple Code Saving", guest: false, user: true },
    { text: "Code Runner", guest: true, user: true },
    { text: "Terminal Support", guest: false, user: true },
    { text: "Theme Customization", guest: false, user: true },
    { text: "Cloud Sync", guest: false, user: true },
    { text: "Live Collaboration", guest: false, user: true },
    { text: "Export Code", guest: true, user: true },
  ];

  const Feature = ({ enabled, text }) => (
    <div className="flex items-center gap-4 text-sm py-1">
      {enabled ? (
        <CheckCircleOutlined style={{ color: "green" }} />
      ) : (
        <CloseCircleOutlined style={{ color: "red" }} />
      )}
      <span>{text}</span>
    </div>
  );

  return (
    <div className="flex justify-center gap-8 p-10">
      {/* Guest Card */}
      <ACard
        title="Continue as Guest"
        style={{
          background: "transparent",
          color: theme.textColor,
          border: `2px solid ${theme.border10}`,
          borderRadius: "12px",
        }}
      >
        <div className="space-y-2">
          {features.map((f, idx) => (
            <Feature key={idx} enabled={f.guest} text={f.text} />
          ))}
        </div>

        <div className="mt-8 flex items-center justify-center">
          <CB
            variant="bordered"
            className="border-2!"
            style={{ width: "100%" }}
          >
            Continue as Guest
          </CB>
        </div>
      </ACard>

      {/* Logged In Card */}
      <NRACard
        title="Create Account"
        style={{
          background: theme.editorBackground,
          color: theme.textColor,
          border: `2px solid ${theme.activeColor}50`,
          borderRadius: "12px",
        }}
      >
        <div className="space-y-2">
          {features.map((f, idx) => (
            <Feature key={idx} enabled={f.user} text={f.text} />
          ))}
        </div>

        <div className="mt-8 flex items-center justify-center">
          <NRCButton
            // variant=""
            // className="border-2!"
            style={{ width: "100%" }}
          >
            Create Account
          </NRCButton>
        </div>
      </NRACard>
    </div>
  );
};

export default Page;
