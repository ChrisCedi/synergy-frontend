import { ButtonBack } from "@/components/ui/atoms/ButtonBack";
import { Title } from "@/components/ui/atoms/Title";
import { CompanyForm } from "@/components/companies/organisms/CompanyForm";
import { paramsType } from "@/types/Params";

export default async function EditCompanyPage({
  params,
}: {
  params: paramsType;
}) {
  const { id } = await params;

  const initialValues = {
    companyName: "Coca Cola",
    rfc: "XXXX1100201XX011",
    email: "coca@email.com",
  };

  return (
    <div>
      <Title title="Editar empresa" />
      <ButtonBack />
      {id}
      <CompanyForm initialValues={initialValues} />
    </div>
  );
}
