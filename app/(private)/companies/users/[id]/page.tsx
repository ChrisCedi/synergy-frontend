import { ButtonBack } from "@/components/ui/atoms/ButtonBack";
import { Title } from "@/components/ui/atoms/Title";
import { DataTable } from "@/components/ui/organisms/DataTable";
import {
  User,
  usersColumns,
} from "@/components/companies/organisms/usersColumns";
import { query } from "@/utils/query";
import { UsersResponse } from "@/types/User";

type paramsCompany = Promise<{ id: string }>;

export default async function UsersCompanyPage({
  params,
}: {
  params: paramsCompany;
}) {
  const { id } = await params;
  let userList: User[] = [];

  const getUsers = async () => {
    try {
      const response: User[] = await query(`/users/byCompany/${id}`, {
        method: "GET",
      });

      if (response) {
        userList = response;
      }
    } catch (error) {
      console.log(error);
    }
  };

  await getUsers();

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
      <Title title={`Usuarios -  ${id}`} />
      <ButtonBack />
      <DataTable
        columns={usersColumns}
        data={userList}
        label="Buscar por nombre"
        searchBy="name"
      />
    </div>
  );
}
