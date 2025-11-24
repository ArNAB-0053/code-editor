"use client";
import Header from "@/components/header";
import { Provider } from "react-redux";
import { persistor, store } from "@/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { CookieProviderForLocalStorage } from "@/providers/cookie";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Header />
        <CookieProviderForLocalStorage>
          {children}
        </CookieProviderForLocalStorage>
      </PersistGate>
    </Provider>
  );
}
