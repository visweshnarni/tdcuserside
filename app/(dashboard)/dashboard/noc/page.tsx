"use client";

import { useState, useEffect } from "react";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import NocDataTable from "@/app/components/dashboard/noc/NocDataTable";
import NocFormDrawer from "@/app/components/dashboard/noc/NocFormDrawer";
import { NocRecord } from "@/app/types/noc";
import axios from "axios";

export default function NocPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [records, setRecords] = useState<NocRecord[]>([]);
  const [editingRecord, setEditingRecord] = useState<NocRecord | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  // ✅ Fetch all NOC applications
  const fetchNocApplications = async () => {
      try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await axios.get<{ success: boolean; data: NocRecord[] }>(`${API_URL}/api/certificates/noc`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = response.data as { success: boolean; data: NocRecord[] };

      if (data.success) {
        setRecords(data.data);
      }
    } catch (error) {
      console.error("Failed to load NOC applications", error);
    }
  };

  useEffect(() => {
    fetchNocApplications();
  }, []);

  const handleAddNew = () => {
    setEditingRecord(undefined);
    setDrawerOpen(true);
  };

  const handleEdit = (record: NocRecord) => {
    setEditingRecord(record);
    setDrawerOpen(true);
  };

  // ✅ Handle both New + Edit Submit
const handleSubmit = async (formData: FormData, isEdit: boolean, appNo?: string) => {
  try {
    setLoading(true);
    const token = localStorage.getItem("token");
    if (!token) return;

    const endpoint = isEdit
  ? `${API_URL}/api/certificates/update-noc/${appNo}`
  : `${API_URL}/api/certificates/apply-noc`;

const response = await axios.post(endpoint, formData, {
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "multipart/form-data",
  },
});



    const data = (response as any).data as { success: boolean; [key: string]: any };

    if (data && data.success) {
      alert(isEdit ? "NOC updated successfully" : "NOC submitted successfully");
      fetchNocApplications();
    }
  } catch (error: any) {
    console.error("Error submitting NOC form:", error);
    alert(error?.response?.data?.error || "Something went wrong");
  } finally {
    setDrawerOpen(false);
    setLoading(false);
  }
};

  return (
    <div>
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
        loading={loading}
      />
    </div>
  );
}
