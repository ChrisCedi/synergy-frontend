"use client";
import { DataTable } from "@/components/ui/organisms/DataTable";
import { Balance, useDashboardColumns } from "./hooks/useDashboardColumns";

export default function BalancesTable({ data = [] }: { data: Balance[] }) {
  const { dashboardColumns } = useDashboardColumns();

  return (
    <div>
      <DataTable
        columns={dashboardColumns}
        data={data}
        searchBy="company"
        label="Filtrar por empresa"
      />
    </div>
  );
}
