import ButtonBack from "@/components/ui/atoms/ButtonBack";
import { Title } from "@/components/ui/atoms/Title";
import { CustomerForm } from "@/components/customers/organisms/CustomerForm";

export default function CreateCustomerPage() {
  return (
    <div>
      <Title title="Registrar nuevo cliente" />
      <ButtonBack />
      <CustomerForm />
    </div>
  );
}
