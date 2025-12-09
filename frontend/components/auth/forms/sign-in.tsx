"use client";
import { NRAForm, NRCButton } from "@/components/ui/no-redux";
import { zodToFormik } from "@/lib/formik-zod-adapter";
import { loginSchema } from "@/zod/auth.z";
import { Formik } from "formik";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { cn } from "@/lib/utils";
import { jetBrainsMono } from "@/fonts";
import { FaArrowRightLong } from "react-icons/fa6";
import { ContinueWithGoogle } from "./continue-with-btns";
import { FormItemComponent } from ".";
import { useAuth } from "@/hooks/useAuth";

export const SignInForm = () => {
  const initialValues = {
    identifier: "",
    password: "",
  };

  const { loginUser } = useAuth();

  return (
    <Formik
      initialValues={initialValues}
      validate={zodToFormik(loginSchema)}
      onSubmit={async (values, { setSubmitting }) => {
        await loginUser(values);
        setSubmitting(false);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleSubmit,
        isSubmitting,
        handleBlur,
      }) => {
        const disabled = !values.identifier || !values.password || isSubmitting;

        return (
          <NRAForm name="sign-in-form" className="px-0! w-full! ">
            <FormItemComponent
              name="identifier"
              value={values.identifier}
              onChange={handleChange("identifier")}
              formItemChildren="Email or Username"
              touched={touched?.identifier}
              onBlur={handleBlur("identifier")}
              errorText={errors?.identifier}
              placeholder="Enter Email / Username"
              placeholderIcon={<MdEmail size={12} />}
            />

            <FormItemComponent
              name="password"
              value={values.password}
              onChange={handleChange("password")}
              formItemChildren="Password"
              touched={touched?.password}
              onBlur={handleBlur("password")}
              errorText={errors?.password}
              placeholder="Enter Password"
              placeholderIcon={<FaLock size={12} />}
            />

            {/* <StyledCheckbox
              $theme={theme}
              indeterminate={check}
              onChange={(e) => setCheck(e.target.checked)}
              className={cn(
                "text-white/90! mt-3! text-sm!",
                spaceGrotesk.className
              )}
            >
              I agree with Terms & Conditions
            </StyledCheckbox> */}

            <NRCButton
              disabled={disabled}
              onClick={handleSubmit}
              className={cn(
                "w-full! mt-8 flex items-center justify-center gap-x-3 disabled:opacity-40! ",
                jetBrainsMono.className
              )}
            >
              {isSubmitting ? "Submitting..." : "Login"}
              <FaArrowRightLong />
            </NRCButton>

            <div className="my-12 text-center flex items-center justify-center relative">
              <div className="h-px w-full bg-white opacity-30" />
              <span className="absolute left-1/2 top-1/2 text-white -translate-x-1/2 -translate-y-1/2 bg-black px-5 opacity-90 ">
                Or
              </span>
            </div>

            <ContinueWithGoogle />
          </NRAForm>
        );
      }}
    </Formik>
  );
};
