"use client";

import { useState, useMemo } from "react";
import { NocRecord } from "@/app/types/noc";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Download, ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  data: NocRecord[];
  onEdit: (record: NocRecord) => void;
}

export default function NocDataTable({ data, onEdit }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredData = useMemo(() => {
    return data.filter((record) => {
      const matchesSearch =
        record.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.applicationNo?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "All" || record.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [data, searchTerm, statusFilter]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getStatusClass = (status: string) => {
    return (
      {
        Approved: "bg-green-100 text-green-800",
        Pending: "bg-yellow-100 text-yellow-800",
        Rejected: "bg-red-100 text-red-800",
      }[status] || "bg-gray-100 text-gray-800"
    );
  };

  return (
    <div className="rounded-md border bg-white shadow-md overflow-x-auto">
      {/* Filters */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-4 border-b">
        <Input
          placeholder="Search by name or application no."
          className="w-full md:w-1/2"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />

        <Select
          value={statusFilter}
          onValueChange={(value) => {
            setStatusFilter(value);
            setCurrentPage(1);
          }}
        >
          <SelectTrigger className="w-full md:w-[200px] cursor-pointer">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="Approved">Approved</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <Table className="w-full table-auto text-sm">
        <TableHeader>
          <TableRow>
            <TableHead className="text-center px-2 py-2">Name</TableHead>
            <TableHead className="text-center px-2 py-2">Application No.</TableHead>
            <TableHead className="text-center px-2 py-2">Application Date</TableHead>
            <TableHead className="text-center px-2 py-2">Status</TableHead>
            <TableHead className="text-center px-2 py-2">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.length > 0 ? (
            paginatedData.map((record, idx) => (
              <TableRow key={record.applicationNo ?? idx}>
                <TableCell className="text-center px-2 py-2">{record.name}</TableCell>
                <TableCell className="text-center px-2 py-2">{record.applicationNo}</TableCell>
                <TableCell className="text-center px-2 py-2">{record.applicationDate}</TableCell>
                <TableCell className="text-center px-2 py-2">
                  <span
                    className={`text-sm px-3 py-1 rounded-full font-medium ${getStatusClass(
                      record.status ?? ""
                    )}`}
                  >
                    {record.status}
                  </span>
                </TableCell>
                <TableCell className="text-center px-2 py-2">
                  {record.status === "Pending" && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-[#00694A] border-[#00694A] hover:bg-[#00694A] hover:text-[#FFFF] cursor-pointer"
                      onClick={() => onEdit(record)}
                    >
                      Edit/Re-Submit
                    </Button>
                  )}
                  {record.status === "Approved" && (
                    <Button
                      variant="outline"
                      size="icon"
                      className="text-sm text-[#00694A] hover:bg-[#00694A] hover:text-[#FFFFFF] border-[#00694A] cursor-pointer ml-4 rounded-full"
                    >
                      <Download />
                      <span className="sr-only">Download</span>
                    </Button>
                  )}
                </TableCell>
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

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center px-4 py-3 border-t">
          <p className="text-sm text-gray-600">
            Showing{" "}
            {Math.min(
              (currentPage - 1) * itemsPerPage + 1,
              filteredData.length
            )}{" "}
            to {Math.min(currentPage * itemsPerPage, filteredData.length)} of{" "}
            {filteredData.length} records
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="text-[#00694A] border-[#00694A] hover:bg-[#00694A] hover:text-[#FFFF] cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="text-[#00694A] border-[#00694A] hover:bg-[#00694A] hover:text-[#FFFF] cursor-pointer"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
