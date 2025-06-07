"use server";
import { CreateBalanceResponse } from "@/types/Balances";
import { query } from "@/utils/query";

import { getSessionData } from "@/utils/getSessionData";
import { CreateAcquisitionDto } from "@/types/Acquisition";
import { revalidatePath } from "next/cache";
import { CompanyCustomerDto } from "@/types/Company";

export const createUserAction = async (body: {
  name: string;
  lastName: string;
  email: string;
  role: string;
  password: string;
  companyCustomerId: number;
}) => {
  //  const { user } = await getSessionData();
  const response: CompanyCustomerDto = await query("/users", {
    method: "POST",
    body,
  });

  // revalidatePath("/balances/acquisitions/:id");

  return response;
};
