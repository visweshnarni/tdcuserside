"use client";

import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RegRecord } from "@/app/types/appointments/reg";
import RegDataTable from "./registrationtable";
import RegFormDrawer from "./registartionformdrawer";

interface RegProps {
  initialData: RegRecord[];
}

export default function Reg({ initialData }: RegProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const doctor = {
    name: "Dr. Anjali Rao",
    registrationNumber: "TS123456",
    category: "General Medicine",
  };

  const [regList, setRegList] = useState<RegRecord[]>(initialData);

  const handleAddNewReg = () => {
    setDrawerOpen(true);
  };

  const handleSubmitReg = (data: RegRecord) => {
    setRegList((prev) => [
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
        Registration Appointments
      </h1>

      <div className="flex justify-end mb-6">
        <Button
          onClick={handleAddNewReg}
          className="bg-[#00694A] hover:bg-[#004d36] text-white"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Book Appointment
        </Button>
      </div>

      <RegDataTable data={regList} />

      <RegFormDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onSubmit={handleSubmitReg}
        doctor={doctor}
      />
    </div>
  );
}
