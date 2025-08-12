"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RenFormSchema, RenFormData } from "@/lib/appointments/renFormSchema";
import { RenRecord } from "@/app/types/appointments/ren";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: RenRecord) => void;
  doctor: Pick<RenRecord, "name" | "registrationNumber" | "category">;
}

// Inline slot list grouped by catId (1 = Morning, 2 = Afternoon)
const allSlots = [
  
  { id: 28, name: "1:30 PM to 1:40 PM", catId: 2 },
  { id: 29, name: "1:40 PM to 1:45 PM", catId: 2 },
  { id: 30, name: "1:45 PM to 1:50 PM", catId: 2 },
  { id: 31, name: "1:50 PM to 1:55 PM", catId: 2 },
  { id: 32, name: "1:55 PM to 2:00 PM", catId: 2 },
  { id: 33, name: "2:00 PM to 2:05 PM", catId: 2 },
  { id: 34, name: "2:05 PM to 2:10 PM", catId: 2 },
  { id: 35, name: "2:10 PM to 2:15 PM", catId: 2 },
  { id: 36, name: "2:15 PM to 2:20 PM", catId: 2 },
  { id: 37, name: "2:20 PM to 2:25 PM", catId: 2 },
  { id: 38, name: "2:25 PM to 2:30 PM", catId: 2 },
  { id: 39, name: "2:30 PM to 2:35 PM", catId: 2 },
  { id: 40, name: "2:35 PM to 2:40 PM", catId: 2 },
  { id: 41, name: "2:40 PM to 2:45 PM", catId: 2 },
  { id: 42, name: "2:45 PM to 2:50 PM", catId: 2 },
  { id: 43, name: "2:50 PM to 2:55 PM", catId: 2 },
  { id: 44, name: "2:55 PM to 3:00 PM", catId: 2 },
  { id: 45, name: "3:00 PM to 3:05 PM", catId: 2 },
  { id: 46, name: "3:05 PM to 3:10 PM", catId: 2 },
  { id: 47, name: "3:10 PM to 3:15 PM", catId: 2 },
  { id: 48, name: "3:15 PM to 3:20 PM", catId: 2 },
  { id: 49, name: "3:20 PM to 3:25 PM", catId: 2 },
  { id: 50, name: "3:25 PM to 3:30 PM", catId: 2 },
  { id: 51, name: "3:30 PM to 3:35 PM", catId: 2 },
  { id: 52, name: "3:35 PM to 3:40 PM", catId: 2 },
  { id: 53, name: "3:40 PM to 3:45 PM", catId: 2 },
  { id: 54, name: "3:45 PM to 3:50 PM", catId: 2 },
  // ADDED: New afternoon slots up to 4:30 PM
  { id: 55, name: "3:50 PM to 3:55 PM", catId: 2 },
  { id: 56, name: "3:55 PM to 4:00 PM", catId: 2 },
  { id: 57, name: "4:00 PM to 4:05 PM", catId: 2 },
  { id: 58, name: "4:05 PM to 4:10 PM", catId: 2 },
  { id: 59, name: "4:10 PM to 4:15 PM", catId: 2 },
  { id: 60, name: "4:15 PM to 4:20 PM", catId: 2 },
  { id: 61, name: "4:20 PM to 4:25 PM", catId: 2 },
  { id: 62, name: "4:25 PM to 4:30 PM", catId: 2 },
];

export default function RenFormDrawer({
  open,
  onClose,
  onSubmit,
  doctor,
}: Props) {
  const {
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<RenFormData>({
    resolver: zodResolver(RenFormSchema),
    defaultValues: {
      appointmentDate: undefined,
      slot: "",
    },
  });

  const appointmentDate = watch("appointmentDate");

  useEffect(() => {
    if (open) {
      reset();
    }
  }, [open, reset]);

  // UPDATED: Filter only afternoon slots
  const filteredSlots = allSlots.filter((slot) => slot.catId === 2);

  const submitHandler = (data: RenFormData) => {
    const newRecord: RenRecord = {
      id: Date.now().toString(),
      name: doctor.name,
      registrationNumber: doctor.registrationNumber,
      category: doctor.category,
      appointmentDate: data.appointmentDate
        ? format(data.appointmentDate, "yyyy-MM-dd")
        : "",
      slot: data.slot,
    };
    onSubmit(newRecord);
    onClose();
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-[50vw] overflow-y-auto"
      >
        <SheetHeader>
          <SheetTitle className="text-2xl font-francois-one text-[#00694A] text-center mt-8">
            Book Renewal Appointment
          </SheetTitle>
        </SheetHeader>

        <form
          onSubmit={handleSubmit(submitHandler)}
          className="grid grid-cols-1 gap-6 px-6 pt-6 pb-10"
        >
          {/* Doctor Name */}
          <div>
            <Label className="block mb-2 text-sm font-medium text-gray-700">
              Doctor Name
            </Label>
            <div className="w-full px-3 py-2 border rounded-md bg-gray-50 text-gray-800">
              {doctor.name}
            </div>
          </div>

          {/* Appointment Date */}
          <div>
            <Label className="block mb-2">
              Appointment Date <span className="text-red-600">*</span>
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  {appointmentDate ? (
                    format(appointmentDate, "PPP")
                  ) : (
                    <span>Select date</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={appointmentDate}
                  onSelect={(date) => {
                    if (date) {
                      setValue("appointmentDate", date);
                    }
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {errors.appointmentDate && (
              <p className="text-sm text-red-600 mt-1">
                {errors.appointmentDate.message}
              </p>
            )}
          </div>

          {/* Slot Dropdown */}
          <div>
            <Label className="block mb-2">
              Select Slot <span className="text-red-600">*</span>
            </Label>
            <Select
              value={watch("slot")}
              onValueChange={(value) => setValue("slot", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose slot" />
              </SelectTrigger>
              <SelectContent>
                {filteredSlots.map((slot) => (
                  <SelectItem key={slot.id} value={slot.name}>
                    {slot.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.slot && (
              <p className="text-sm text-red-600 mt-1">{errors.slot.message}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="fixed bottom-0 w-full sm:max-w-[50vw] bg-white border-t border-[#004d36]/20 p-10 py-4 flex justify-between items-center">
            <Button
              variant="outline"
              type="button"
              onClick={onClose}
              className="text-[#6b0000] border-[#6b0000] hover:bg-[#6b0000] hover:text-white px-10"
            >
              Close
            </Button>
            <Button
              type="submit"
              className="bg-[#00694A] hover:bg-[#004d36] text-white"
            >
              Book
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
