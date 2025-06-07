import { cookies } from "next/headers";

// Tipos para reforzar el uso y autocompletado
interface User {
  id: number | null;
  name: string;
  role: string;
  companyCustomerId: number | string;
}

interface Permissions {
  balances: {
    see: boolean;
    create: boolean;
    edit: boolean;
    generate: boolean;
  };
  companyCustomer: {
    see: boolean;
    create: boolean;
    edit: boolean;
  };
}

export async function getSessionData(): Promise<{
  user: User;
  permissions: Permissions | null;
  token: string | null;
}> {
  const cookieStore = await cookies();

  // Token
  const token = cookieStore.get("token")?.value || null;

  // User
  const userCookie = cookieStore.get("user")?.value;
  let user: User = {
    id: null,
    name: "",
    role: "",
    companyCustomerId: "",
  };
  try {
    if (userCookie) {
      user = JSON.parse(userCookie);
    }
  } catch (_) {
    // fallback to default user
  }

  // Permissions
  const permissionsCookie = cookieStore.get("permissions")?.value;
  let permissions: Permissions | null = null;
  try {
    if (permissionsCookie) {
      permissions = JSON.parse(permissionsCookie);
    }
  } catch (_) {
    // fallback to null
  }

  return { user, permissions, token };
}
