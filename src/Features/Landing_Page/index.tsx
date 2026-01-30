import Features from "./Components/Features";
import Hero from "./Components/Hero";
import Ready from "./Components/Ready";
import Works from "./Components/Works";

const index = () => {
  return (
    <div className="mt-5">
      <div className="mt-40 max-sm:mt-30">
        <Hero />
      </div>
      <Features />
      <Works />
      <Ready />
    </div>
  );
};

export default index;
