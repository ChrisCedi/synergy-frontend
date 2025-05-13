import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Trash } from "lucide-react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Control,
  FieldErrors,
  UseControllerProps,
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
  SelectLabel,
} from "@/components/ui/select";
import { BalanceFormValues } from "../organisms/BalanceForm";

type BalanceCardFormProps = {
  control: Control<BalanceFormValues>;
  register: UseFormRegister<BalanceFormValues>;
  index: number;
  remove: (index: number) => void;
  errors: FieldErrors<BalanceFormValues>;
  watch: UseFormWatch<BalanceFormValues>;
};

export type BalanceCardFormValues = {
  name: string;
  description: string;
  cost: number;
  paymentMethod: "contado" | "financiado";
  initialPayment?: number;
  remainingAmount?: string;
};

export default function BalanceCardForm({
  control,
  register,
  index,
  remove,
  errors,
  watch,
}: BalanceCardFormProps) {
  let paymentMethodValue = watch(`acquisitions.${index}.paymentMethod`);
  let costValue = watch(`acquisitions.${index}.cost`);

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
              <p className="text-red-500 text-xs">
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
              <p className="text-red-500 text-xs">
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
            <div className="bg-gray-100 p-6 rounded-2xl">
              <p className="font-extrabold">Total a pagar: {costValue}</p>
            </div>
          ) : (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-6">
                <div>
                  <Label htmlFor="companyName">Pago incial</Label>
                  <Input
                    type="number"
                    placeholder="0"
                    {...register(`acquisitions.${index}.initialPayment`, {
                      required:
                        paymentMethodValue === "financiado"
                          ? "Campo requerido"
                          : false,
                      valueAsNumber: true,
                      min: { value: 1, message: "Debe ser mayor a 0" },
                    })}
                  />
                  {errors.acquisitions?.[index]?.initialPayment && (
                    <p className="text-red-500 text-xs">
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
                            <SelectItem value="3">3 meses</SelectItem>
                            <SelectItem value="6">6 meses</SelectItem>
                            <SelectItem value="12">12 meses</SelectItem>
                            <SelectItem value="24">24 meses</SelectItem>
                            <SelectItem value="36">36 meses</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.acquisitions?.[index]?.remainingAmount && (
                    <p className="text-red-500 text-xs">
                      {errors.acquisitions[index].remainingAmount.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="bg-gray-100 p-6 rounded-2xl">
                <p className="font-extrabold pb-2">
                  Monto restante {costValue}
                </p>
                <p className="font-extrabold">
                  Pago menusal estimado: {costValue}
                </p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
