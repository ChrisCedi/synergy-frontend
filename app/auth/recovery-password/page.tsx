import LoginForm from "@/components/auth/login/molecules/LoginForm";
import { TypographyH1 } from "@/components/ui/atoms/TypographyH1";
import { TypographyH3 } from "@/components/ui/atoms/TypographyH3";
import Link from "next/link";

export default function RecoveryScreen() {
  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <TypographyH1 className="text-center pb-6">synergy</TypographyH1>
      <TypographyH3 className="text-primary pb-4">
        Recuperar contraseña
      </TypographyH3>
      <p className="pb-3">Ingresa tu correo electrónico</p>
      <LoginForm />
      <p className="mt-8 text-center text-sm/6 text-gray-500">
        ¿Todo bien con tu contraseña?{" "}
        <Link
          href="/auth/login"
          className="font-semibold text-primary hover:text-primary/80"
        >
          Inicia sesión
        </Link>
      </p>
    </div>
  );
}
