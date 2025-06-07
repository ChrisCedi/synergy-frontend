import { Title } from "@/components/ui/atoms/Title";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/utils/formatCurrency";
import { AddAcquisition } from "@/components/balances/organisms/AddAcquisition";
import { ButtonBack } from "@/components/ui/atoms/ButtonBack";
import { AcquisitionCard } from "@/components/balances/molecules/AcquisitionCard";
import { Separator } from "@/components/ui/separator";
import { paramsType } from "@/types/Params";
import { query } from "@/utils/query";
import { Acquisition, AcquisitionsResponse } from "@/types/Acquisition";
import { getSessionData } from "@/utils/getSessionData";
import { BalanceById } from "@/types/Balances";

export default async function AcquisitionsPage({
  params,
}: {
  params: paramsType;
}) {
  const { id } = await params;

  let acquisitionList: Acquisition[] = [];
  let balanceData = { name: "", capital: 0 };

  const getBalancesAcquisitions = async () => {
    try {
      const response: AcquisitionsResponse = await query(
        `/acquisitions/byBalance/${id}`,
        {
          method: "GET",
        }
      );

      acquisitionList = response.data;
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getBalanceById = async (id: number) => {
    try {
      const response: BalanceById = await query(`/balances/${id}`, {
        method: "GET",
      });

      balanceData = {
        name: response.companyName,
        capital: response.capital,
      };

      return response;
    } catch (error) {
      console.log(error);
    }
  };
  const { user } = await getSessionData();
  await getBalanceById(id);
  await getBalancesAcquisitions();

  const total = acquisitionList.reduce((total: number, acquisition) => {
    return total + (Number(acquisition.cost) || 0);
  }, 0);

  return (
    <div>
      <Title title={`Adquisiciones - ${balanceData.name}`} />
      <ButtonBack />
      <p className="text-2xl">
        Nombre del registro: <strong>{balanceData.name}</strong>
      </p>
      <p className="text-2xl">
        Capital: <strong>{formatCurrency(balanceData.capital)}</strong>
      </p>

      <Card className="mt-6">
        <CardContent>
          <h2 className="text-2xl font-semibold pb-6">
            Lista de adquisiciones
          </h2>
          {acquisitionList.length > 0 ? (
            <div>
              {acquisitionList.map((acquisition) => (
                <AcquisitionCard
                  balanceId={id}
                  key={acquisition.id}
                  companyData={balanceData}
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
          <AddAcquisition companyData={balanceData} balanceId={id} />
        </CardContent>
      </Card>
    </div>
  );
}
