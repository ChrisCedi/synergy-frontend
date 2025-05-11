import { DataTable } from "@/components/ui/organisms/DataTable";
import {
  dashboardColumns,
  Payment,
} from "@/components/dashboard/organisms/dashboardColumns";
import { TypographyH1 } from "@/components/ui/atoms/TypographyH1";
import Title from "@/components/ui/atoms/Title";
import CreateBalanceButton from "@/components/dashboard/atoms/CreateBalanceButton";
import { BalanceCharts } from "@/components/dashboard/organisms/BalanceCharts";

export const metadata = {
  title: "Dashboard | Synergy",
  description: "General page",
};

export default function dashboardPage() {
  const data: Payment[] = [
    {
      id: "728ed52f",
      company: "Bimbo",
      createdAt: "Sat May 10 2025 22:23:10 GMT-0600 ",
      employee: "Christian",
    },
    {
      id: "728eddf52f",
      company: "Coca Cola",
      createdAt: "Sat May 10 2025 22:23:10 GMT-0600 ",
      employee: "Christian",
    },
    {
      id: "72klm8ed52f",
      company: "Pepsi",
      createdAt: "Sat May 10 2025 22:23:10 GMT-0600 ",
      employee: "Christian",
    },
  ];

  return (
    <div>
      <Title title="Dashboard" />
      <CreateBalanceButton />
      <BalanceCharts />

      <DataTable
        columns={dashboardColumns}
        data={data}
        searchBy="company"
        label="Filtrar por empresa"
      />
    </div>
  );
}
