import { DataTable } from "@/components/ui/organisms/DataTable";
import { Title } from "@/components/ui/atoms/Title";
import CreateBalanceButton from "@/components/balances/atoms/CreateBalanceButton";
import { BalanceCharts } from "@/components/balances/organisms/BalanceCharts";
import { TypographyH4 } from "@/components/ui/atoms/TypographyH4";
import { Balance } from "@/components/balances/organisms/hooks/useDashboardColumns";
import BalancesTable from "@/components/balances/organisms/BalancesTable";

export const metadata = {
  title: "Balances | Synergy",
  description: "General page",
};

export default function BalancesPage() {
  const data: Balance[] = [
    {
      id: "728ed52f",
      company: "Bimbo",
      createdAt: "Sat May 10 2025 22:23:10 GMT-0600 ",
    },
    {
      id: "728eddf52f",
      company: "Coca Cola",
      createdAt: "Sat May 10 2025 22:23:10 GMT-0600 ",
    },
    {
      id: "72klm8ed52f",
      company: "Pepsi",
      createdAt: "Sat May 10 2025 22:23:10 GMT-0600 ",
    },
  ];

  return (
    <div>
      <Title title="Balances" />
      <CreateBalanceButton />
      <BalanceCharts />
      <TypographyH4 className="py-4">Mis registros</TypographyH4>
      <BalancesTable data={data} />
    </div>
  );
}
