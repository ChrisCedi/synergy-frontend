"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Edit } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface CompanyCardProps {
  id: number;
  name: string;
  rfc: string;
}

export function CompanyCard({ id, name, rfc }: CompanyCardProps) {
  const router = useRouter();
  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">{name}</h3>
        <Link href={`/companies/edit/${id}`} className="text-gray-500">
          <Button variant={"ghost"} className="w-fit cursor-pointer">
            <Edit />
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col">
          <p className="text-sm text-gray-500">RFC: {rfc}</p>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Button
          className="w-full"
          onClick={() => router.push(`/companies/users/create/${id}`)}
        >
          Registrar usuario
        </Button>
        <Button
          className="w-full"
          variant="outline"
          color="primary"
          onClick={() => router.push(`/companies/users/${id}`)}
        >
          Ver usuarios registrados
        </Button>
      </CardFooter>
    </Card>
  );
}
