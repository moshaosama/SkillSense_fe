import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email("email is required"),
  password: z.string().min(1, "password is required"),
  user_name: z.string().min(3).optional(),
  avatar: z.any().optional(),
});

export type LoginType = z.infer<typeof LoginSchema>;
