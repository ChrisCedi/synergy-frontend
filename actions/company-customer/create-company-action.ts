"use server";
import { CreateBalanceResponse } from "@/types/Balances";
import { query } from "@/utils/query";

import { getSessionData } from "@/utils/getSessionData";
import { CreateAcquisitionDto } from "@/types/Acquisition";
import { revalidatePath } from "next/cache";
import { CompanyCustomerDto } from "@/types/Company";

export const createCompanyAction = async (body: {
  companyName: string;
  rfc: string;
}) => {
  //  const { user } = await getSessionData();
  const response: CompanyCustomerDto = await query("/company-customers", {
    method: "POST",
    body,
  });

  // revalidatePath("/balances/acquisitions/:id");

  return response;
};
