"use client";
import { ReactElement, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { HomeIcon } from "lucide-react";
import { Breadcrumb } from "antd";
import { jetBrainsMono, lora, websiteFonts } from "@/fonts";
import { useSelector } from "react-redux";
import {
  selectEditorTheme,
  selectWebsiteFont,
} from "@/redux/slices/preferenceSlice";
import { WebsiteFontsKey } from "@/@types/font";
import { AiFillHome } from "react-icons/ai";
import { cn } from "@/lib/utils";
import { themeConfig } from "@/config/themeConfig";
import Link from "next/link";
import { FaFile } from "react-icons/fa";
import { MdChevronRight, MdFolder } from "react-icons/md";

type BreadcrumbsTypes = {
  title: string | ReactElement;
  href: string;
};

function toTitleCase(str: string) {
  return str.replace(
    /\w\S*/g,
    (text) => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
  );
}

const example = "john smith";
console.log(`"${example}" becomes "${toTitleCase(example)}"`);

const Breadcrumbs = () => {
  const router = usePathname();
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbsTypes[]>([]);
  const breadcrumbsRef = useRef<BreadcrumbsTypes[]>([]);

  const websiteFont = useSelector(selectWebsiteFont);
  const font = websiteFonts[websiteFont as WebsiteFontsKey];
  const editorTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(editorTheme);

  useEffect(() => {
    if (router) {
      const linkPath = router.split("/");
      linkPath.shift();

      const homeItems: BreadcrumbsTypes = {
        href: "/",
        title: <AiFillHome size={16} className="" />,
      };

      const temp = linkPath.map((path, i) => {
        return {
          title: path,
          href: "/" + linkPath.slice(0, i + 1).join("/"),
        };
      });

      const pathArray = [homeItems, ...temp];
      console.log(pathArray);

      breadcrumbsRef.current = pathArray;
      setBreadcrumbs(breadcrumbsRef.current);
    }
  }, [router]);

  if (!breadcrumbs) {
    return null;
  }

  const breadcrumbItems = breadcrumbs.map((item, index) => {
    const isLast = index === breadcrumbs.length - 1;
    const isFirst = index === 0;

    return {
      title: isLast ? (
        <span
          className={cn(
            "transition-colors",
            "text-white font-bold cursor-default flex items-center justify-center gap-x-1 px-2! rounded-md bg-white/15"
          )}
        >
          {item.href === "/files" && <MdFolder />}
          {typeof item.title === "string" ? item.title : item.title}
        </span>
      ) : (
        <Link
          href={item.href}
          className={cn(
            "transition-colors text-white/50! ",
            " hover:text-white! hover:bg-white/15! px-2! rounded-md flex! items-center! justify-center! gap-x-1!",
            isFirst ? "py-3! -translate-y-0.5" : ""
          )}
        >
          {item.href === "/files" && <MdFolder />}
          {typeof item.title === "string" ? item.title : item.title}
        </Link>
      ),
    };
  });

  return (
    <div
      className=" flex items-center mt-4 mb-5 "
      //   style={{
      //     background: `${theme.activeColor}20`,
      //   }}
    >
      <Breadcrumb
        items={breadcrumbItems}
        className={cn(jetBrainsMono?.className, "font-semibold")}
        separator={
          <span
            className="px-1 flex items-center justify-center translate-y-1"
            style={{
              color: theme.disabledTextColor,
            }}
          >
            <MdChevronRight />
          </span>
        }
      />
    </div>
  );
};

export default Breadcrumbs;
