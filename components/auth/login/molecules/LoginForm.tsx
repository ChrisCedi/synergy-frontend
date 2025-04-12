"use client";
import { useActionState, useEffect } from "react";
import { Input } from "@/components/ui/atoms/input";
import { Button } from "@/components/ui/atoms/button";
import { loginAction } from "@/actions/auth/login-action";
import { toast } from "react-toastify";

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, {
    success: "",
    errors: [],
    values: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (state.errors) {
      state.errors.forEach((error) => {
        toast.error(error);
      });
    }
  }, [state.errors]);

  return (
    <form action={formAction} className="space-y-6">
      <div>
        <Input
          id="email"
          placeholder="Correo Electrónico"
          name="email"
          defaultValue={state.values.email}
        />
      </div>

      <div>
        <Input
          id="password"
          placeholder="Contraseña"
          name="password"
          defaultValue={state.values.password}
        />
      </div>

      <div className="mt-12">
        <Button className="w-full">Iniciar sesión</Button>
      </div>
    </form>
  );
}
