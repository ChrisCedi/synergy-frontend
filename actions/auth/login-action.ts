"use server";

import { query } from "@/utils/query";
import { cookies } from "next/headers";

export const loginAction = async (body: {
  email: string;
  password: string;
}) => {
  const cookieStore = await cookies();
  const response: {
    status: string;
    token: string;
    data: {
      id: number;
      role: string;
    };
  } = await query("/auth/login", {
    method: "POST",
    body: {
      email: body.email,
      pass: body.password,
    },
  });

  const permissions =
    response.data.role == "financiero"
      ? {
          balances: {
            see: true,
            create: false,
            edit: false,
            generate: true,
          },
          companyCustomer: {
            see: false,
            create: true,
            edit: true,
          },
        }
      : response.data.role == "admin"
      ? {
          balances: {
            see: false,
            create: false,
            edit: false,
            generate: false,
          },
          companyCustomer: {
            see: true,
            create: true,
            edit: true,
          },
        }
      : {
          balances: {
            see: true,
            create: true,
            edit: true,
            generate: false,
          },
          companyCustomer: {
            see: false,
            create: true,
            edit: true,
          },
        };

  cookieStore.set("token", response.token);
  cookieStore.set("permissions", JSON.stringify(permissions));
};
