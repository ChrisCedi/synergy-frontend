"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { Plus, Save } from "lucide-react";
import BalanceCardForm from "../molecules/BalanceCardForm";
import { Separator } from "@/components/ui/separator";
import { toast } from "react-toastify";
import { BalanceCardFormValues } from "../molecules/BalanceCardForm";

export type BalanceFormValues = {
  companyName: string;
  capital: number;
  acquisitions: BalanceCardFormValues[];
};

export default function BalanceForm() {
  const {
    handleSubmit,
    control,
    register,
    watch,
    formState: { errors, isValid },
  } = useForm<BalanceFormValues>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "acquisitions",
  });

  const onSubmit = (data: BalanceFormValues) => {
    if (data.acquisitions.length === 0) {
      toast.warning("Debe agregar al menos una adquisición");
      return;
    }
    console.log("Form Data:", data);
  };

  const capitalValue = !isNaN(Number(watch("capital"))) ? watch("capital") : 0;
  const acquisitionsValue = watch("acquisitions") || [];

  const totalAcquisitions = acquisitionsValue.reduce(
    (total, acquisition) => total + (Number(acquisition.cost) || 0),
    0
  );

  const balance = Number(capitalValue) - totalAcquisitions;

  return (
    <Card>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className=" grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="companyName">Nombre de la empresa</Label>
              <Input
                {...register("companyName", { required: "Campo requerido" })}
                placeholder="Ingrese el nombre de la empresa"
              />
              {errors.companyName && (
                <p className="text-red-500 text-xs">
                  {errors.companyName.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="companyName">Capital</Label>
              <Input
                type="number"
                placeholder="0"
                {...register("capital", {
                  required: "El capital es obligatorio",
                  valueAsNumber: true,
                  min: { value: 1, message: "Debe ser mayor a 0" },
                })}
              />
              {errors.capital && (
                <p className="text-red-500 text-xs">{errors.capital.message}</p>
              )}
            </div>
          </div>
          <div>
            <h2 className="pt-4 pb-3 text-2xl font-bold">Adquisiciones</h2>
            {fields.map((field, index) => (
              <BalanceCardForm
                key={field.id}
                control={control}
                register={register}
                index={index}
                remove={remove}
                errors={errors}
                watch={watch}
              />
            ))}
            <Button
              variant="outline"
              className="w-full mt-10"
              onClick={() =>
                append({
                  name: "",
                  description: "",
                  cost: 0,
                  paymentMethod: "contado",
                  initialPayment: 0,
                  remainingAmount: "3",
                })
              }
            >
              <Plus />
              Agregar adquisición
            </Button>
          </div>

          <Separator className="my-8" />

          <div className="bg-gray-100 p-6 rounded-2xl mb-6">
            <h2 className="pb-3 text-2xl font-bold">Resumen</h2>
            {isValid && acquisitionsValue.length > 0 ? (
              <div>
                <p>
                  Capital:{" "}
                  {new Intl.NumberFormat("es-MX", {
                    style: "currency",
                    currency: "MXN",
                  }).format(capitalValue)}
                </p>
                <p>
                  Total de adquisiciones:{" "}
                  {new Intl.NumberFormat("es-MX", {
                    style: "currency",
                    currency: "MXN",
                  }).format(totalAcquisitions)}
                </p>
                <p>
                  Balance:{" "}
                  {new Intl.NumberFormat("es-MX", {
                    style: "currency",
                    currency: "MXN",
                  }).format(balance)}
                </p>
              </div>
            ) : (
              <p>
                Para visualizar el resumen de tu balance es importante llenar
                los campos obligatorios y revisar que no existan errores.
              </p>
            )}
          </div>
          <div>
            <Button className="w-full mt-1" type="submit">
              <Save />
              Guardar Balance
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
