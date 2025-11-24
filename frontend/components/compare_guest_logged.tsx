"use client";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { websiteFonts } from "@/fonts";
import { WebsiteFontsKey } from "@/@types/font";
import { useCookieItems } from "@/hooks/useItemFromCookie";
import NRACard from "./ui/no-redux/card";
import { NRCButton } from "./ui/no-redux";

const Compare = () => {
  const { theme, font } = useCookieItems();

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
      <p className={websiteFonts[font as WebsiteFontsKey]?.className}>{text}</p>
    </div>
  );

  return (
    <div
      className="flex justify-center gap-8 p-10"
      //   style={{ background: theme.outputBackground }}
    >
      {/* Guest Card */}
      <NRACard
        title="Continue as Guest"
        style={{
          background: "transparent",
          color: theme.textColor,
          border: `2px solid ${theme.border10}`,
          borderRadius: "12px",
        }}
      >
        <div
          className={`space-y-2 ${
            websiteFonts[font as WebsiteFontsKey]?.className
          }`}
        >
          {features.map((f, idx) => (
            <Feature key={idx} enabled={f.guest} text={f.text} />
          ))}
        </div>

        <div className="mt-8 flex items-center justify-center">
          <NRCButton
            variant="default"
            // hoverColor={theme.activeColor}
            hoverBgColor={`${theme.activeColor}d9`}
            className="border-2!"
            style={{ width: "100%" }}
          >
            Continue as Guest
          </NRCButton>
        </div>
      </NRACard>

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
            type="none"
            variant="bordered"
            hoverColor={theme.activeColor}
            hoverBgColor={`${theme.activeColor}20`}
            // variant=""
            className="border-2!"
            style={{ width: "100%" }}
          >
            Create Account
          </NRCButton>
        </div>
      </NRACard>
    </div>
  );
};

export default Compare;
