import { Title } from "@/components/ui/atoms/Title";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function UsersPage() {
  return (
    <div>
      <Title title="Clientes" />
      <Link href={"/customers/create"}>
        <Button>Registrar cliente</Button>
      </Link>
    </div>
  );
}
