"use server";
import { CreateBalanceResponse } from "@/types/Balances";
import { query } from "@/utils/query";

import { getSessionData } from "@/utils/getSessionData";
import { CreateAcquisitionDto } from "@/types/Acquisition";
import { revalidatePath } from "next/cache";

export const createAcquisitionAction = async (body: CreateAcquisitionDto) => {
  console.log(body);
  const { user } = await getSessionData();
  const response: CreateBalanceResponse = await query("/acquisitions", {
    method: "POST",
    body,
  });

  revalidatePath("/balances/acquisitions/:id");

  return response;
};
