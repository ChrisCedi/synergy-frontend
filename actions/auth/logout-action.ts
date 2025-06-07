"use server";
import { cookies } from "next/headers";

export const logOutAction = async () => {
  const cookieStore = await cookies();

  cookieStore.delete("token");
  cookieStore.delete("user");
  cookieStore.delete("permissions");
};
