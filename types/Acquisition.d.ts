export type Acquisition = {
  id: number;
  name: string;
  description: string;
  cost: number;
  paymentMethod: string;
  initialPayment: number;
  remainingAmount: string;
  createdAt: string;
};

export type AcquisitionFormValues = {
  name: string;
  description: string;
  cost: number;
  paymentMethod: string;
  initialPayment: number;
  remainingAmount: string;
};

export interface AcquisitionsResponse {
  status: string;
  message: string;
  data: Acquisition[];
}
