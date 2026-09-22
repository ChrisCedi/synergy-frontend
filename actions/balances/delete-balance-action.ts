"use server";
import { CreateBalanceResponse } from "@/types/Balances";
import { query } from "@/utils/query";

import { getSessionData } from "@/utils/getSessionData";
import { revalidatePath } from "next/cache";

export const deleteBalanceAction = async (id: string) => {
  const response = await query(`/balances/${id}`, {
    method: "DELETE",
  });

  revalidatePath("/balances");

  return response;
};
