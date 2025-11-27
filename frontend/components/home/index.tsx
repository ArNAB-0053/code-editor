import Compare from "../compare_guest_logged";
import Hero from "./hero";

const Home = () => {
  return (
    <div className="max-w-5xl place-self-center px-6 pb-10">
      <Hero />
      <div id="compare">
        <Compare />
      </div>
    </div>
  );
};

export default Home;
