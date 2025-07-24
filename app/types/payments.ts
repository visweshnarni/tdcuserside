export interface PaymentRecord {
  id: string;
  datetime: string;
  amount: number;
  purpose: "Renewal Payment" | "Membership Payment" | "GSC Payment";
}
