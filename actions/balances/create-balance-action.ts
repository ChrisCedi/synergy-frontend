"use server";
import { CreateBalanceResponse } from "@/types/Balances";
import { query } from "@/utils/query";

import { getSessionData } from "@/utils/getSessionData";

export const createBalanceAction = async (body: {
  companyName: string;
  capital: number;
}) => {
  console.log(body);
  const { user } = await getSessionData();
  const response: CreateBalanceResponse = await query("/balances", {
    method: "POST",
    body: {
      ...body,
      capital: +body.capital,
      companyCustomerId: user.companyCustomerId,
    },
  });

  return response;
};
