import { IProfileDetails } from "@/@types/_base";
import Compare from "../compare_guest_logged";
import { AccountProps } from "../profile/avatar";
import Hero from "./hero";
import Features from "./features";
import { WhyExists } from "./WhyExists";
import FinalCTA from "./FinalCTA";

const Home = ({ profileDetails, isLoading }: AccountProps) => {
  return (
    <div className="w-screen overflow-hidden">
      <div className="lg:max-w-5xl lg:place-self-center px-6 pb-10 ">
        <Hero
          isLoading={isLoading}
          profileDetails={profileDetails as IProfileDetails}
        />
        <Features />
        <WhyExists />

        {/* 
          Comparison
          Testimonials (optional) 
      */}

        {/* <div id="compare">
          <Compare />
          </div> */}
      </div>

      <FinalCTA />

      <div className="lg:max-w-5xl lg:place-self-center px-6 pb-10 ">
        <div id="compare">
          <Compare />
        </div>
      </div>

      {/* footer */}
    </div>
  );
};

export default Home;
