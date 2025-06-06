import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Acquisition } from "@/types/Acquisition";
import { formatCurrency } from "@/utils/formatCurrency";
import { formatDate } from "@/utils/formatDate";
import { Edit, Trash } from "lucide-react";
export function AcquisitionCard({
  acquisitionData,
}: {
  acquisitionData: Acquisition;
}) {
  let shortTerm =
    (acquisitionData.cost - acquisitionData.initialPayment) /
    Number(acquisitionData.remainingAmount);
  let longTerm =
    acquisitionData.cost - acquisitionData.initialPayment - shortTerm;

  return (
    <Card className="my-6">
      <CardContent>
        <div className="grid grid-cols-2 pb-4">
          <div>
            <p className="text-primary font-bold">ID: {acquisitionData.id}</p>
            <p>Fecha de creación: {formatDate(acquisitionData.createdAt)}</p>
          </div>
          <div className="flex justify-end gap-3">
            <Button>
              <Edit />
            </Button>
            <Button variant="outline">
              <Trash />
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div>
            <p className="font-semibold">Adquisición:</p>
            <p> {acquisitionData.name} </p>
          </div>
          <div>
            <p className="font-semibold">Descripción: </p>
            <p>{acquisitionData.description}</p>
          </div>
          <div>
            <p className="font-semibold">Costo: </p>
            <p>{formatCurrency(acquisitionData.cost)}</p>
          </div>
          <div>
            <p className="font-semibold">Forma de pago: </p>
            <p>{acquisitionData.paymentMethod}</p>
          </div>
          {acquisitionData.paymentMethod == "financiado" && (
            <div>
              <p className="font-semibold">Pago inicial: </p>
              <p>{formatCurrency(acquisitionData.initialPayment)}</p>
            </div>
          )}
          {acquisitionData.paymentMethod == "financiado" && (
            <div>
              <p className="font-semibold">Plazo definido (meses): </p>
              <p>{Number(acquisitionData.remainingAmount) * 12}</p>
            </div>
          )}
          {acquisitionData.paymentMethod == "financiado" && (
            <div>
              <p className="font-semibold">Deuda a corto plazo: </p>
              <p>{formatCurrency(shortTerm)}</p>
            </div>
          )}
          {acquisitionData.paymentMethod == "financiado" &&
            Number(acquisitionData.remainingAmount) > 1 && (
              <div>
                <p className="font-semibold">
                  Deuda a largo plazo (mayores a 12 meses):{" "}
                </p>
                <p>{formatCurrency(longTerm)}</p>
              </div>
            )}
        </div>
      </CardContent>
    </Card>
  );
}
