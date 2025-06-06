import { Title } from "@/components/ui/atoms/Title";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/utils/formatCurrency";
import { AddAcquisition } from "@/components/balances/organisms/AddAcquisition";
import { ButtonBack } from "@/components/ui/atoms/ButtonBack";
import { AcquisitionCard } from "@/components/balances/molecules/AcquisitionCard";
import { Separator } from "@/components/ui/separator";
import { paramsType } from "@/types/Params";

export default async function AcquisitionsPage({
  params,
}: {
  params: paramsType;
}) {
  const { id } = await params;

  const companyData = {
    name: "Coca",
    capital: 16000,
  };

  const data = [
    {
      id: 1,
      name: "Computadora Dell XPS",
      description: "Laptop para el equipo de desarrollo",
      cost: 32000,
      paymentMethod: "contado",
      initialPayment: 0,
      remainingAmount: "1",
      createdAt: "2025-06-01T09:30:00.000Z",
    },
    {
      id: 2,
      name: "Impresora HP LaserJet",
      description: "Para oficina de administración",
      cost: 8000,
      paymentMethod: "financiado",
      initialPayment: 2000,
      remainingAmount: "2",
      createdAt: "2025-06-02T11:15:00.000Z",
    },
    {
      id: 3,
      name: "Escritorios ejecutivos",
      description: "Mobiliario para oficinas nuevas",
      cost: 15000,
      paymentMethod: "contado",
      initialPayment: 0,
      remainingAmount: "3",
      createdAt: "2025-06-03T08:45:00.000Z",
    },
    {
      id: 4,
      name: "Servidor NAS Synology",
      description: "Almacenamiento para respaldos de la empresa",
      cost: 45000,
      paymentMethod: "financiado",
      initialPayment: 15000,
      remainingAmount: "4",
      createdAt: "2025-06-04T14:00:00.000Z",
    },
  ];

  const total = data.reduce((total: number, acquisition) => {
    return total + (Number(acquisition.cost) || 0);
  }, 0);

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
          <h2 className="text-2xl font-semibold pb-6">
            Lista de adquisiciones
          </h2>
          {data.length > 0 ? (
            <div>
              {data.map((acquisition) => (
                <AcquisitionCard
                  key={acquisition.id}
                  companyData={companyData}
                  acquisitionData={acquisition}
                />
              ))}
              <div className="bg-gray-200 p-6 rounded-2xl">
                <p className="text-3xl">
                  <strong>Deuda total:</strong> {formatCurrency(total)}
                </p>
              </div>
            </div>
          ) : (
            <p>No hay adquisiciones registradas</p>
          )}
          <Separator className="my-6" />
          <AddAcquisition companyData={companyData} />
        </CardContent>
      </Card>
    </div>
  );
}
