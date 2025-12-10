"use client";
import {
  CookieProviderForLocalStorage,
  // CookieProviderToSetPreferrenceToCookie,
} from "@/providers/cookie";
import PageHeader from "@/components/editor/page-header";
import ReduxPersistProvider from "@/providers/reduxPersistProvider";
import FontWrapperRedux from "@/providers/fontWrapperRedux";
import { usePathname } from "next/navigation";
import { appUrls } from "@/config/navigation.config";
import { cn } from "@/lib/utils";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isOnlyLang = pathname === appUrls.LANG.toLowerCase();

  return (
    <ReduxPersistProvider>
      <CookieProviderForLocalStorage>
        {/* <CookieProviderToSetPreferrenceToCookie /> */}
        <FontWrapperRedux>
          <main className={cn("px-6 pt-4", isOnlyLang ? "h-svh overflow-y-auto custom-scrollbar": "")}>
            <PageHeader />
            <section className="w-full mt-4">{children}</section>
          </main>
        </FontWrapperRedux>
      </CookieProviderForLocalStorage>
    </ReduxPersistProvider>
  );
}
