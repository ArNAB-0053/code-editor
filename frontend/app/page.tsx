// FULL SERVER COMPONENT

import { IProfileDetails } from "@/@types/_base";
import Home from "@/components/home";
import Header from "@/components/home/header";
import { getCookiesServer } from "@/helper/server";
import { BACKEND_URI } from "@/lib/axios-instance";

export async function getMyProfile() {
  const token = await getCookiesServer("jwt");

  if(!token) return null;

  const res = await fetch(`${BACKEND_URI}/api/user/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    return null
  }

  return res.json();
}

const Page = async () => {
  const profileDetails = await getMyProfile();
  return (
    <div className="overflow-y-auto h-screen custom-scrollbar scroll-smooth relative  ">
      {/* <Link href="/python" >Gooo</Link> */}
      <Header
        isLoading={false}
        profileDetails={profileDetails as IProfileDetails}
      />
      <Home
        isLoading={false}
        profileDetails={profileDetails as IProfileDetails}
      />
    </div>
  );
};

export default Page;
