"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NocFormSchema, NocFormData } from "@/lib/appointments/nocFormSchema";
import { NocRecord } from "@/app/types/appointments/noc";
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
import { useEffect } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: NocRecord) => void;
  doctor: Pick<NocRecord, "name" | "registrationNumber" | "category">;
}

export default function NocFormDrawer({
  open,
  onClose,
  onSubmit,
  doctor, // ✅ You missed this line!
}: Props) {

  const {
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<NocFormData>({
    resolver: zodResolver(NocFormSchema),
    defaultValues: {
      appointmentDate: undefined,
      slot: "",
    },
  });

  useEffect(() => {
    if (open) {
      reset(); // Clear form when drawer opens
    }
  }, [open, reset]);

  const appointmentDate = watch("appointmentDate");
  

 const submitHandler = (data: NocFormData) => {
  const newRecord: NocRecord = {
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
            Book Appointment
          </SheetTitle>
        </SheetHeader>

        <form
          onSubmit={handleSubmit(submitHandler)}
          className="grid grid-cols-1 gap-6 px-6 pt-6 pb-10"
        >
          {/* Doctor Name (read-only) */}
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

          {/* Slot */}
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
                <SelectItem value="Morning">Morning</SelectItem>
                <SelectItem value="Afternoon">Afternoon</SelectItem>
                <SelectItem value="Evening">Evening</SelectItem>
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
              className="text-[#6b0000] border-[#6b0000] hover:bg-[#6b0000] hover:text-white cursor-pointer px-10"
            >
              Close
            </Button>
            <Button
              type="submit"
              className="bg-[#00694A] hover:bg-[#004d36] text-white cursor-pointer"
            >
              Book
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
