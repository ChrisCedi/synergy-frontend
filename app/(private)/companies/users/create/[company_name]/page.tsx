import React from "react";
import { Title } from "@/components/ui/atoms/Title";
import { UserForm } from "@/components/companies/organisms/UserForm";
import ButtonBack from "@/components/ui/atoms/ButtonBack";
export default async function CreateUserPage({
  params,
}: {
  params: { company_name: string };
}) {
  const { company_name } = await params;
  const nameFormatted = company_name.split("%20").join(" ");
  return (
    <div>
      <Title title={`Registrar nuevo usuario - ${nameFormatted}`} />
      <ButtonBack />
      <UserForm />
    </div>
  );
}
