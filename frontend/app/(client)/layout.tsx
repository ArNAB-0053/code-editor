"use client";
import {
  CookieProviderForLocalStorage,
  // CookieProviderToSetPreferrenceToCookie,
} from "@/providers/cookie";
import PageHeader from "@/components/editor/page-header";
import ReduxPersistProvider from "@/providers/reduxPersistProvider";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReduxPersistProvider>
      <CookieProviderForLocalStorage>
        {/* <CookieProviderToSetPreferrenceToCookie /> */}
        <main className="px-6 pt-4 ">
          <PageHeader />
          <section className="w-full mt-4">
            {children}
          </section>
        </main>
      </CookieProviderForLocalStorage>
    </ReduxPersistProvider>
  );
}
