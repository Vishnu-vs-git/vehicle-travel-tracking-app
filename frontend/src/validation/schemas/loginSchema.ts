import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .superRefine((val, ctx) => {
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

  password: z
    .string()
    .superRefine((val, ctx) => {
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
});