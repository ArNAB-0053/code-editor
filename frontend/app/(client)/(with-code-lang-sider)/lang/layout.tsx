"use client";
import { LangSider } from "@/components/editor/sider";
import { useParams } from "next/navigation";
import React from "react";

const LangLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const params = useParams();
  const lang = params?.slug;
  return (
    <div className="flex h-full w-full">
      <LangSider p_lang={lang as string} />
      <section className="flex-1">{children}</section>
    </div>
  );
};

export default LangLayout;
