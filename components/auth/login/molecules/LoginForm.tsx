"use client";
import { useActionState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { loginAction } from "@/actions/auth/login-action";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
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

  useEffect(() => {
    if (state.success) {
      toast.success(state.success);
      setTimeout(() => {
        router.push("/balances");
      }, 500);
    }
  }, [state.success]);

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
          type="password"
          defaultValue={state.values.password}
        />
      </div>

      <div className="mt-12">
        <Button className="w-full" disabled={pending}>
          Iniciar sesión
        </Button>
      </div>
    </form>
  );
}
