"use client";
import { CookieProviderForLocalStorage } from "@/providers/cookie";
import ReduxPersistProvider from "@/providers/reduxPersistProvider";
import { WrapperRedux } from "@/providers/WrapperRedux";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReduxPersistProvider>
      <CookieProviderForLocalStorage>
        {/* <CookieProviderToSetPreferrenceToCookie /> */}
        <WrapperRedux>
          {/* <Breadcrumbs /> */}
          {children}
        </WrapperRedux>
      </CookieProviderForLocalStorage>
    </ReduxPersistProvider>
  );
}
