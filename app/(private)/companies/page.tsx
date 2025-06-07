import { Title } from "@/components/ui/atoms/Title";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CompanyCard } from "@/components/companies/molecules/CompanyCard";
import { query } from "@/utils/query";
import { CompanyCustomerDto } from "@/types/Company";

export default async function UsersPage() {
  let companies: CompanyCustomerDto[] = [];
  const getAllCompanies = async () => {
    try {
      companies = await query("/company-customers", { method: "GET" });
    } catch (error) {
      console.log(error);
    }
  };

  await getAllCompanies();

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
            name={company.companyName}
            rfc={company.rfc}
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
