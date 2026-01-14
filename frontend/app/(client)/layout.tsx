"use client";
import { CookieProviderForLocalStorage } from "@/providers/cookie";
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
  const showHeader =
    pathname.includes(appUrls.CODE) || pathname.includes(appUrls.LANG);
  return (
    <ReduxPersistProvider>
      <CookieProviderForLocalStorage>
        {/* <CookieProviderToSetPreferrenceToCookie /> */}
        <WrapperRedux>
          <main className={cn(!showHeader ? "px-6 pt-4" : "", "h-full ")}>
            {!showHeader && <PageHeader />}
            <section className={cn(!showHeader ? "mt-4" : "", "w-full")}>
              {/* <Breadcrumbs /> */}
              {children}
            </section>
          </main>
        </WrapperRedux>
      </CookieProviderForLocalStorage>
    </ReduxPersistProvider>
  );
}
