import LoginForm from "@/components/auth/login/molecules/LoginForm";
import { Button } from "@/components/ui/atoms/button";
import { Input } from "@/components/ui/atoms/input";
import { TypographyH1 } from "@/components/ui/atoms/TypographyH1";
import { TypographyH3 } from "@/components/ui/atoms/TypographyH3";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <TypographyH1 className="text-center pb-6">synergy</TypographyH1>
      <TypographyH3 className="text-primary pb-4">Iniciar Sesión</TypographyH3>
      <LoginForm />
      <p className="mt-8 text-center text-sm/6 text-gray-500">
        ¿Olvidaste tu contraseña?{" "}
        <Link
          href="/auth/forgot-password"
          className="font-semibold text-primary hover:text-primary/80"
        >
          recuperar contraseña
        </Link>
      </p>
    </div>
  );
}
