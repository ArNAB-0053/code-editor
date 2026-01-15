"use client";
import { NRAForm, NRCButton } from "@/components/ui/no-redux";
import { zodToFormik } from "@/lib/formik-zod-adapter";
import { registerProSchema, RegisterProType } from "@/zod/auth.z";
import { Formik } from "formik";
import { FaUser } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { jetBrainsMono } from "@/fonts";
import { FaArrowRightLong } from "react-icons/fa6";
import { FormItemComponent } from ".";
import { useAuth } from "@/hooks/useAuth";
import { useSession } from "next-auth/react";
import { ProviderTypeEnum, ProviderTypeEnumString } from "@/@types/_enums";
import { IRegisterUsingProviderRequest } from "@/@types/auth";

export const CompleteSignUpForm = () => {
  const { data: session, status } = useSession();
  const { registerUserUsingProvider: registerUser } = useAuth();

  if (status === "loading") return <div>Loading</div>;

  const user = session?.user;

  const initialValues: RegisterProType = {
    username: user?.name as string,
    email: user?.email as string,
    provider: user?.provider ?? ProviderTypeEnumString.GITHUB,
    name: {
      firstName: "",
      middleName: "",
      lastName: "",
    },
    providerId: user?.providerId,
  };

  console.log("initialValues", initialValues);

  return (
    <Formik
      initialValues={initialValues}
      validate={zodToFormik(registerProSchema)}
      onSubmit={async (values, { setSubmitting }) => {
        await registerUser(values);
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
        isValid,
        validateForm,
      }) => {
        const disabled = 
          !values.username || 
          !values.name?.firstName || 
          !values.name?.lastName || 
          isSubmitting;

        return (
          <form 
            onSubmit={handleSubmit} 
            name="complete-sign-in-form" 
            className="px-0! w-full!"
          >
            <FormItemComponent
              name="username"
              value={values?.username}
              onChange={handleChange("username")}
              formItemChildren="Username"
              touched={touched?.username}
              onBlur={handleBlur("username")}
              errorText={errors?.username}
              placeholder="Enter Username"
              placeholderIcon={<FaUser size={12} />}
            />

            <FormItemComponent
              name="firstname"
              value={values.name?.firstName}
              onChange={handleChange("name.firstName")}
              formItemChildren="First Name"
              touched={touched?.name?.firstName}
              onBlur={handleBlur("name.firstName")}
              errorText={errors?.name?.firstName}
              placeholder="Enter First Name"
              placeholderIcon={<FaUser size={12} />}
            />

            <FormItemComponent
              name="middlename"
              value={values?.name?.middleName}
              onChange={handleChange("name.middleName")}
              formItemChildren="Middle Name (Optional)"
              touched={touched?.name?.middleName}
              onBlur={handleBlur("name.middleName")}
              errorText={errors?.name?.middleName}
              placeholder="Enter Middle Name"
              placeholderIcon={<FaUser size={12} />}
            />

            <FormItemComponent
              name="lastname"
              value={values.name?.lastName}
              onChange={handleChange("name.lastName")}
              formItemChildren="Last Name"
              touched={touched?.name?.lastName}
              onBlur={handleBlur("name.lastName")}
              errorText={errors?.name?.lastName}
              placeholder="Enter Last Name"
              placeholderIcon={<FaUser size={12} />}
            />

            <NRCButton
              disabled={disabled}
              onClick={handleSubmit}
              className={cn(
                "w-full! mt-8 flex items-center justify-center gap-x-3 disabled:opacity-40!",
                jetBrainsMono.className
              )}
            >
              {isSubmitting ? "Submitting..." : "Complete Sign Up"}
              <FaArrowRightLong />
            </NRCButton>
          </form>
        );
      }}
    </Formik>
  );
};