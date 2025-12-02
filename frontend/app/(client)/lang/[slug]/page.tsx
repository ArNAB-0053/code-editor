"use client";
import EditorComponent from "@/components/editor/editor";
import { useParams } from "next/navigation";
import React from "react";

const Page = () => {
  const params = useParams();
  //   console.log(params?.slug);
  return (
    <div className="w-full">
      <EditorComponent p_lang={String(params?.slug).trim()} />
    </div>
  );
};

export default Page;
