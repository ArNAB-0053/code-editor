"use client";
import MainEditor from "@/components/editor";
import { useParams } from "next/navigation";

const Page = () => {
  const params = useParams();
  return <MainEditor p_lang={String(params?.slug).trim()} />;
};

export default Page;
