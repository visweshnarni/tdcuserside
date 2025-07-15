"use client";

import { useMemo, useState } from "react";
import { GscRecord } from "@/app/types/appointments/gsc";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  data: GscRecord[];
}

export default function GscDataTable({ data }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredData = useMemo(() => {
    return data.filter((record) =>
      record.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.registrationNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="rounded-md border bg-white shadow-md">
      {/* Search bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-4 border-b">
        <Input
          placeholder="Search by name or registration no."
          className="w-full md:w-1/2"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Registration No.</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Slot</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.length > 0 ? (
            paginatedData.map((record) => (
              <TableRow key={record.id}>
                <TableCell>{record.name}</TableCell>
                <TableCell>{record.registrationNumber}</TableCell>
                <TableCell>{record.category}</TableCell>
                <TableCell>{record.appointmentDate}</TableCell>
                <TableCell>{record.slot}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-6 text-gray-500">
                No matching records found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center px-4 py-3 border-t">
          <p className="text-sm text-gray-600">
            Showing{" "}
            {Math.min((currentPage - 1) * itemsPerPage + 1, filteredData.length)} to{" "}
            {Math.min(currentPage * itemsPerPage, filteredData.length)} of{" "}
            {filteredData.length} records
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="text-[#00694A] border-[#00694A] hover:bg-[#00694A] hover:text-white"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="text-[#00694A] border-[#00694A] hover:bg-[#00694A] hover:text-white"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
