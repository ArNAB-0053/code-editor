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
import { login, register } from "@/services/auth";
import { loginSchema, registerSchema } from "@/zod/sign-up.z";
import { Formik } from "formik";
import { FaLock, FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { ContinueWithGoogle } from "./continue-with-btns";
import { cn } from "@/lib/utils";
import { jetBrainsMono, spaceGrotesk } from "@/fonts";
import { FaArrowRightLong } from "react-icons/fa6";
import { Checkbox } from "antd";
import styled from "styled-components";
import { ThemeTypes } from "@/@types/theme";
import { useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { appUrls } from "@/config/navigation.config";

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
        <NRCFormLabel className="pl-1! text-white/50! ">
          {formItemChildren}
        </NRCFormLabel>
      }
      name={name}
      className="my-3!"
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

export const SignUpForm = () => {
  const { themeName } = useTheme();
  const theme = themeConfig(themeName);

  const [check, setCheck] = useState(false);

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={zodToFormik(registerSchema)}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const data = await register(values);
          console.log(data);
        } catch (e) {
          console.log(e);
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

        return (
          <NRAForm name="sign-up-form" className="px-0! w-full! ">
            <FormItemComponent
              name="name"
              value={values.name}
              onChange={handleChange("name")}
              formItemChildren="Name"
              touched={touched?.name}
              errorText={errors?.name}
              placeholder="Enter Full Name"
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

            <FormItemComponent
              name="confirm_password"
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

            <NRCButton
              disabled={disabled}
              onClick={handleSubmit}
              className={cn(
                "w-full! mt-8 flex items-center justify-center gap-x-3 disabled:opacity-40!",
                jetBrainsMono.className
              )}
            >
              {isSubmitting ? "Submitting..." : "Continue"}
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

export const SignInForm = () => {
  const initialValues = {
    identifier: "",
    password: "",
  };

  const router = useRouter()

  return (
    <Formik
      initialValues={initialValues}
      validate={zodToFormik(loginSchema)}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const data = await login(values);
          // console.log("data", data);
          if (data.user) router.push(appUrls.PYTHON);
        } catch (e) {
          console.log(e);
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
                "w-full! mt-8 flex items-center justify-center gap-x-3 disabled:opacity-40!",
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
