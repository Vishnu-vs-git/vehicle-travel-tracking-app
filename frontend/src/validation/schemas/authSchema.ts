import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string().superRefine((val, ctx) => {
      if (!val) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Name is required",
        });
        return;
      }

      if (val.length > 15) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Name must not exceed 15 characters",
        });
      }

      if (!/^[A-Z][a-zA-Z ]*$/.test(val)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            "Name must start with a capital letter and contain only alphabets",
        });
      }
    }),

    email: z.string().trim().superRefine((val, ctx) => {
      if (!val) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Email is required",
        });
        return;
      }

      if (!/\S+@\S+\.\S+/.test(val)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please enter a valid email address",
        });
      }
    }),

    password: z.string().superRefine((val, ctx) => {
      if (!val) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Password is required",
        });
        return;
      }

      if (val.length < 8) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Password must be at least 8 characters",
        });
      }

      if (val.length > 15) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Password must not exceed 15 characters",
        });
      }

      if (
        !/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])/.test(val)
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            "Password must include uppercase, lowercase, number & special character",
        });
      }
    }),

    confirmPassword: z.string().superRefine((val, ctx) => {
      if (!val) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Confirm password is required",
        });
      }
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });