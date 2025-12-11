"use client";
import LeftSide from "./left-side";
import RightSide from "./right-side";

const SignUp = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 bg-black">
      <LeftSide/>
      <RightSide/>      
    </div>
  );
};

export default SignUp;
