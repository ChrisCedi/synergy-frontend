"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

interface CompanyForm {
  companyName: string;
  rfc: string;
  email: string;
}

export function CompanyForm({
  initialValues = {
    companyName: "",
    rfc: "",
    email: "",
  },
}) {
  const router = useRouter();
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<CompanyForm>({
    defaultValues: initialValues,
  });

  const onSubmit = (data: CompanyForm) => {
    console.log(data);
    toast.success("Cliente guardado correctamente");
    router.back();
  };

  return (
    <Card>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <Label>Nombre de la empresa</Label>
              <Input
                placeholder="Ej: Coca Cola"
                {...register("companyName", { required: "Campo requerido" })}
              />
              {errors.companyName && (
                <p className="text-red-500 text-xs">
                  {errors.companyName.message}
                </p>
              )}
            </div>
            <div>
              <Label>RFC de la empresa</Label>
              <Input
                placeholder="Ej: XXXX1100201XX011"
                {...register("rfc", { required: "Campo requerido" })}
              />
              {errors.rfc && (
                <p className="text-red-500 text-xs">{errors.rfc.message}</p>
              )}
            </div>
            <div>
              <Label>Email de la empresa</Label>
              <Input
                placeholder="Ej: empresa@correo.com"
                {...register("email", {
                  required: "Campo requerido",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Formato de email inválido",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email.message}</p>
              )}
            </div>
            <div>
              <Button type="submit">Guardar</Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
