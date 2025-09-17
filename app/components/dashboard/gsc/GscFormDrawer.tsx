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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { gscFormSchema, GscFormData } from "@/lib/gscFormSchema";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: FormData, recordId?: string) => Promise<void> | void;
  defaultValues?: Partial<GscFormData> & { applicationNo?: string };
}

export default function GscFormDrawer({
  open,
  onClose,
  onSubmit,
  defaultValues,
}: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const methods = useForm<GscFormData>({
    resolver: zodResolver(gscFormSchema),
    defaultValues: defaultValues || {},
  });

  const { register, handleSubmit, reset, formState: { errors } } = methods;

  // Reset form fields and submitting state on defaultValues change
  useEffect(() => {
    reset(defaultValues || {});
    setIsSubmitting(false);
  }, [defaultValues, reset]);

  // Reset submitting state when drawer open state changes (opens)
  useEffect(() => {
    if (open) {
      setIsSubmitting(false);
    }
  }, [open]);

  const submitHandler: SubmitHandler<GscFormData> = async (data) => {
    setIsSubmitting(true);
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value instanceof FileList && value.length > 0) {
        formData.append(key, value[0]);
      } else if (typeof value === "string") {
        formData.append(key, value);
      }
    });

    try {
      await onSubmit(formData, defaultValues?.applicationNo);
    } finally {
      setIsSubmitting(false);
    }
  };

  const fileInputClassName =
    "block w-full h-10 text-sm text-gray-900 border border-gray-300 rounded-md bg-white " +
    "file:h-full file:bg-[#EFEFEF] file:text-gray-700 file:font-medium file:border-1 file:rounded-l-md " +
    "file:rounded-r-md file:px-4 file:cursor-pointer file:text-center";

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:max-w-[50vw] overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-2xl font-francois-one text-[#00694A] text-center mt-8">
            {defaultValues ? "Edit Application" : "New GSC Application"}
          </SheetTitle>
        </SheetHeader>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(submitHandler)} className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 pt-6 pb-10">
            {/* File upload fields */}
            <div>
              <Label className="block mb-2">
                Current year’s TDC Registration certificate <span className="text-red-600">*</span>
              </Label>
              <Input
                type="file"
                accept="application/pdf"
                className={fileInputClassName}
                {...register("tdc_reg_certificate_upload")}
              />
              {errors.tdc_reg_certificate_upload && (
                <p className="text-sm text-red-600 mt-1">{errors.tdc_reg_certificate_upload.message}</p>
              )}
            </div>
            <div>
              <Label className="block mb-2">
                Testimonial of Dentist 1 <span className="text-red-600">*</span>
              </Label>
              <Input
                type="file"
                accept="application/pdf"
                className={fileInputClassName}
                {...register("testimonial_d1_upload")}
              />
              {errors.testimonial_d1_upload && (
                <p className="text-sm text-red-600 mt-1">{errors.testimonial_d1_upload.message}</p>
              )}
            </div>
            <div>
              <Label className="block mb-2">
                Testimonial of Dentist 2 <span className="text-red-600">*</span>
              </Label>
              <Input
                type="file"
                accept="application/pdf"
                className={fileInputClassName}
                {...register("testimonial_d2_upload")}
              />
              {errors.testimonial_d2_upload && (
                <p className="text-sm text-red-600 mt-1">{errors.testimonial_d2_upload.message}</p>
              )}
            </div>
            <div>
              <Label className="block mb-2">
                Aadhaar Photocopy <span className="text-red-600">*</span>
              </Label>
              <Input
                type="file"
                accept="application/pdf"
                className={fileInputClassName}
                {...register("aadhaar_upload")}
              />
              {errors.aadhaar_upload && (
                <p className="text-sm text-red-600 mt-1">{errors.aadhaar_upload.message}</p>
              )}
            </div>
            <div>
              <Label className="block mb-2">
                Valid TDC Registration certificate of Dentist 1 <span className="text-red-600">*</span>
              </Label>
              <Input
                type="file"
                accept="application/pdf"
                className={fileInputClassName}
                {...register("tdc_reg_d1_upload")}
              />
              {errors.tdc_reg_d1_upload && (
                <p className="text-sm text-red-600 mt-1">{errors.tdc_reg_d1_upload.message}</p>
              )}
            </div>
            <div>
              <Label className="block mb-2">
                Valid TDC Registration certificate of Dentist 2 <span className="text-red-600">*</span>
              </Label>
              <Input
                type="file"
                accept="application/pdf"
                className={fileInputClassName}
                {...register("tdc_reg_d2_upload")}
              />
              {errors.tdc_reg_d2_upload && (
                <p className="text-sm text-red-600 mt-1">{errors.tdc_reg_d2_upload.message}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <Label className="block mb-2">
                Postal Address with Pincode <span className="text-red-600">*</span>
              </Label>
              <Textarea placeholder="Enter full postal address" {...register("postal_address")} />
              {errors.postal_address && <p className="text-sm text-red-600 mt-1">{errors.postal_address.message}</p>}
            </div>

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
                disabled={isSubmitting}
              >
                {defaultValues ? "Update/Re-Submit" : "Submit/Pay"}
              </Button>
            </div>
          </form>
        </FormProvider>
      </SheetContent>
    </Sheet>
  );
}
