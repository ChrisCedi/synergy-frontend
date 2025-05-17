import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CreateBalanceButton() {
  return (
    <Link href={"/balances/create"}>
      <Button className="mb-3">Crear Balance</Button>
    </Link>
  );
}
