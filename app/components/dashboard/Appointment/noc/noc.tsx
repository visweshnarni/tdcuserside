"use client";

import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NocRecord } from "@/app/types/appointments/noc";
import NocDataTable from "./noctable";
import NocFormDrawer from "./nocformdrawer";

interface NocProps {
  initialData: NocRecord[];
}

export default function Noc({ initialData }: NocProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const doctor = {
    name: "Dr. Anjali Rao",
    registrationNumber: "TS123456",
    category: "General Medicine",
  };

  const [records, setRecords] = useState<NocRecord[]>(initialData);

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
    <div className="w-full px-4 sm:px-6 md:px-8 pt-6 max-w-screen-xl mx-auto">
      <h1 className="text-3xl font-semibold text-[#00694A] font-francois-one mb-6 text-center">
        No Objection Certificate Appointments
      </h1>

      <div className="flex justify-end mb-6">
        <Button
          onClick={handleAddNew}
          className="bg-[#00694A] hover:bg-[#004d36] text-white"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Book NOC Appointment
        </Button>
      </div>

      <NocDataTable data={records} />

      <NocFormDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onSubmit={handleSubmit}
        doctor={doctor}
      />
    </div>
  );
}
