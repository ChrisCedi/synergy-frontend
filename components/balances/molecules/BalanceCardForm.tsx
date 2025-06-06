import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Trash } from "lucide-react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormWatch,
  Controller,
} from "react-hook-form";
import {
  Select,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
import { BalanceFormValues } from "../organisms/BalanceForm";
import { formatCurrency } from "@/utils/formatCurrency";

type BalanceCardFormProps = {
  control: Control<BalanceFormValues>;
  register: UseFormRegister<BalanceFormValues>;
  index: number;
  remove: (index: number) => void;
  errors: FieldErrors<BalanceFormValues>;
  watch: UseFormWatch<BalanceFormValues>;
};

export default function BalanceCardForm({
  control,
  register,
  index,
  remove,
  errors,
  watch,
}: BalanceCardFormProps) {
  let capitalValue = Number(watch("capital"));
  let paymentMethodValue = watch(`acquisitions.${index}.paymentMethod`);
  let costValue = !isNaN(Number(watch(`acquisitions.${index}.cost`)))
    ? watch(`acquisitions.${index}.cost`)
    : 0;
  let initialPaymentValue = !isNaN(
    Number(watch(`acquisitions.${index}.initialPayment`))
  )
    ? watch(`acquisitions.${index}.initialPayment`)
    : 0;
  let remainingAmountValue = Number(
    watch(`acquisitions.${index}.remainingAmount`)
  );

  let acquisitionValue = watch(`acquisitions`);

  let totalAcquisitions = acquisitionValue
    .slice(0, index + 1)
    .reduce((total: number, acquisition: BalanceCardFormValues) => {
      return total + (Number(acquisition.cost) || 0);
    }, 0);

  let shortTerm = (costValue - initialPaymentValue) / remainingAmountValue;
  let longTerm = costValue - initialPaymentValue - shortTerm;

  const handleSetMonths = (years: number) => {
    const months = years * 12;
    return months;
  };

  return (
    <Card className="mb-4">
      <CardHeader>
        <div className="flex items-center justify-end">
          <Button variant="outline" onClick={() => remove(index)}>
            <Trash />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className=" grid grid-cols-1 md:grid-cols-2 gap-4 pb-6">
          <div>
            <Label htmlFor="companyName">Nombre de la adquisición</Label>
            <Input
              {...register(`acquisitions.${index}.name`, {
                required: "Campo requerido",
              })}
              placeholder="Ingrese el nombre de adquisición"
            />
            {errors.acquisitions?.[index]?.name && (
              <p className="text-red-500 text-xs pt-1">
                {errors.acquisitions[index].name.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="companyName">Descripción de la adquisición</Label>
            <Input
              {...register(`acquisitions.${index}.description`)}
              placeholder="Ingrese el detalle de la adquisición"
            />
          </div>
          <div>
            <Label htmlFor="companyName">Costo</Label>
            <Input
              type="number"
              placeholder="0"
              {...register(`acquisitions.${index}.cost`, {
                required: "Campo requerido",
                valueAsNumber: true,
                min: { value: 1, message: "Debe ser mayor a 0" },
              })}
            />
            {errors.acquisitions?.[index]?.cost && (
              <p className="text-red-500 text-xs pt-1">
                {errors.acquisitions[index].cost.message}
              </p>
            )}
          </div>
        </div>
        <div>
          <Label>Forma de pago:</Label>
          <Controller
            name={`acquisitions.${index}.paymentMethod`}
            defaultValue="contado"
            control={control}
            rules={{ required: "Selecciona una opción" }}
            render={({ field }) => (
              <RadioGroup
                className="py-4"
                value={field.value}
                onValueChange={field.onChange}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="contado" id="r1" />
                  <Label htmlFor="r1">Contado</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="financiado" id="r2" />
                  <Label htmlFor="r2">Financiamiento</Label>
                </div>
              </RadioGroup>
            )}
          />
        </div>
        <div>
          {paymentMethodValue === "contado" ? (
            <div className="bg-gray-100 p-6 rounded-2xl grid grid-cols-1 md:grid-cols-2 gap-4">
              {capitalValue > 0 && costValue > 0 ? (
                <div>
                  <p className="font-extrabold pb-3">
                    Total a pagar:{" "}
                    {isNaN(costValue) ? 0 : formatCurrency(costValue)}{" "}
                  </p>
                  <p className="font-extrabold pb-3">
                    Disponible:
                    {formatCurrency(capitalValue - totalAcquisitions)}
                  </p>
                </div>
              ) : (
                <p>
                  Para mostrar un desglose es necesario ingresar los valores
                  solicitados ⚠️
                </p>
              )}
            </div>
          ) : (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-6">
                <div>
                  <Label htmlFor="companyName">Pago incial</Label>
                  <Input
                    placeholder="0"
                    {...register(`acquisitions.${index}.initialPayment`, {
                      required:
                        paymentMethodValue === "financiado"
                          ? "Campo requerido"
                          : false,
                      valueAsNumber: true,
                      min: { value: 1, message: "Debe ser mayor a 0" },
                      validate: (value: number | undefined) => {
                        if (value === undefined) return "Campo requerido";
                        if (value > costValue) {
                          return "El pago inicial no puede ser mayor al costo total";
                        }
                        return true;
                      },
                    })}
                  />
                  {errors.acquisitions?.[index]?.initialPayment && (
                    <p className="text-red-500 text-xs pt-1">
                      {errors.acquisitions[index].initialPayment.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="companyName">Plazo (meses)</Label>
                  <Controller
                    name={`acquisitions.${index}.remainingAmount`}
                    control={control}
                    rules={{ required: "Debes seleccionar un plazo" }}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Seleccionar plazo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="1">12 meses</SelectItem>
                            <SelectItem value="2">24 meses</SelectItem>
                            <SelectItem value="3">36 meses</SelectItem>
                            <SelectItem value="4">48 meses</SelectItem>
                            <SelectItem value="5">60 meses</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.acquisitions?.[index]?.remainingAmount && (
                    <p className="text-red-500 text-xs pt-1">
                      {errors.acquisitions[index].remainingAmount.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="bg-gray-100 p-6 rounded-2xl">
                {initialPaymentValue !== undefined &&
                initialPaymentValue > 0 &&
                costValue > 0 &&
                capitalValue > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="font-extrabold pb-3">
                        Monto restante:{" "}
                        {formatCurrency(costValue - initialPaymentValue)}
                      </p>
                      <p className="font-extrabold pb-3">
                        Pago menusal estimado:
                        {formatCurrency(
                          (costValue - initialPaymentValue) /
                            handleSetMonths(remainingAmountValue)
                        )}
                      </p>
                    </div>
                    <div>
                      <p className="font-extrabold pb-3">
                        Deuda a corto plazo: {formatCurrency(shortTerm)}
                      </p>
                      {remainingAmountValue > 1 && (
                        <p className="font-extrabold pb-3">
                          Deuda a largo plazo: {formatCurrency(longTerm)}
                        </p>
                      )}
                    </div>
                    <div>
                      <p className="font-extrabold pb-3">
                        Disponible:{" "}
                        {formatCurrency(capitalValue - totalAcquisitions)}
                      </p>
                    </div>
                  </div>
                ) : (
                  <p>
                    Para mostrar un desglose es necesario ingresar el costo y el
                    pago inicial ⚠️
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
