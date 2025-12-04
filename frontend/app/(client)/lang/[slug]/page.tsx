"use client";
import MainEditor from "@/components/editor";
import { useParams } from "next/navigation";

const Page = () => {
  const params = useParams();
  //   console.log(params?.slug);
  return (
    <div className="w-full">
      <MainEditor p_lang={String(params?.slug).trim()} />
    </div>
  );
};

export default Page;
