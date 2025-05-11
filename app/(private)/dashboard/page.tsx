import { DataTable } from "@/components/ui/organisms/DataTable";
import {
  dashboardColumns,
  Payment,
} from "@/components/dashboard/organisms/dashboardColumns";

export const metadata = {
  title: "Dashboard | Synergy",
  description: "General page",
};

export default function dashboardPage() {
  const data: Payment[] = [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
  ];
  return (
    <div>
      <DataTable columns={dashboardColumns} data={data} />
    </div>
  );
}
