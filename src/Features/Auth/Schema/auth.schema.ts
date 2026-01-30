import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email("email is required"),
  password: z.string().min(1, "password is required").max(8, "max is 8 char"),
  user_name: z.string().min(3).optional(),
});

export type LoginType = z.infer<typeof LoginSchema>;
