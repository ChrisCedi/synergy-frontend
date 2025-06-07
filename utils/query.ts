import { cookies } from "next/headers";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface QueryOptions {
  method?: HttpMethod;
  body?: unknown;
  params?: Record<string, string | number | boolean>;
  headers?: Record<string, string>;
}

export async function query<T = unknown>(
  endpoint: string,
  { method = "GET", body, params, headers = {} }: QueryOptions = {}
): Promise<T> {
  const cookieStore = await cookies();
  const url = new URL(`${process.env.BACKEND_URL}${endpoint}`);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, String(value));
    });
  }

  const res = await fetch(url.toString(), {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: cookieStore.get("token")?.value
        ? `Bearer ${cookieStore.get("token")?.value}`
        : "",
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error?.message || `Error ${res.status}: ${res.statusText}`);
  }

  return res.json();
}
