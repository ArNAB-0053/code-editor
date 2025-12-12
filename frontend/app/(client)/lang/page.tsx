import Lang from "@/components/lang";
import ShareByMe from "@/components/lang/share-by-me";
import ShareToMe from "@/components/lang/share-to-me";
import React from "react";

const page = () => {
  return (
    <div className="pb-20 mt-10 lg:px-8 lg-pt-8 ">
      <Lang />
      <ShareToMe/>
      <ShareByMe/>
    </div>
  );
};

export default page;
