import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
import { useForm, Controller } from "react-hook-form";
import { formatCurrency } from "@/utils/formatCurrency";
import { AcquisitionFormValues } from "@/types/Acquisition";

export type AcquisitionData = {
  name: string;
  description: string;
  cost: number;
  paymentMethod: string;
  initialPayment: number;
  remainingAmount: string;
};

export function AcquisitionForm({
  companyData,
  cancelForm,
  initialValues = {
    name: "",
    description: "",
    cost: 0,
    paymentMethod: "contado",
    initialPayment: 0,
    remainingAmount: "1",
  },
}: {
  companyData: { name: string; capital: number };
  cancelForm: () => void;
  initialValues?: AcquisitionFormValues;
}) {
  const {
    control,
    register,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm<AcquisitionData>({
    defaultValues: initialValues,
  });

  const onSubmit = (data: AcquisitionData) => {
    console.log("Datos de adquisición:", data);
  };

  //let companyData.capital = Number(watch("capital"));
  let paymentMethodValue = watch(`paymentMethod`);
  let costValue = !isNaN(Number(watch(`cost`))) ? watch(`cost`) : 0;
  let initialPaymentValue = !isNaN(Number(watch(`initialPayment`)))
    ? watch(`initialPayment`)
    : 0;
  let remainingAmountValue = Number(watch(`remainingAmount`));

  /*   let totalAcquisitions = acquisitionValue
    .slice(0, index + 1)
    .reduce((total: number, acquisition: BalanceCardFormValues) => {
      return total + (Number(acquisition.cost) || 0);
    }, 0); */

  let shortTerm = (costValue - initialPaymentValue) / remainingAmountValue;
  let longTerm = costValue - initialPaymentValue - shortTerm;

  const handleSetMonths = (years: number) => {
    const months = years * 12;
    return months;
  };

  return (
    <Card className="mb-4">
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className=" grid grid-cols-1 md:grid-cols-2 gap-4 pb-6">
            <div>
              <Label htmlFor="name">Nombre de la adquisición</Label>
              <Input
                {...register(`name`, {
                  required: "Campo requerido",
                })}
                placeholder="Ingrese el nombre de adquisición"
              />
              {errors.name && (
                <p className="text-red-500 text-xs pt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="description">Descripción de la adquisición</Label>
              <Input
                {...register(`description`)}
                placeholder="Ingrese el detalle de la adquisición"
              />
            </div>
            <div>
              <Label htmlFor="cost">Costo</Label>
              <Input
                type="number"
                placeholder="0"
                {...register(`cost`, {
                  required: "Campo requerido",
                  valueAsNumber: true,
                  min: { value: 1, message: "Debe ser mayor a 0" },
                })}
              />
              {errors.cost && (
                <p className="text-red-500 text-xs pt-1">
                  {errors.cost.message}
                </p>
              )}
            </div>
          </div>
          <div>
            <Label>Forma de pago:</Label>
            <Controller
              name={`paymentMethod`}
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
                {companyData.capital > 0 && costValue > 0 ? (
                  <div>
                    <p className="font-extrabold pb-3">
                      Total a pagar:{" "}
                      {isNaN(costValue) ? 0 : formatCurrency(costValue)}{" "}
                    </p>
                    {/*    <p className="font-extrabold pb-3">
                    Disponible:
                    {formatCurrency(companyData.capital - totalAcquisitions)}
                  </p> */}
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
                      {...register(`initialPayment`, {
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
                    {errors.initialPayment && (
                      <p className="text-red-500 text-xs pt-1">
                        {errors.initialPayment.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="companyName">Plazo (meses)</Label>
                    <Controller
                      name={`remainingAmount`}
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
                    {errors.remainingAmount && (
                      <p className="text-red-500 text-xs pt-1">
                        {errors.remainingAmount.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="bg-gray-100 p-6 rounded-2xl">
                  {initialPaymentValue !== undefined &&
                  initialPaymentValue > 0 &&
                  costValue > 0 &&
                  companyData.capital > 0 ? (
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
                      {/*   <div>
                      <p className="font-extrabold pb-3">
                        Disponible:{" "}
                        {formatCurrency(
                          companyData.capital - totalAcquisitions
                        )}
                      </p>
                    </div> */}
                    </div>
                  ) : (
                    <p>
                      Para mostrar un desglose es necesario ingresar el costo y
                      el pago inicial ⚠️
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="flex justify-end gap-4 pt-6">
            <Button variant="outline" type="button" onClick={cancelForm}>
              Cancelar
            </Button>
            <Button type="submit">Guardar</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
