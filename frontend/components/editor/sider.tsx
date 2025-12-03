import { themeConfig } from "@/config/themeConfig";
import { getDataUrls } from "@/helper/dataUrls";
import { selectEditorTheme } from "@/redux/slices/preferenceSlice";
import { ThemeTypes } from "@/@types/theme";
import { Tooltip } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import styled from "styled-components";

const StyledLink = styled(Link)<{ $theme: ThemeTypes; $isActive: boolean }>`
  &:hover {
    background: ${({ $theme, $isActive }) =>
      $isActive ? $theme.activeColor : $theme.hoverColor} !important;
  }
`;

const Sider = () => {
  const editorTheme = useSelector(selectEditorTheme)
  const theme = themeConfig(editorTheme);

  // pathname
  const getPathname = usePathname();
  const trimmedPathname = getPathname.trim();
  const pathname = trimmedPathname.slice(1, trimmedPathname.length);

  const languageLogo = (lang: string) => {
    const uri = getDataUrls(lang);
    return (
      <img
        src={uri}
        alt={lang}
        width={110}
        height={110}
        className="rounded-sm grayscale-100 brightness-[400]"
      />
    );
  };

  const langs = [
    { link: "python", label: "Python", logo: languageLogo("python") },
    { link: "javascript", label: "JavaScript", logo: languageLogo("js") },
  ];

  return (
    <div
      className="w-16 bg-white/10 px-2 py-3 flex flex-col gap-y-3 border border-r-0 "
      style={{
        height: "calc(100vh - 75px)",
        background: theme?.outputBackground,
        borderColor: theme?.border,
      }}
    >
      {langs?.map((x, i) => (
        <Tooltip
          key={i}
          placement="right"
          title={x.label}
          color={theme.activeColor}
        >
          <StyledLink
            $theme={theme}
            $isActive={pathname === x.link}
            href={x.link}
            className="border p-2.5 text-center rounded-sm uppercase transition-all ease-linear duration-10"
            style={{
              background:
                pathname === x.link ? theme.activeColor : theme.border10,
                borderColor: theme.border20,
            }}
          >
            {x.logo}
          </StyledLink>
        </Tooltip>
      ))}
    </div>
  );
};

export default Sider;
