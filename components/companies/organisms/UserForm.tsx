"use client";

import { useForm, Controller } from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface UserFormValues {
  name: string;
  lastName: string;
  email: string;
  role: string;
}

export function UserForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UserFormValues>();

  const onSubmit = (data: UserFormValues) => {
    console.log("Formulario enviado:", data);
  };

  return (
    <Card className="mt-6">
      <CardContent className="space-y-4 pt-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4 pb-6">
            {/* Name */}
            <div>
              <Label htmlFor="name">Nombre</Label>
              <Input
                id="name"
                {...register("name", { required: "El nombre es obligatorio" })}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <Label htmlFor="lastName">Apellido</Label>
              <Input
                id="lastName"
                {...register("lastName", {
                  required: "El apellido es obligatorio",
                })}
              />
              {errors.lastName && (
                <p className="text-sm text-red-500">
                  {errors.lastName.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                type="email"
                {...register("email", {
                  required: "El correo es obligatorio",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Formato de correo no válido",
                  },
                })}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* Role con Controller y Select */}
            <div>
              <Label htmlFor="role">Rol</Label>
              <Controller
                name="role"
                control={control}
                rules={{ required: "El rol es obligatorio" }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger id="role" className="w-full">
                      <SelectValue placeholder="Selecciona un rol" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="financiero">Financiero</SelectItem>
                      <SelectItem value="capturista">Capturista</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.role && (
                <p className="text-sm text-red-500">{errors.role.message}</p>
              )}
            </div>
          </div>

          <Button type="submit" className="w-full">
            Enviar
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
