"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

export type BalanceItem = {
  id: number;
  companyName: string;
  createdAt: string;
};

export const useDashboardColumns = () => {
  const router = useRouter();

  const dashboardColumns: ColumnDef<BalanceItem>[] = [
    {
      accessorKey: "companyName",
      header: "Empresa",
    },

    {
      accessorKey: "createdAt",
      header: "Fecha de registro",
      cell: ({ row }) => {
        const date = new Date(row.original.createdAt);
        return date.toLocaleDateString("es-ES", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        });
      },
    },
    {
      id: "actions",
      header: "Acciones",
      cell: ({ row }) => {
        const balance = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => alert("Exportar reporte de balance")}
              >
                Exportar reporte de balance
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() =>
                  router.push(`/balances/acquisitions/${balance.id}`)
                }
              >
                Administrar adquisiciones
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => router.push(`/balances/edit/${balance.id}`)}
              >
                Editar balance
              </DropdownMenuItem>
              <DropdownMenuSeparator />

              <DropdownMenuItem>Eliminar</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return { dashboardColumns };
};
