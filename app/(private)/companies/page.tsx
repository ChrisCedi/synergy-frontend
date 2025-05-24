import { Title } from "@/components/ui/atoms/Title";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CompanyCard } from "@/components/companies/molecules/CompanyCard";

export default function UsersPage() {
  const companies = [
    {
      id: 1,
      name: "Coca Cola",
      rfc: "XXXX1100201XX011",
      email: "coca@correo.com",
    },
    {
      id: 2,
      name: "Pepsi Prueba Espacios",
      rfc: "XXXX1100201XX011",
      email: "pepsi@correo.com",
    },
    {
      id: 4,
      name: "Pepsi",
      rfc: "XXXX1100201XX011",
      email: "pepsi@correo.com",
    },
    {
      id: 42,
      name: "Pepsi",
      rfc: "XXXX1100201XX011",
      email: "pepsi@correo.com",
    },
  ];

  return (
    <div>
      <Title title="Empresas" />
      <Link href={"/companies/create"}>
        <Button>Registrar empresa</Button>
      </Link>
      <div className="pt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {companies.map((company) => (
          <CompanyCard
            key={company.id}
            id={company.id}
            name={company.name}
            rfc={company.rfc}
            email={company.email}
          />
        ))}
        {companies.length === 0 && (
          <p className="text-center text-gray-500">
            No hay empresas registradas
          </p>
        )}
      </div>
    </div>
  );
}
