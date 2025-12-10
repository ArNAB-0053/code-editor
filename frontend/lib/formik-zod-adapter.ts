import { z } from "zod";
import { FormikErrors } from "formik";

export const zodToFormik = <T extends z.ZodTypeAny>(schema: T) => (values: any) => {
  const result = schema.safeParse(values);
  if (result.success) return {};
  const errors: FormikErrors<any> = {};
  result.error.issues.forEach((issue) => {
    errors[issue.path[0] as string] = issue.message;
  });
  return errors;
};
