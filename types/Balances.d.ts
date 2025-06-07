export interface Acquisition {
  id: number;
  name: string;
  description: string;
  cost: number;
  paymentMethod: string;
  initialPayment: number;
  remainingAmount: string;
  createdAt: string; // Puedes usar `Date` si lo parseas
  balanceId: number;
}

export interface Balance {
  id: number;
  companyName: string;
  capital: number;
  createdAt: string; // o Date
  companyCustomerId: number;
  acquisitions: Acquisition[];
}

export interface BalanceResponse {
  status: string;
  messsge: string; // (nota: parece que hay un typo en "message")
  data: Balance[];
}

export interface CreateBalanceResponse {
  status: string;
  data: {
    id: number;
    companyName: string;
    capital: number;
    companyCustomerId: number;
    createdAt: string; // o Date si lo parseas luego
  };
}
