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
import { useDebounce } from "@/hooks/useDebounce";
import { useState } from "react";
import { useGetUsernameAvailability } from "@/services/auth";
import { messagesConfig } from "@/config/messages.config";
import EditorLoader from "@/components/Loaders/editor";
import { AnimatePresence, motion } from "motion/react";

export const CompleteSignUpForm = () => {
  const { data: session, status } = useSession();
  const { registerUserUsingProvider: registerUser } = useAuth();

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

  const [username, setUsername] = useState(user?.name);
  const debouncedUsername = useDebounce(username, 1000);

  const { data: usernameAvailability, isLoading: isUsernameChecking } =
    useGetUsernameAvailability(debouncedUsername);

  if (status === "loading") return <EditorLoader />;

  return (
    <Formik
      initialValues={initialValues}
      validate={zodToFormik(registerProSchema)}
      enableReinitialize
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
      }) => {
        const disabled =
          !usernameAvailability?.available ||
          !values.username ||
          !values.name?.firstName ||
          !values.name?.lastName ||
          isSubmitting;

        return (
          <NRAForm
            onFinish={handleSubmit}
            name="complete-sign-in-form"
            className="px-0! w-full!"
          >
            <FormItemComponent
              name="username"
              value={values.username}
              onChange={(e) => {
                setUsername(e.target.value);
                handleChange("username")(e);
              }}
              onBlur={handleBlur("username")}
              formItemChildren="Username"
              loading={isUsernameChecking}
              errorText={errors?.username}
              placeholder="Enter Username"
              placeholderIcon={<FaUser size={12} />}
              rootClassName="my-0!"
            />
            <AnimatePresence mode="wait">
              <motion.div
                key={`availability-${usernameAvailability?.available}`}
                layout
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className={cn(
                  "py-1 px-2 text-center rounded-sm text-[10px] w-full -translate-y-2 ",
                  usernameAvailability?.available
                    ? "text-[#00ff6a] bg-[#00ff6a]/25"
                    : "text-[#ff0000] bg-[#ff0000]/25",
                  jetBrainsMono.className
                )}
              >
                <p className="truncate">
                  {usernameAvailability?.available
                    ? messagesConfig.AVAILABILITY_CHECKS.USERNAME.TRUE
                    : messagesConfig.AVAILABILITY_CHECKS.USERNAME.FALSE}
                </p>
              </motion.div>
            </AnimatePresence>

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
              rootClassName="my-0!"
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
              rootClassName="my-0!"
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
              rootClassName="my-0!"
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
          </NRAForm>
        );
      }}
    </Formik>
  );
};
