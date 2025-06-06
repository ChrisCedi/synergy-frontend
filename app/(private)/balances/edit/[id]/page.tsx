import { Title } from "@/components/ui/atoms/Title";
import { BalanceForm } from "@/components/balances/organisms/BalanceForm";
import { ButtonBack } from "@/components/ui/atoms/ButtonBack";
import { paramsType } from "@/types/Params";

export default async function EditBalancePage({
  params,
}: {
  params: paramsType;
}) {
  const { id } = await params;

  return (
    <div>
      <Title title="Editar Balance" />
      <ButtonBack />
      <p className="pb-4 text-gray-500">
        Ingrese los datos de la empresa y las adquisisciones para generar un
        registro financiero.
      </p>
      <BalanceForm />
    </div>
  );
}
