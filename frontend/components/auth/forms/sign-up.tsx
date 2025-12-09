"use client";
import { NRAForm, NRCButton } from "@/components/ui/no-redux";
import { themeConfig } from "@/config/themeConfig";
import { useTheme } from "@/context/ThemeContext";
import { zodToFormik } from "@/lib/formik-zod-adapter";
import {
  useGetEmailAvailability,
  useGetUsernameAvailability,
} from "@/services/auth";
import { RegisterFormType, registerSchema } from "@/zod/auth.z";
import { Formik } from "formik";
import { FaExternalLinkAlt, FaLock, FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { cn } from "@/lib/utils";
import { jetBrainsMono, spaceGrotesk } from "@/fonts";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { Checkbox } from "antd";
import styled, { createGlobalStyle } from "styled-components";
import { ThemeTypes } from "@/@types/theme";
import { useState } from "react";
import { messagesConfig } from "@/config/messages.config";
import { motion, AnimatePresence } from "framer-motion";
import { useDebounce } from "@/hooks/useDebounce";
import { FormItemComponent } from ".";
import { ContinueWithGoogle } from "./continue-with-btns";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { appUrls } from "@/config/navigation.config";
import { IRegister } from "@/@types/auth";

const StyledCheckbox = styled(Checkbox)<{ $theme: ThemeTypes }>`
  .ant-checkbox-indeterminate,
  .ant-checkbox-inner {
    background: ${({ $theme }) => $theme?.activeColor}40 !important;
    border: transparent !important;
    padding: 2px;
  }
  .ant-checkbox-inner:after {
    background: ${({ $theme }) => $theme?.activeColor} !important;
  }
`;

const ProgressDotsStyle = createGlobalStyle<{ $theme: ThemeTypes }>`
  .progress-dot {
    transition: all 0.3s ease-in-out;
  }
  
  .progress-dot-active {
    background-color: ${({ $theme }) => $theme?.activeColor} !important;
  }
  
  .progress-dot-completed {
    background-color: ${({ $theme }) => $theme?.activeColor}80 !important;
  }
  
  .progress-dot-inactive {
    background-color: rgba(255, 255, 255, 0.2) !important;
  }
`;

interface StepConfig {
  fields: string[];
  title: string;
}

const steps: StepConfig[] = [
  {
    fields: ["username", "email"],
    title: "Account Information",
  },
  {
    fields: ["name.firstname", "name.middlename", "name.lastname"],
    title: "Personal Details",
  },
  {
    fields: ["password", "confirmPassword"],
    title: "Security",
  },
];

export const SignUpForm = () => {
  const { themeName } = useTheme();
  const theme = themeConfig(themeName);

  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [check, setCheck] = useState(false);

  const { registerUser } = useAuth();

  const get = (obj: any, path: string) =>
    path.split(".").reduce((o, i) => (o ? o[i] : undefined), obj);

  const isStepValid = (values: any, errors: any, step: number) => {
    const fields = steps[step].fields;
    const hasValues = fields.every((path) => get(values, path));
    const hasNoErrors = fields.every((path) => !get(errors, path));
    return hasValues && hasNoErrors;
  };

  const goToStep = (newStep: number, values: any, errors: any) => {
    if (newStep > currentStep && !isStepValid(values, errors, currentStep)) {
      return;
    }
    setDirection(newStep > currentStep ? 1 : -1);
    setCurrentStep(newStep);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  const initialValues = {
    name: {
      firstname: "",
      middlename: "",
      lastname: "",
    },
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  };

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [blurredFields, setBlurredFields] = useState<Set<string>>(new Set());

  const [initialUsername, setInitialUsername] = useState(true);
  const [initialEmail, setInitialEmail] = useState(true);
  const [initialPassword, setInitialPassword] = useState(true);
  const [initialConfirmPassword, setInitialConfirmPassword] = useState(true);

  const debouncedUsername = useDebounce(username, 1000);
  const debouncedEmail = useDebounce(email, 1000);

  const { data: usernameAvailability, isLoading: isUsernameChecking } =
    useGetUsernameAvailability(debouncedUsername);
  const { data: emailAvailability, isLoading: isEmailChecking } =
    useGetEmailAvailability(debouncedEmail);

  const shouldShowError = (fieldName: string) => {
    return focusedField === fieldName || blurredFields.has(fieldName);
  };

  //   console.log("============== > ", {
  //     focusedField: focusedField,
  //     blurredFields: blurredFields,
  //     shouldShowError: shouldShowError,
  //   });

  return (
    <Formik
      initialValues={initialValues}
      validate={zodToFormik(registerSchema)}
      validateOnChange
      onSubmit={async (values, { setSubmitting }) => {
        await registerUser(values);
        setSubmitting(false);
      }}
    >
      {({
        values,
        errors,
        handleChange,
        handleSubmit,
        touched,
        isSubmitting,
        handleBlur,
      }) => {
        const currentStepValid = isStepValid(values, errors, currentStep);

        const isLastStep = currentStep === steps.length - 1;

        return (
          <NRAForm
            name="sign-up-form"
            className="px-0! w-full! overflow-hidden! "
          >
            <ProgressDotsStyle $theme={theme} />

            {/* Progress Dots */}
            <div className="flex gap-2 justify-center mb-8 pt-8">
              {steps.map((_, idx) => (
                <motion.div
                  key={idx}
                  className={cn(
                    "h-1.5 rounded-full progress-dot cursor-pointer",
                    idx === currentStep && "progress-dot-active",
                    idx < currentStep && "progress-dot-completed",
                    idx > currentStep && "progress-dot-inactive"
                  )}
                  animate={{
                    width: idx === currentStep ? 60 : 8,
                  }}
                  transition={{ duration: 0.3 }}
                  onClick={() => goToStep(idx, values, errors)}
                />
              ))}
            </div>

            <div className="min-h-[200px]">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentStep}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={
                    currentStep === 0
                      ? { duration: 0, ease: "easeInOut" }
                      : { duration: 0.3, ease: "easeInOut" }
                  }
                >
                  {/* Step 1: Email/Username */}
                  {currentStep === 0 && (
                    <>
                      <FormItemComponent
                        name="username"
                        value={values.username}
                        onChange={(e) => {
                          setUsername(e.target.value);
                          setInitialUsername(false);
                          handleChange("username")(e);
                        }}
                        onFocus={() => setFocusedField("username")}
                        onBlur={(e) => {
                          setBlurredFields((prev) =>
                            new Set(prev).add("username")
                          );
                          setFocusedField(null);
                          handleBlur("username")(e);
                        }}
                        formItemChildren="Username"
                        enableTouch={false}
                        showError={
                          !initialUsername && shouldShowError("username")
                        }
                        showAvailabilityCheckMsg={
                          debouncedUsername.length >= 3 &&
                          !errors.username &&
                          shouldShowError("username")
                        }
                        isAvailable={usernameAvailability?.available}
                        availabilityMessage={
                          usernameAvailability?.available
                            ? messagesConfig.AVAILABILITY_CHECKS.USERNAME.TRUE
                            : messagesConfig.AVAILABILITY_CHECKS.USERNAME.FALSE
                        }
                        loading={isUsernameChecking}
                        errorText={errors?.username}
                        placeholder="Enter Username"
                        placeholderIcon={<FaUser size={12} />}
                      />
                      <FormItemComponent
                        name="email"
                        value={values.email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setInitialEmail(false);
                          handleChange("email")(e);
                        }}
                        onFocus={() => setFocusedField("email")}
                        onBlur={(e) => {
                          setBlurredFields((prev) =>
                            new Set(prev).add("email")
                          );
                          setFocusedField(null);
                          handleBlur("email")(e);
                        }}
                        formItemChildren="Email"
                        enableTouch={false}
                        showError={!initialEmail && shouldShowError("email")}
                        errorText={errors?.email}
                        showAvailabilityCheckMsg={
                          debouncedEmail.length >= 1 &&
                          !errors.email &&
                          shouldShowError("email")
                        }
                        isAvailable={emailAvailability?.available}
                        availabilityMessage={
                          emailAvailability?.available
                            ? messagesConfig.AVAILABILITY_CHECKS.EMAIL.TRUE
                            : messagesConfig.AVAILABILITY_CHECKS.EMAIL.FALSE
                        }
                        loading={isEmailChecking}
                        placeholder="Enter Email"
                        placeholderIcon={<MdEmail size={12} />}
                      />
                    </>
                  )}

                  {/* Step 2: Personal Details */}
                  {currentStep === 1 && (
                    <>
                      <FormItemComponent
                        name="firstname"
                        value={values.name.firstname}
                        onChange={handleChange("name.firstname")}
                        formItemChildren="First Name"
                        touched={touched?.name?.firstname}
                        onBlur={handleBlur("name.firstname")}
                        errorText={errors?.name?.firstname}
                        placeholder="Enter First Name"
                        placeholderIcon={<FaUser size={12} />}
                      />
                      <FormItemComponent
                        name="middlename"
                        value={values?.name?.middlename}
                        onChange={handleChange("name.middlename")}
                        formItemChildren="Middle Name"
                        touched={touched?.name?.middlename}
                        onBlur={handleBlur("name.middlename")}
                        errorText={errors?.name?.middlename}
                        placeholder="Enter Middle Name"
                        placeholderIcon={<FaUser size={12} />}
                      />
                      <FormItemComponent
                        name="lastname"
                        value={values.name?.lastname}
                        onChange={handleChange("name.lastname")}
                        formItemChildren="Last Name"
                        touched={touched?.name?.lastname}
                        onBlur={handleBlur("name.lastname")}
                        errorText={errors?.name?.lastname}
                        placeholder="Enter Last Name"
                        placeholderIcon={<FaUser size={12} />}
                      />
                    </>
                  )}

                  {/* Step 3: Password */}
                  {currentStep === 2 && (
                    <>
                      <FormItemComponent
                        name="password"
                        type="password"
                        value={values.password}
                        onChange={(e) => {
                          setInitialPassword(false);
                          handleChange("password")(e);
                        }}
                        formItemChildren="Password"
                        enableTouch={false}
                        onFocus={() => setFocusedField("password")}
                        onBlur={(e) => {
                          setBlurredFields((prev) =>
                            new Set(prev).add("password")
                          );
                          setFocusedField(null);
                          handleBlur("password")(e);
                        }}
                        showError={
                          !initialPassword && shouldShowError("password")
                        }
                        errorText={errors?.password}
                        placeholder="Enter Password"
                        placeholderIcon={<FaLock size={12} />}
                      />
                      <FormItemComponent
                        name="confirmPassword"
                        type="password"
                        value={values.confirmPassword}
                        onChange={(e) => {
                          setInitialConfirmPassword(false);
                          handleChange("confirmPassword")(e);
                        }}
                        formItemChildren="Confirm Password"
                        enableTouch={false}
                        onFocus={() => setFocusedField("confirmPassword")}
                        onBlur={(e) => {
                          setBlurredFields((prev) =>
                            new Set(prev).add("confirmPassword")
                          );
                          setFocusedField(null);
                          handleBlur("confirmPassword")(e);
                        }}
                        errorText={errors?.confirmPassword}
                        showError={
                          !initialConfirmPassword &&
                          shouldShowError("confirmPassword")
                        }
                        placeholder="Confirm Password"
                        placeholderIcon={<FaLock size={12} />}
                      />

                      <StyledCheckbox
                        $theme={theme}
                        indeterminate={check}
                        onChange={(e) => setCheck(e.target.checked)}
                        className={cn(
                          "text-white/90! mt-3! text-sm! w-full!",
                          spaceGrotesk.className
                        )}
                      >
                        <div className="w-full flex items-center gap-x-1">
                          I agree with
                          <Link
                            href={`${appUrls.TERMS_AND_CONDOTIONS}`}
                            target="_blank"
                            className={cn(
                              "underline! underline-offset-2 tracking-tighter font-medium flex items-center justify-center gap-x-1 "
                            )}
                            style={{
                              color: theme.activeColor,
                            }}
                          >
                            Terms & Conditions
                            <FaExternalLinkAlt />
                          </Link>
                        </div>
                      </StyledCheckbox>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex gap-3 mt-8">
              {currentStep > 0 && (
                <NRCButton
                  type="button"
                  onClick={() => goToStep(currentStep - 1, values, errors)}
                  className={cn(
                    "flex items-center justify-center gap-x-2 px-6",
                    jetBrainsMono.className
                  )}
                >
                  <FaArrowLeftLong />
                  Back
                </NRCButton>
              )}

              {!isLastStep ? (
                <NRCButton
                  onClick={() => goToStep(currentStep + 1, values, errors)}
                  disabled={!currentStepValid}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-x-3 disabled:opacity-40!",
                    jetBrainsMono.className
                  )}
                >
                  Next
                  <FaArrowRightLong />
                </NRCButton>
              ) : (
                <NRCButton
                  disabled={!currentStepValid || !check || isSubmitting}
                  onClick={handleSubmit}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-x-3 disabled:opacity-40!",
                    jetBrainsMono.className
                  )}
                >
                  {isSubmitting ? "Submitting..." : "Continue"}
                  <FaArrowRightLong />
                </NRCButton>
              )}
            </div>

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
