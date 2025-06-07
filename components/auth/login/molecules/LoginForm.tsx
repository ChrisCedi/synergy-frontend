"use client";

import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { loginAction } from "@/actions/auth/login-action";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

type FormData = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  async function onSubmit(data: FormData) {
    try {
      await loginAction(data);
      toast.success("Inicio de sesión exitoso");
      //router.push("/dashboard"); // o la ruta a donde quieras redirigir
    } catch (error: any) {
      toast.error(error?.message || "Error al iniciar sesión");
    }
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Input
          id="email"
          placeholder="Correo Electrónico"
          {...register("email", {
            required: "El correo es obligatorio",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Correo inválido",
            },
          })}
          aria-invalid={errors.email ? "true" : "false"}
        />
        {errors.email && (
          <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <Input
          id="password"
          placeholder="Contraseña"
          type="password"
          {...register("password", {
            required: "La contraseña es obligatoria",
          })}
          aria-invalid={errors.password ? "true" : "false"}
        />
        {errors.password && (
          <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      <div className="mt-12">
        <Button className="w-full" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Cargando..." : "Iniciar sesión"}
        </Button>
      </div>
    </form>
  );
}
