import { z }from "zod";

export const userRegisterSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(15, "Name must not exceed 15 characters")
    .regex(
      /^[A-Z][a-zA-Z ]*$/,
      "Name must start with a capital letter and contain only alphabets and spaces"
    ),

  email: z
    .string()
    .trim()
    .email("Please enter a valid email address"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(15, "Password must not exceed 15 characters")
    .regex(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])/,
      "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
});
