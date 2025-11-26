import Compare from "../compare_guest_logged";
import Hero from "./hero";

const Home = () => {
  return (
    <>
      <Hero />
      <div id="compare">
        <Compare />
      </div>
    </>
  );
};

export default Home;
