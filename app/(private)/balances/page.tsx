import { DataTable } from "@/components/ui/organisms/DataTable";
import { Title } from "@/components/ui/atoms/Title";
import CreateBalanceButton from "@/components/balances/atoms/CreateBalanceButton";
import { BalanceCharts } from "@/components/balances/organisms/BalanceCharts";
import { TypographyH4 } from "@/components/ui/atoms/TypographyH4";
import { BalanceItem } from "@/components/balances/organisms/hooks/useDashboardColumns";
import BalancesTable from "@/components/balances/organisms/BalancesTable";
import { query } from "@/utils/query";
import { cookies } from "next/headers";
import { toast } from "react-toastify";
import { Balance, BalanceResponse } from "@/types/Balances";

export const metadata = {
  title: "Balances | Synergy",
  description: "General page",
};

export default async function BalancesPage() {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get("user")?.value;
  const user = userCookie ? JSON.parse(userCookie) : {};
  let balanceList: Balance[] = [];

  try {
    const response = await query<BalanceResponse>(
      `/balances/findByCompany/${user.companyCustomerId}`,
      { method: "GET" }
    );

    if (response.data) {
      balanceList = response.data;
    }
  } catch (error) {
    toast.error("Error al obtener los registro");
  }

  return (
    <div>
      <Title title="Balances" />
      <CreateBalanceButton />
      <BalanceCharts />
      <TypographyH4 className="py-4">Mis registros</TypographyH4>
      <BalancesTable data={balanceList} />
    </div>
  );
}
