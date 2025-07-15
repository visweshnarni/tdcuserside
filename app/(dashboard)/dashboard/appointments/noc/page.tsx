"use client";

import Noc from "@/app/components/dashboard/Appointment/noc/noc";
import { NocRecord } from "@/app/types/appointments/noc";

const dummyData: NocRecord[] = [
  {
    id: "1",
    name: "Dr. Anjali Rao",
    registrationNumber: "TS123456",
    category: "General Medicine",
    appointmentDate: "2025-07-25",
    slot: "Morning",
  },
  {
    id: "2",
    name: "Dr. Anjali Rao",
    registrationNumber: "TS123456",
    category: "General Medicine",
    appointmentDate: "2025-07-28",
    slot: "Afternoon",
  },
];

export default function Page() {
  return <Noc initialData={dummyData} />;
}
