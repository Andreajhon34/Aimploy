import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().min(2, "Silahkan masukkan nama"),
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

export type SignupSchema = z.infer<typeof signupSchema>;
