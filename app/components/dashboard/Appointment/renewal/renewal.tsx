"use client";

import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RenRecord } from "@/app/types/appointments/ren"; // ✅ type renamed
import RenDataTable from "./renewaltable";                // ✅ table component renamed
import RenFormDrawer from "./renewalformdrawer";          // ✅ drawer component renamed

interface RenProps {
  initialData: RenRecord[];
}

export default function Ren({ initialData }: RenProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const doctor = {
    name: "Dr. Anjali Rao",
    registrationNumber: "TS123456",
    category: "General Medicine",
  };

  const [renList, setRenList] = useState<RenRecord[]>(initialData);

  const handleAddNewRen = () => {
    setDrawerOpen(true);
  };

  const handleSubmitRen = (data: RenRecord) => {
    setRenList((prev) => [
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
        Renewal Appointments
      </h1>

      <div className="flex justify-end mb-6">
        <Button
          onClick={handleAddNewRen}
          className="bg-[#00694A] hover:bg-[#004d36] text-white"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Book Renewal
        </Button>
      </div>

      <RenDataTable data={renList} />

      <RenFormDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onSubmit={handleSubmitRen}
        doctor={doctor}
      />
    </div>
  );
}
