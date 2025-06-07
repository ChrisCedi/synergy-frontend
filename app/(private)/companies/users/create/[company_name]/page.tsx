import React from "react";
import { Title } from "@/components/ui/atoms/Title";
import { UserForm } from "@/components/companies/organisms/UserForm";
import { ButtonBack } from "@/components/ui/atoms/ButtonBack";

type paramsCompany = Promise<{ company_name: string }>;

export default async function CreateUserPage({
  params,
}: {
  params: paramsCompany;
}) {
  const { company_name } = await params;

  return (
    <div>
      <Title title={`Registrar nuevo usuario - ${company_name}`} />
      <ButtonBack />
      <UserForm companyCustomerId={+company_name} />
    </div>
  );
}
