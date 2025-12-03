import Compare from "../compare_guest_logged";
import Profile from "../profile";
import Hero from "./hero";

const Home = () => {
  return (
    <div className="lg:max-w-5xl lg:place-self-center px-6 pb-10">
      <Hero />
      <div id="compare">
        <Compare />
      </div>
      <Profile/>
    </div>
  );
};

export default Home;
