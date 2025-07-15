"use client";

import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NocRecord } from "@/app/types/noc";
import { generateDummyNocData } from "@/app/data/generateDummyNocData";
import NocDataTable from "@/app/components/dashboard/noc/NocDataTable";
import NocFormDrawer from "@/app/components/dashboard/noc/NocFormDrawer";

export default function NocPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [records, setRecords] = useState<NocRecord[]>(generateDummyNocData());
  const [editingRecord, setEditingRecord] = useState<NocRecord | undefined>(
    undefined
  );

  const handleAddNew = () => {
    setEditingRecord(undefined);
    setDrawerOpen(true);
  };

  const handleEdit = (record: NocRecord) => {
    setEditingRecord(record);
    setDrawerOpen(true);
  };

  const handleSubmit = (data: NocRecord) => {
    if (data.id) {
      setRecords((prev) =>
        prev.map((item) => (item.id === data.id ? { ...item, ...data } : item))
      );
    } else {
      const newData = { ...data, id: Date.now().toString() };
      setRecords((prev) => [newData, ...prev]);
    }
  };

  return (
    <div >
      <h1 className="text-3xl font-semibold text-[#00694A] font-francois-one mb-6 pb-2 text-center">
        No Objection Certificate
      </h1>
      <div className="flex justify-end mb-6">
        <Button
          onClick={handleAddNew}
          className="bg-[#00694A] hover:bg-[#004d36] text-white cursor-pointer"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Apply for New NOC
        </Button>
      </div>

      <NocDataTable data={records} onEdit={handleEdit} />
      <NocFormDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onSubmit={handleSubmit}
        defaultValues={editingRecord}
      />
    </div>
  );
}
