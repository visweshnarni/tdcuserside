"use client";

import Reg from "@/app/components/dashboard/Appointment/registration/registration";
import { RegRecord } from "@/app/types/appointments/reg";

const dummyData: RegRecord[] = [
  {
    id: "1",
    name: "Dr. Anjali Rao",
    registrationNumber: "TS123456",
    category: "General Medicine",
    appointmentDate: "2025-07-25",
    slot: "10:30 AM to 10:35 AM", // Morning slot
  },
  {
    id: "2",
    name: "Dr. Anjali Rao",
    registrationNumber: "TS123456",
    category: "General Medicine",
    appointmentDate: "2025-07-28",
    slot: "1:45 PM to 1:50 PM", // Afternoon slot
  },
];

export default function Page() {
  return <Reg initialData={dummyData} />;
}
