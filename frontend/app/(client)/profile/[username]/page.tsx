"use client";
import PageHeader from "@/components/editor/page-header";
import { Profile } from "@/components/profile";

const page = () => {
  return (
    <>
      <div className="max-w-[1240px] place-self-center w-full pt-6 pb-0 px-4 lg:px-6 xl:px-10">
        <PageHeader />
      </div>
      <Profile />
    </>
  );
};

export default page;
