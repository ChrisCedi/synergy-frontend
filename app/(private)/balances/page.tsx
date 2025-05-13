import { DataTable } from "@/components/ui/organisms/DataTable";
import {
  dashboardColumns,
  Payment,
} from "@/components/balances/organisms/dashboardColumns";
import Title from "@/components/ui/atoms/Title";
import CreateBalanceButton from "@/components/balances/atoms/CreateBalanceButton";
import { BalanceCharts } from "@/components/balances/organisms/BalanceCharts";

export const metadata = {
  title: "Dashboard | Synergy",
  description: "General page",
};

export default function BalancesPage() {
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
      <Title title="Balances" />
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
