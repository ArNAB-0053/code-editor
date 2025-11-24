import { useState } from "react";
import { useCookieFont, useCookieTheme } from "@/hooks/useItemFromCookie";
import {
  NRCButton,
  NRAModal,
  NRAInput,
  NRAForm,
  NRAFormItem,
} from "../ui/no-redux";
import { NRCAvatar } from "../ui/no-redux";
import NRASelect from "../ui/no-redux/select";
import { WebsiteFontsKey } from "@/@types/font";
import { websiteFonts } from "@/fonts";
import { getFontLabel } from "@/helper/font-style";

const Hero = () => {
  const [open, setOpen] = useState(false);
  const { theme } = useCookieTheme();
  const { font, cookieFont, updateFont } = useCookieFont();

  // console.log(font);
  // console.log(cookieFont);

  // console.log(font);

  const handleChange = (value: WebsiteFontsKey) => {
    updateFont(value);
  };

  const fontOptions = Object.entries(websiteFonts).map(([key]) => ({
    value: key,
    label: getFontLabel(key),
  }));

  return (
    <div
      style={{
        background: theme.editorBackground,
      }}
      className={font.className}
    >
      <NRCButton
        // btntype="sameBg"
        onClick={() => setOpen(true)}
        // type="text"
        variant="transparent"
        style={{
          color: theme.activeColor,
          // border: `2px solid ${theme.activeColor}`,
        }}
        className="flex h-8! pl-1! pr-3! items-center text-xs! gap-2 rounded-3xl! cursor-pointer"
      >
        Continue as Guest
      </NRCButton>

      <NRAModal
        title="Continue as Guest"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        // footer={false}
        style={{
          width: "50vh",
        }}
        className="overflow-hidden"
      >
        <NRAForm layout="vertical" className="">
          <div className="flex items-start justify-between w-full gap-x-6 mt-8 ">
            <NRCAvatar theme={theme} name="Guest" />
            <NRAFormItem
              label="Name"
              required
              tooltip="This is a required field"
              className="flex-1"
            >
              <NRAInput placeholder="input placeholder" value="Guest" />
            </NRAFormItem>
          </div>

          <NRAFormItem
            label="Default font"
            required
            tooltip="This is a required field"
          >
            <NRASelect
              value={cookieFont}
              style={{ width: 250 }}
              onChange={handleChange}
              options={fontOptions}
            />
          </NRAFormItem>
        </NRAForm>
      </NRAModal>
    </div>
  );
};

export default Hero;
