import { getPasswordError, getUsernameError } from "@/helper/validation";
import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email"),
    username: z.string().superRefine((value, ctx) => {
      const err = getUsernameError(value);
      if (err) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: err,
        });
      }
    }),
    password: z.string().superRefine((value, ctx) => {
      const err = getPasswordError(value);
      if (err) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: err,
        });
      }
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  identifier: z.string(),
  password: z.string().min(6, "Password must be 6+ chars"),
});

export type RegisterFormType = z.infer<typeof registerSchema>;
export type LoginFormType = z.infer<typeof loginSchema>;
