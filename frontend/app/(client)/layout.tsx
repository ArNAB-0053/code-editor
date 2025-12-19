"use client";
import {
  CookieProviderForLocalStorage,
  // CookieProviderToSetPreferrenceToCookie,
} from "@/providers/cookie";
import PageHeader from "@/components/editor/page-header";
import ReduxPersistProvider from "@/providers/reduxPersistProvider";
import { WrapperRedux } from "@/providers/WrapperRedux";
import { usePathname } from "next/navigation";
import { appUrls } from "@/config/navigation.config";
import { cn } from "@/lib/utils";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const allowScroll = pathname === appUrls.LANG.toLowerCase() || appUrls.FILE.toLocaleLowerCase();

  return (
    <ReduxPersistProvider>
      <CookieProviderForLocalStorage>
        {/* <CookieProviderToSetPreferrenceToCookie /> */}
        <WrapperRedux>
          <main
            className={cn(
              "px-6 pt-4",
              allowScroll ? "h-svh overflow-y-auto custom-scrollbar" : ""
            )}
          >
            <PageHeader />
            <section className="w-full mt-4">{children}</section>
          </main>
        </WrapperRedux>
      </CookieProviderForLocalStorage>
    </ReduxPersistProvider>
  );
}
