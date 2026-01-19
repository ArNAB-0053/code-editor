"use client";

import { NameObjType } from "@/@types/_base";
import { useGetProfileDetailsByUsername } from "@/services/profile";
import { useParams } from "next/navigation";
import { CDivider } from "../ui/custom";
import { ProfileDetails } from "./profile-page";
import { ContactDetails } from "./contact";
import FilesComponent from "./files";

export const Profile = () => {
  const params = useParams();
  const username = params?.username as string;
  const { data: profileDetails } = useGetProfileDetailsByUsername(username);

  return (
    <div
      style={{
        height: "calc(100svh - 60px)",
      }}
      className=""
    >
      <div className=" h-full relative max-w-[1240px] w-full place-self-center  flex flex-row-reverse py-2 ">
        <div className="flex flex-col w-80 px-4 py-10 max-md:hidden">
          <div>Profile</div>
          <CDivider />
          <div>Change Password</div>
        </div>

        {/* Divider */}
        <div className="w-px bg-white/40" />

        <div className="w-full h-full overflow-y-auto custom-scrollbar rounded-xl backdrop-blur-xl shadow-xl flex px-4 lg:px-6 xl:px-10 py-10 flex-col relative">
          <ProfileDetails
            firstName={profileDetails?.name?.firstName as string}
            middleName={profileDetails?.name?.middleName}
            lastName={profileDetails?.name?.lastName as string}
            name={profileDetails?.name as NameObjType}
            username={profileDetails?.username as string}
            email={profileDetails?.email as string}
          />

          <ContactDetails
            mobileNo={profileDetails?.mobileNo}
            email={profileDetails?.email as string}
          />

          <FilesComponent />
        </div>
      </div>
    </div>
  );
};

export * from "./profile-page";
