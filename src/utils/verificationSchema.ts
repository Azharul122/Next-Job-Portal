import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email("Invalid Email!"),
  password: z
    .string({ required_error: "Invalid password!" })
    .trim()
    .min(3, "Password is too short!"),
});

export const passwordValidationSchema = z
  .object({
    one: z.string().min(8, "Password must be 8 characters long."),
    userId: z.string(),
    token: z.string(),
    two: z.string(),
  })
  .refine((data) => data.one === data.two, {
    message: "Both the passwords must match.",
    path: ["two"],
  });
