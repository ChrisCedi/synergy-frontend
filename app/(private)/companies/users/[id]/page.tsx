import ButtonBack from "@/components/ui/atoms/ButtonBack";
import { Title } from "@/components/ui/atoms/Title";
import { DataTable } from "@/components/ui/organisms/DataTable";
import {
  User,
  usersColumns,
} from "@/components/companies/organisms/usersColumns";

export default function UsersCompanyPage() {
  const data: User[] = [
    {
      name: "Juan",
      lastName: "Pérez",
      email: "correo@correo.com",
      companyName: "Empresa S.A. de C.V.",
      role: "Capturista",
      createdAt: "2023-10-01T12:00:00Z",
      id: "1",
    },
  ];
  return (
    <div>
      <Title title={`Usuarios - `} />
      <ButtonBack />
      <DataTable
        columns={usersColumns}
        data={data}
        label="Buscar por nombre"
        searchBy="name"
      />
    </div>
  );
}
