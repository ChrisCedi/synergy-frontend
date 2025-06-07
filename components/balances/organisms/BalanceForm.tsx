"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { Save } from "lucide-react";
import { useAlertDialogStore } from "@/stores/store-components/useAlertDialogStore";
import { useRouter } from "next/navigation";
import { createBalanceAction } from "@/actions/balances/create-balance-action";
import { toast } from "react-toastify";

export type BalanceFormValues = {
  companyName: string;
  capital: number;
};

export function BalanceForm() {
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm<BalanceFormValues>();
  const showDialog = useAlertDialogStore((s) => s.show);
  const router = useRouter();

  const onSubmit = async (data: BalanceFormValues) => {
    try {
      const response = await createBalanceAction(data);
      showDialog({
        title: "registro exitoso",
        description: `Para completar el flujo es importante registrar adquisiciones. Puedes registrar adquisiciones en cualquier momento desde la tabla de Mis registros -> acciones -> administrar adquisiciones.`,
        confirmText: "Registrar adquisiciones",

        onConfirm: () => {
          router.push(`/balances/acquisitions/${response.data.id}`);
        },
      });
    } catch (error: any) {
      toast.error(error?.message || "Error al iniciar sesión");
    }
  };

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

                  min: { value: 1, message: "Debe ser mayor a 0" },
                })}
              />
              {errors.capital && (
                <p className="text-red-500 text-xs">{errors.capital.message}</p>
              )}
            </div>
          </div>

          <div className="mt-8">
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
