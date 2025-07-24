import { PaymentRecord } from "@/app/types/payments";

const purposes = ["Renewal Payment", "Membership Payment", "GSC Payment"] as const;

function getRandomDate(): string {
  const date = new Date(
    Date.now() - Math.floor(Math.random() * 10000000000)
  );
  return date.toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function getRandomAmount(): number {
  return Math.floor(Math.random() * 3000) + 500;
}

function getRandomPurpose(): PaymentRecord["purpose"] {
  return purposes[Math.floor(Math.random() * purposes.length)];
}

export const payments: PaymentRecord[] = Array.from({ length: 25 }, (_, i) => ({
  id: `PAY-${1000 + i}`,
  datetime: getRandomDate(),
  amount: getRandomAmount(),
  purpose: getRandomPurpose(),
}));
