"use client";
import {
  CookieProviderForLocalStorage,
} from "@/providers/cookie";
import PageHeader from "@/components/editor/page-header";
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
          <main
            className="px-6 pt-4"
          >
            <PageHeader />
            <section className="w-full mt-4">
              {/* <Breadcrumbs /> */}
              {children}
            </section>
          </main>
        </WrapperRedux>
      </CookieProviderForLocalStorage>
    </ReduxPersistProvider>
  );
}
