export type Company = {
  name: string;
  capital: number;
};

export interface CompanyCustomerDto {
  id: number;
  companyName: string;
  rfc: string;
  createdAt: string; // o Date si la conviertes
}
