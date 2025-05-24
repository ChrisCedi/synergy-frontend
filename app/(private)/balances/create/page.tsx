import BalanceForm from "@/components/balances/organisms/BalanceForm";
import ButtonBack from "@/components/ui/atoms/ButtonBack";
import { Title } from "@/components/ui/atoms/Title";

export const metadata = {
  title: "Nuevo Balance | Synergy",
  description: "Crear nuevo balance",
};

export default function CreateBalancePage() {
  return (
    <div>
      <Title title="Nuevo Balance" />

      <ButtonBack />
      <p className="pb-4 text-gray-500">
        Ingrese los datos de la empresa y las adquisisciones para generar un
        balance financiero.
      </p>
      <BalanceForm />
    </div>
  );
}
