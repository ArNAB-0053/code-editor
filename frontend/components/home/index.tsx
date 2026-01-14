import { IProfileDetails } from "@/@types/_base";
import Compare from "../compare_guest_logged";
import Profile from "../profile";
import { AccountProps } from "../profile/avatar";
import Hero from "./hero";

const Home = ({ profileDetails, isLoading }: AccountProps) => {
  return (
    <div className="lg:max-w-5xl lg:place-self-center px-6 pb-10">
      <Hero isLoading={isLoading} profileDetails={profileDetails as IProfileDetails}/>
      <div id="compare">
        <Compare />
      </div>
      <Profile/>
    </div>
  );
};

export default Home;
