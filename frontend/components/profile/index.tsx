"use client";
import { useMyProfile } from "@/services/profile";

const Profile = () => {
  const { data: profileDetails } = useMyProfile();

  return (
    <div className="w-[800px] overflow-x-hidden text-wrap overflow-y-auto">
      {JSON.stringify(profileDetails)}
    </div>
  );
};

export default Profile;
