"use client";
import { CompleteSignUpForm } from "@/components/auth/forms/complete-signup";
import ReduxPersistProvider from "@/providers/reduxPersistProvider";

const CompleteSignUp = () => {
  return (
    <div className="max-w-lg place-self-center w-full h-full pt-20">
      <ReduxPersistProvider>
        <CompleteSignUpForm />
      </ReduxPersistProvider>
    </div>
  );
};

export default CompleteSignUp;
