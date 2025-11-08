"use client";

import { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { nocFormSchema, NocFormData } from "@/lib/nocFormSchema";
import { NocRecord } from "@/app/types/noc";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (formData: FormData, isEdit: boolean, appNo?: string) => void;
  defaultValues?: Partial<NocRecord>;
  loading?: boolean;
}

export default function NocFormDrawer({
  open,
  onClose,
  onSubmit,
  defaultValues,
  loading,
}: Props) {
  const isEdit = !!defaultValues?.applicationNo;

const {
  register,
  handleSubmit,
  reset,
  formState: { errors },
} = useForm<NocFormData>({
  resolver: zodResolver(nocFormSchema(isEdit)), // ✅ pass dynamic schema
  defaultValues: defaultValues || {},
});


  useEffect(() => {
    reset(defaultValues || {});
  }, [defaultValues, reset]);
// ✅ Build FormData dynamically
const submitHandler = (data: NocFormData) => {
  const formData = new FormData();
  formData.append("dental_council_name", data.dental_council_name);
  formData.append("postal_address", data.postal_address);

  if (data.current_tdc_reg_certificate instanceof FileList && data.current_tdc_reg_certificate.length > 0) {
    formData.append("tdc_reg_certificate_upload", data.current_tdc_reg_certificate[0]);
  }

  if (data.aadhaar_upload instanceof FileList && data.aadhaar_upload.length > 0) {
    formData.append("aadhaar_upload", data.aadhaar_upload[0]);
  }

  if (data.payment_id) {
    formData.append("payment_id", data.payment_id);
  }

  onSubmit(formData, isEdit, defaultValues?.applicationNo);
};

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:max-w-[50vw] overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-2xl font-francois-one text-[#00694A] text-center mt-8">
            {isEdit
              ? "Edit / Re-Submit No Objection Certificate"
              : "Apply for New No Objection Certificate"}
          </SheetTitle>
        </SheetHeader>

        <form
          onSubmit={handleSubmit(submitHandler)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 pt-6 pb-24"
        >
          {/* Fields */}
          <div>
            <Label className="block mb-2">
              Transferee State Dental Council Name <span className="text-red-600">*</span>
            </Label>
            <Input
              type="text"
              placeholder="Enter Dental Council Name"
              {...register("dental_council_name")}
            />
            {errors.dental_council_name && (
              <p className="text-red-600 text-xs mt-1">
                {errors.dental_council_name.message}
              </p>
            )}
          </div>

          <div>
            <Label className="block mb-2">
              Postal Address with Pincode <span className="text-red-600">*</span>
            </Label>
            <Textarea
              placeholder="Enter Postal Address"
              rows={4}
              {...register("postal_address")}
            />
            {errors.postal_address && (
              <p className="text-red-600 text-xs mt-1">
                {errors.postal_address.message}
              </p>
            )}
          </div>

          {/* Existing File Previews (Edit Mode) */}
          {isEdit && (
            <>
              {defaultValues?.tdc_reg_certificate_upload && (
                <div>
                  <Label className="block mb-2">Existing Registration Certificate</Label>
                  <a
                    href={defaultValues.tdc_reg_certificate_upload}
                    target="_blank"
                    className="text-blue-600 underline text-sm"
                  >
                    View uploaded file
                  </a>
                </div>
              )}

              {defaultValues?.aadhaar_upload && (
                <div>
                  <Label className="block mb-2">Existing Aadhaar File</Label>
                  <a
                    href={defaultValues.aadhaar_upload}
                    target="_blank"
                    className="text-blue-600 underline text-sm"
                  >
                    View uploaded file
                  </a>
                </div>
              )}
            </>
          )}

          {/* File Uploads */}
          <div>
            <Label className="block mb-2">
              Upload Current Year’s TDC Registration Certificate (PDF)
            </Label>
            <Input
              type="file"
              accept="application/pdf"
              {...register("current_tdc_reg_certificate")}
            />
          </div>

          <div>
            <Label className="block mb-2">Upload Aadhaar Photocopy (PDF)</Label>
            <Input type="file" accept="application/pdf" {...register("aadhaar_upload")} />
          </div>

          {/* Action Bar */}
          <div className="fixed bottom-0 w-full sm:max-w-[50vw] bg-white border-t border-gray-200 p-6 flex justify-between">
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
              disabled={loading}
              className="bg-[#00694A] hover:bg-[#004d36] text-white cursor-pointer"
            >
              {isEdit ? "Update / Re-Submit" : "Submit / Pay"}
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
