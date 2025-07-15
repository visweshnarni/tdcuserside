// GscPage.tsx

"use client";

import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NocRecord } from "@/app/types/appointments/noc";
import NocDataTable from "@/app/components/dashboard/Appointment/noc/noctable";
import NocFormDrawer from "@/app/components/dashboard/Appointment/noc/nocformdrawer";

export default function NocPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const doctor = {
    name: "Dr. Anjali Rao",
    registrationNumber: "TS123456",
    category: "General Medicine",
  };

  const [records, setRecords] = useState<NocRecord[]>([
    {
      id: "1",
      ...doctor,
      appointmentDate: "2025-07-20",
      slot: "Morning",
    },
    {
      id: "2",
      ...doctor,
      appointmentDate: "2025-07-22",
      slot: "Afternoon",
    },
  ]);

  const handleAddNew = () => {
    setDrawerOpen(true);
  };

  const handleSubmit = (data: NocRecord) => {
    setRecords((prev) => [
      {
        ...data,
        id: Date.now().toString(),
        ...doctor,
      },
      ...prev,
    ]);
  };

  return (
    <div className="w-full px-4 sm:px-6 md:px-8 pt-6 md:pl-72 max-w-screen-xl mx-auto">
      <h1 className="text-3xl font-semibold text-[#00694A] font-francois-one mb-6 text-center">
        No Objection Certificate Appointments
      </h1>

      <div className="flex justify-end mb-6">
        <Button
          onClick={handleAddNew}
          className="bg-[#00694A] hover:bg-[#004d36] text-white"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Book Appointment
        </Button>
      </div>

      <NocDataTable data={records} />

      <NocFormDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onSubmit={handleSubmit}
        doctor={doctor} // ✅ Fix: Pass the doctor prop here
      />
    </div>
  );
}
