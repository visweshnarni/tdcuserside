"use client";

import Gsc from "@/app/components/dashboard/Appointment/gsc/gsc";
import { GscRecord } from "@/app/types/appointments/gsc";

const dummyData: GscRecord[] = [
  {
    id: "1",
    name: "Dr. Anjali Rao",
    registrationNumber: "TS123456",
    category: "General Medicine",
    appointmentDate: "2025-07-20",
    slot: "Morning",
  },
  {
    id: "2",
    name: "Dr. Anjali Rao",
    registrationNumber: "TS123456",
    category: "General Medicine",
    appointmentDate: "2025-07-22",
    slot: "Afternoon",
  },
];

export default function Page() {
  return <Gsc initialData={dummyData} />;
}
