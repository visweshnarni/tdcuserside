import PaymentList from "@/app/components/dashboard/Payments";
import { payments } from "@/app/data/dummypayments";

export default function PaymentsPage() {
  return (
    <div>
      <h1 className="text-3xl font-semibold text-[#00694A] font-francois-one mb-6 pb-2 text-center">
        Payments
      </h1>
      <PaymentList data={payments} />
    </div>
  );
}
