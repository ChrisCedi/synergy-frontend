import LoginForm from "@/components/auth/login/molecules/LoginForm";
import { TypographyH1 } from "@/components/ui/atoms/TypographyH1";
import { TypographyH3 } from "@/components/ui/atoms/TypographyH3";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;
  const permissionsCookie = cookieStore.get("permissions")?.value;

  if (token && permissionsCookie) {
    const permissions = JSON.parse(permissionsCookie);
    if (permissions.balances.see) {
      redirect("/balances");
    }
    if (permissions.companyCustomer.see) {
      redirect("/companies");
    }
  }

  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <TypographyH1 className="text-center pb-6">Synergy</TypographyH1>
      <TypographyH3 className="text-primary pb-4">Iniciar Sesión</TypographyH3>
      <LoginForm />
      <p className="mt-8 text-center text-sm/6 text-gray-500">
        ¿Olvidaste tu contraseña?{" "}
        <Link
          href="/auth/recovery-password"
          className="font-semibold text-primary hover:text-primary/80"
        >
          recuperar contraseña
        </Link>
      </p>
    </div>
  );
}
