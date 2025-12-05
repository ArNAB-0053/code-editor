import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  username: z.string().min(3, "Invalid Username"),
  password: z.string().min(6, "Password must be 6+ chars"),
  confirmPassword: z.string().min(6, "Confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export const loginSchema = z.object({
  identifier: z.string(),
  password: z.string().min(6, "Password must be 6+ chars"),
});

export type RegisterFormType = z.infer<typeof registerSchema>;
export type LoginFormType = z.infer<typeof loginSchema>;