"use client";
import {
  NRAForm,
  NRAFormItem,
  NRAInput,
  NRCButton,
  NRCFormLabel,
} from "@/components/ui/no-redux";
import { themeConfig } from "@/config/themeConfig";
import { useTheme } from "@/context/ThemeContext";
import { zodToFormik } from "@/lib/formik-zod-adapter";
import { login, register, useGetUsernameAvailability } from "@/services/auth";
import { loginSchema, registerSchema } from "@/zod/sign-up.z";
import { Formik } from "formik";
import { FaLock, FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { cn } from "@/lib/utils";
import { jetBrainsMono, spaceGrotesk } from "@/fonts";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { Checkbox } from "antd";
import styled, { createGlobalStyle } from "styled-components";
import { ThemeTypes } from "@/@types/theme";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { appUrls } from "@/config/navigation.config";
import { toast } from "sonner";
import { ContinueWithGoogle } from "./continue-with-btns";
import { messagesConfig } from "@/config/messages.config";
import { useDispatch } from "react-redux";
import {
  setUserEmail,
  setUserId,
  setUserName,
  setUserUsername,
} from "@/redux/slices/userSlice";
import { motion, AnimatePresence } from "framer-motion";

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

const GlobalSwiperStyle = createGlobalStyle<{ $theme: ThemeTypes }>`
.swiper-pagination-bullets {
  top: 0px !important;
  pointer-events: none !important;
}

.swiper-pagination-bullet {
  width: 8px;
  height: 8px;
  background-color: ${({ $theme }) => $theme?.activeColor}80 !important; 
  border-radius: 10px; 
  transition: all 0.3s ease-in-out;
  opacity: 1;
}

.swiper-pagination-bullet-active {
  width: 60px !important;
  height: 6px !important; 
  border-radius: 10px !important; 
  background-color: ${({ $theme }) => $theme?.activeColor} !important;
}
`;

type FormItemComponentType = {
  name: string;
  formItemChildren: React.ReactNode;
  inputChildren?: React.ReactNode;
  value: string;
  onChange: any;
  errorText?: string;
  touched?: boolean;
  placeholder?: string;
  placeholderIcon?: React.ReactNode;
};

const FormItemComponent = ({
  name,
  formItemChildren,
  value,
  onChange,
  errorText,
  touched,
  placeholder,
  placeholderIcon,
}: FormItemComponentType) => {
  const { themeName } = useTheme();
  const theme = themeConfig(themeName);
  return (
    <NRAFormItem
      layout="vertical"
      label={
        <NRCFormLabel className="pl-1! text-white/50!  ">
          {formItemChildren}
        </NRCFormLabel>
      }
      name={name}
      className="my-3! w-full!"
    >
      <>
        <div className="relative">
          <NRAInput
            key={name}
            value={value}
            onChange={onChange}
            className="hover:border-none! border-none! border-l-2! pl-8! placeholder:text-xs!"
            placeholder={placeholder}
          />
          {/* <div
            className="h-full w-0.5 absolute left-0 bottom-0 "
            style={{ background: theme.activeColor }}
          /> */}
          <div
            className="w-5 h-5 absolute left-2 bottom-px "
            style={{ color: theme.activeColor }}
          >
            {placeholderIcon}
          </div>
        </div>
        {touched && errorText && (
          <div
            className={cn(
              "text-[#ff0000] bg-[#ff0000]/25 mt-1 py-1 text-center rounded-sm text-[10px]",
              jetBrainsMono.className
            )}
          >
            {errorText}
          </div>
        )}
      </>
    </NRAFormItem>
  );
};

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
    fields: ["name"],
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
  const router = useRouter();

  const isStepValid = (values: any, errors: any, step: number) => {
    const stepFields = steps[step].fields;
    const hasValues = stepFields.every((field) => values[field]);
    const hasNoErrors = stepFields.every((field) => !errors[field]);
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
    name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  };

  const [username, setUsername] = useState("");

  // const { data: availability, isLoading } = useGetUsernameAvailability(
  //   username.current
  // );

  useEffect(() => {
    console.log(username);
  }, [username]);

  return (
    <Formik
      initialValues={initialValues}
      validate={zodToFormik(registerSchema)}
      onSubmit={async (values, { setSubmitting }) => {
        const toastId = toast.loading(messagesConfig.SIGN_UP.LOADING);
        try {
          const data = await register(values);
          if (data.status === "success") {
            toast.success(messagesConfig.SIGN_UP.SUCCESS, { id: toastId });
            setTimeout(() => {
              router.push(appUrls.PYTHON);
            }, 1500);
          } else {
            toast.error(messagesConfig.SIGN_UP.ERROR, { id: toastId });
          }
        } catch (e: unknown) {
          toast.success(messagesConfig.SIGN_UP.ERROR, { id: toastId });
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleSubmit,
        isSubmitting,
      }) => {
        const disabled =
          !values.name ||
          !values.email ||
          !values.password ||
          !values.confirmPassword ||
          !values.username ||
          isSubmitting ||
          !check ||
          errors?.name ||
          errors?.email ||
          errors?.password ||
          errors?.confirmPassword ||
          touched?.name ||
          touched?.email ||
          touched?.password ||
          touched?.confirmPassword;

        const currentStepValid = isStepValid(values, errors, currentStep);
        const isLastStep = currentStep === steps.length - 1;

        return (
          <NRAForm name="sign-up-form" className="px-0! w-full! relative ">
            <GlobalSwiperStyle $theme={theme} />
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

            <div className="relative overflow-hidden min-h-[180px]">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentStep}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  {/* Step 1: Account Info */}
                  {currentStep === 0 && (
                    <>
                      <FormItemComponent
                        name="username"
                        value={values.username}
                        onChange={(e) => {
                          setUsername(e.target.value);
                           handleChange("username")(e);
                        }}
                        formItemChildren="Username"
                        touched={touched?.username}
                        errorText={errors?.username}
                        placeholder="Enter Username"
                        placeholderIcon={<FaUser size={12} />}
                      />
                      <FormItemComponent
                        name="email"
                        value={values.email}
                        onChange={handleChange("email")}
                        formItemChildren="Email"
                        touched={touched?.email}
                        errorText={errors?.email}
                        placeholder="Enter Email"
                        placeholderIcon={<MdEmail size={12} />}
                      />
                    </>
                  )}

                  {/* Step 2: Personal Details */}
                  {currentStep === 1 && (
                    <>
                      <FormItemComponent
                        name="name"
                        value={values.name}
                        onChange={handleChange("name")}
                        formItemChildren="Full Name"
                        touched={touched?.name}
                        errorText={errors?.name}
                        placeholder="Enter Full Name"
                        placeholderIcon={<FaUser size={12} />}
                      />
                    </>
                  )}

                  {/* Step 3: Security */}
                  {currentStep === 2 && (
                    <>
                      <FormItemComponent
                        name="password"
                        type="password"
                        value={values.password}
                        onChange={handleChange("password")}
                        formItemChildren="Password"
                        touched={touched?.password}
                        errorText={errors?.password}
                        placeholder="Enter Password"
                        placeholderIcon={<FaLock size={12} />}
                      />
                      <FormItemComponent
                        name="confirmPassword"
                        type="password"
                        value={values.confirmPassword}
                        onChange={handleChange("confirmPassword")}
                        formItemChildren="Confirm Password"
                        touched={touched?.confirmPassword}
                        errorText={errors?.confirmPassword}
                        placeholder="Confirm Password"
                        placeholderIcon={<FaLock size={12} />}
                      />

                      <StyledCheckbox
                        $theme={theme}
                        indeterminate={check}
                        onChange={(e) => setCheck(e.target.checked)}
                        className={cn(
                          "text-white/90! mt-3! text-sm!",
                          spaceGrotesk.className
                        )}
                      >
                        I agree with Terms & Conditions
                      </StyledCheckbox>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex gap-3 mt-8">
              {currentStep > 0 && (
                <NRCButton
                  // type="button"
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
                  type="button"
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

            {/* <FormItemComponent
              name="name"
              value={values.name}
              onChange={handleChange("name")}
              formItemChildren="Name"
              touched={touched?.name}
              errorText={errors?.name}
              placeholder="Enter Full Name"
              placeholderIcon={<FaUser size={12} />}
            /> */}

            {/* <FormItemComponent
              name="password"
              value={values.password}
              onChange={handleChange("password")}
              formItemChildren="Password"
              touched={touched?.password}
              errorText={errors?.password}
              placeholder="Enter Password"
              placeholderIcon={<FaLock size={12} />}
            />

            <FormItemComponent
              name="confirm_password"
              value={values.confirmPassword}
              onChange={handleChange("confirmPassword")}
              formItemChildren="Confirm Password"
              touched={touched?.confirmPassword}
              errorText={errors?.confirmPassword}
              placeholder="Confirm Password"
              placeholderIcon={<FaLock size={12} />}
            /> */}

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

export const SignInForm = () => {
  const initialValues = {
    identifier: "",
    password: "",
  };

  const router = useRouter();

  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={initialValues}
      validate={zodToFormik(loginSchema)}
      onSubmit={async (values, { setSubmitting }) => {
        const toastId = toast.loading(messagesConfig.LOGIN.LOADING);
        try {
          const data = await login(values);
          console.log(data);
          if (data.status === "success") {
            dispatch(setUserId(data?.user?.id));
            dispatch(setUserName(data?.user?.name));
            dispatch(setUserEmail(data?.user?.email));
            dispatch(setUserUsername(data.user?.username));

            toast.success(messagesConfig.LOGIN.SUCCESS, { id: toastId });
            setTimeout(() => {
              router.push(appUrls.PYTHON);
            }, 1500);
          } else {
            toast.error(messagesConfig.LOGIN.ERROR, { id: toastId });
          }
        } catch (e: unknown) {
          toast.error(messagesConfig.LOGIN.ERROR, { id: toastId });
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleSubmit,
        isSubmitting,
      }) => {
        const disabled = !values.identifier || !values.password || isSubmitting;

        return (
          <NRAForm name="sign-in-form" className="px-0! w-full! ">
            <FormItemComponent
              name="identifier"
              value={values.identifier}
              onChange={handleChange("identifier")}
              formItemChildren="Email"
              touched={touched?.identifier}
              errorText={errors?.identifier}
              placeholder="Enter Email"
              placeholderIcon={<MdEmail size={12} />}
            />

            <FormItemComponent
              name="password"
              value={values.password}
              onChange={handleChange("password")}
              formItemChildren="Password"
              touched={touched?.password}
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
