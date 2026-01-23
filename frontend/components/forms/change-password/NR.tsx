"use client";
import { zodToFormik } from "@/lib/formik-zod-adapter";
import { changePasswordSchema, ChangePasswordType } from "@/zod/auth.z";
import { Formik } from "formik";
import { FaLock } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { jetBrainsMono } from "@/fonts";
import { FaArrowRightLong } from "react-icons/fa6";
import { useState } from "react";
import { usePasswordChange } from "@/hooks/usePasswordChange";
import { NRAForm, NRCButton, NRCDivider } from "@/components/ui/no-redux";
import { FormItemComponent } from "../form-item-component/NR";
import { useTheme } from "@/context/ThemeContext";

interface ChangePasswordFormProps {
  id: string;
  username: string;
}

export const ChangePasswordForm = ({
  id,
  username,
}: ChangePasswordFormProps) => {
  const { theme } = useTheme();
  const { changePassword } = usePasswordChange();

  const initialValues: ChangePasswordType = {
    id,
    username,
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  };

  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [blurredFields, setBlurredFields] = useState<Set<string>>(new Set());

  const [initialNewPassword, setInitialNewPassword] = useState(true);
  const [initialConfirmPassword, setInitialConfirmPassword] = useState(true);

  const shouldShowError = (fieldName: string) => {
    return focusedField === fieldName || blurredFields.has(fieldName);
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={zodToFormik(changePasswordSchema)}
      validateOnChange
      onSubmit={async (values, { setSubmitting }) => {
        await changePassword(values);
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
        const disabled =
          !values.oldPassword ||
          !values.newPassword ||
          !values.confirmNewPassword ||
          isSubmitting;

        return (
          <NRAForm name="nr-change-password-form" className="px-0! w-full! ">
            <FormItemComponent
              name="oldPassword"
              value={values.oldPassword}
              onChange={handleChange("oldPassword")}
              formItemChildren="Old Password"
              onBlur={handleBlur("oldPassword")}
              placeholder="Enter Old Password"
              placeholderIcon={<FaLock size={12} />}
            />

            <NRCDivider
              className="w-15! h-px! place-self-center!"
              style={{
                backgroundColor: theme.activeColor,
              }}
            />

            <FormItemComponent
              name="newPassword"
              type="password"
              value={values.newPassword}
              onChange={(e) => {
                setInitialNewPassword(false);
                handleChange("newPassword")(e);
              }}
              formItemChildren="New Password"
              enableTouch={false}
              onFocus={() => setFocusedField("newPassword")}
              onBlur={(e) => {
                setBlurredFields((prev) => new Set(prev).add("newPassword"));
                setFocusedField(null);
                handleBlur("newPassword")(e);
              }}
              errorText={errors?.newPassword}
              showError={!initialNewPassword && shouldShowError("newPassword")}
              placeholder="New Password"
              placeholderIcon={<FaLock size={12} />}
            />

            <FormItemComponent
              name="confirmNewPassword"
              value={values.confirmNewPassword}
              onChange={(e) => {
                setInitialConfirmPassword(false);
                handleChange("confirmNewPassword")(e);
              }}
              formItemChildren="Confirm New Password"
              enableTouch={false}
              onFocus={() => setFocusedField("confirmNewPassword")}
              onBlur={(e) => {
                setBlurredFields((prev) =>
                  new Set(prev).add("confirmNewPassword"),
                );
                setFocusedField(null);
                handleBlur("confirmNewPassword")(e);
              }}
              errorText={errors?.confirmNewPassword}
              showError={
                !initialConfirmPassword && shouldShowError("confirmNewPassword")
              }
              placeholder="Confirm New Password"
              placeholderIcon={<FaLock size={12} />}
            />

            <NRCButton
              disabled={disabled}
              onClick={handleSubmit}
              className={cn(
                "flex-1 flex items-center justify-center gap-x-3 disabled:opacity-40! w-full!",
                jetBrainsMono.className,
              )}
            >
              {isSubmitting ? "Submitting..." : "Continue"}
              <FaArrowRightLong />
            </NRCButton>
          </NRAForm>
        );
      }}
    </Formik>
  );
};
