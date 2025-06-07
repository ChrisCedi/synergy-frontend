"use client";
import { DataTable } from "@/components/ui/organisms/DataTable";
import { BalanceItem, useDashboardColumns } from "./hooks/useDashboardColumns";

export default function BalanceItemsTable({
  data = [],
}: {
  data: BalanceItem[];
}) {
  const { dashboardColumns } = useDashboardColumns();

  return (
    <div>
      <DataTable
        columns={dashboardColumns}
        data={data}
        searchBy="companyName"
        label="Filtrar por empresa"
      />
    </div>
  );
}
