import { Title } from "@/components/ui/atoms/Title";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/utils/formatCurrency";
import { AddAcquisition } from "@/components/balances/organisms/AddAcquisition";
import { ButtonBack } from "@/components/ui/atoms/ButtonBack";

export default async function AcquisitionsPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const data = [];

  const companyData = {
    name: "Coca",
    capital: 16000,
  };

  return (
    <div>
      <Title title="Adquisiciones - empresa" />
      <ButtonBack />
      <p className="text-2xl">
        Nombre del registro: <strong>Coca</strong>
      </p>
      <p className="text-2xl">
        Capital: <strong>{formatCurrency(533343234)}</strong>
      </p>

      <Card className="mt-6">
        <CardContent>
          {data.length > 0 ? (
            <p>Cards de cada adquisicion</p>
          ) : (
            <p>No hay adquisiciones registradas</p>
          )}
          <AddAcquisition companyData={companyData} />
        </CardContent>
      </Card>
    </div>
  );
}
