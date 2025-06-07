export interface User {
  id: number;
  name: string;
  lastName: string;
  email: string;
  password: string;
  role: "admin" | "financiero" | "capturista" | string; // puedes ajustar los roles según tus enums
  createdAt: string; // o Date si conviertes el dato
  companyCustomerId: number;
}

export type UsersResponse = User[];
