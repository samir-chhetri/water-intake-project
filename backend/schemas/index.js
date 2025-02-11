import { z } from "zod";

const noStartingNumber = (val) => !/^\d/.test(val);

export const RegisterSchema = z.object({
  username: z.string().min(3).max(20).refine(noStartingNumber, {
    message: "Username should not start with a number",
  }),
  password: z
    .string()
    .min(6, { message: "Password should be at least 6 characters long" }),
  email: z.string().email({
    message: "Email should not start with a number",
  }),
  jobType: z.string(),
  age: z
    .number()
    .int()
    .gte(10, { message: "Age should be equal to greater than 10 " })
    .lte(90, { message: "Age should be less than 90" }),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email should not start with a number",
  }),
  password: z.string().min(6),
});
