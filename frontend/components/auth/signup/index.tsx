"use client";
import LeftSide from "./left-side";
import RightSide from "./right-side";

const SignUp = () => {
  return (
    <div className="grid grid-cols-2">
      <LeftSide/>
      <RightSide/>      
    </div>
  );
};

export default SignUp;
