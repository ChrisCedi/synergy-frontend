"use server";
import { z } from "zod";

export const loginAction = async (
  previousState: {
    success: string;
    errors: string[];
    values: {
      email: string;
      password: string;
    };
  },
  formData: FormData
) => {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  console.log(previousState.values);

  const loginSchema = z.object({
    email: z.string().email({ message: "Email no válido" }),
    password: z.string().min(1, { message: "El Password no puede ir vacio" }),
  });

  const login = loginSchema.safeParse({ email, password });
  if (!login.success) {
    return {
      success: "",
      errors: login.error.issues.map((issue) => issue.message),
      values: {
        email,
        password,
      },
    };
  }

  console.log(email, password);

  return {
    success: "Login exitoso",
    errors: [],
    values: {
      email: "",
      password: "",
    },
  };
};
