import { themeConfig } from "@/config/themeConfig";
import { getDataUrls } from "@/helper/dataUrls";
import { selectEditorTheme } from "@/redux/slices/preferenceSlice";
import { ThemeTypes } from "@/@types/theme";
import { Tooltip } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { appUrls } from "@/config/navigation.config";
import { useDispatch } from "react-redux";
import { setLangRedux } from "@/redux/slices/editorSlice";

const StyledLink = styled(Link)<{ $theme: ThemeTypes; $isActive: boolean }>`
  &:hover {
    background: ${({ $theme, $isActive }) =>
      $isActive ? $theme.activeColor : $theme.hoverColor} !important;
  }
`;

const Sider = ({ p_lang }: { p_lang: string }) => {
  const editorTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(editorTheme);

  const dispatch = useDispatch();

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
            $isActive={p_lang === x.link}
            href={x.link}
            className="border p-2.5 text-center rounded-sm uppercase transition-all ease-linear duration-10"
            style={{
              backgroundColor:
                p_lang === x.link ? theme.activeColor : theme.border10,
              borderColor: theme.border20,
            }}
            onClick={() => {
              dispatch(setLangRedux(x.link));
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
