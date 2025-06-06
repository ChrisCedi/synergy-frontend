import { ButtonBack } from "@/components/ui/atoms/ButtonBack";
import { Title } from "@/components/ui/atoms/Title";
import { CompanyForm } from "@/components/companies/organisms/CompanyForm";

export default function CreateCustomerPage() {
  return (
    <div>
      <Title title="Registrar nueva empresa" />
      <ButtonBack />
      <CompanyForm />
    </div>
  );
}
