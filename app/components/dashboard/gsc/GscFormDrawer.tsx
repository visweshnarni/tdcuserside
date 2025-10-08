"use client";

import { useEffect, useState } from "react";
import {
  Sheet, SheetContent, SheetHeader, SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { gscFormSchema, GscFormData } from "@/lib/gscFormSchema";
import { FileText } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: FormData, recordId?: string) => Promise<void> | void;
  defaultValues?: Partial<GscFormData> & { applicationNo?: string, status?: string };
}

const GSC_FIELDS = [
  { name: "tdc_reg_certificate_upload", label: "Current year’s TDC Registration certificate" },
  { name: "testimonial_d1_upload", label: "Testimonial of Dentist 1" },
  { name: "testimonial_d2_upload", label: "Testimonial of Dentist 2" },
  { name: "aadhaar_upload", label: "Aadhaar Photocopy" },
  { name: "tdc_reg_d1_upload", label: "Valid TDC Registration certificate of Dentist 1" },
  { name: "tdc_reg_d2_upload", label: "Valid TDC Registration certificate of Dentist 2" },
];

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

  useEffect(() => {
    reset(defaultValues || {});
    setIsSubmitting(false);
  }, [defaultValues, reset]);

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
      } else if (typeof value === 'string') {
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

  const renderPrevFile = (fieldName: keyof GscFormData) => {
    const existingUrl = defaultValues?.[fieldName];
    if (typeof existingUrl === 'string' && existingUrl.startsWith('http')) {
        return (
            <a 
                href={existingUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-xs flex items-center gap-1 mt-1"
            >
                <FileText className="h-3 w-3" />
                View Existing File
            </a>
        );
    }
    return null;
  };
  
  const isEditing = !!defaultValues?.applicationNo;
  const status = defaultValues?.status || 'New';

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent 
        side="right" 
        // IMPORTANT: The padding-bottom must be large enough to show the submit button bar
        className="w-full sm:max-w-[50vw] overflow-y-auto pb-32" 
      >
        <SheetHeader>
          <SheetTitle className="text-2xl font-francois-one text-[#00694A] text-center mt-8">
            {defaultValues ? "Edit Application" : "New GSC Application"}
          </SheetTitle>
        </SheetHeader>
        
        {/* Application Status and Number Display (when editing) */}
        {isEditing && (
            <div className="flex justify-between items-center bg-gray-100 p-3 rounded-md text-sm my-4 border border-gray-300">
                <div className="font-medium text-gray-700">
                    Application No: <span className="font-bold text-[#00694A]">{defaultValues.applicationNo}</span>
                </div>
                <div className={`text-xs font-semibold px-2 py-1 rounded-full ${status === 'Pending' ? 'bg-yellow-200 text-yellow-800' : status === 'Approved' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                    Status: {status}
                </div>
            </div>
        )}

        <FormProvider {...methods}>
          <form 
            onSubmit={handleSubmit(submitHandler)} 
            // The form grid is now independent of the button bar
            className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 pt-6"
          >
            {/* Form Fields Mapping */}
            {GSC_FIELDS.map((field) => (
                <div key={field.name}>
                    <Label className="block mb-2">
                        {field.label} 
                        <span className="text-red-600">*</span>
                    </Label>
                    
                    <Input 
                        type="file" 
                        accept="application/pdf" 
                        className={fileInputClassName}
                        {...register(field.name as keyof GscFormData)} 
                    />
                    
                    {/* View Previous File Link */}
                    {renderPrevFile(field.name as keyof GscFormData)}
                    
                    {errors[field.name as keyof GscFormData] && (
                        <p className="text-sm text-red-600 mt-1">{errors[field.name as keyof GscFormData]?.message as string}</p>
                    )}
                </div>
            ))}

            {/* Postal Address */}
            <div className="md:col-span-2">
              <Label className="block mb-2">Postal Address with Pincode <span className="text-red-600">*</span></Label>
              <Textarea placeholder="Enter full postal address" {...register("postal_address")} />
              {errors.postal_address && (<p className="text-sm text-red-600 mt-1">{errors.postal_address.message}</p>)}
            </div>
          </form>
        </FormProvider>

        {/* Submit Button (Fixed bottom action bar) */}
        {/* We move the action bar OUTSIDE the form element to the SheetContent's root children */}
        <div className="fixed bottom-0 right-0 w-full bg-white border-t border-[#004d36]/20 p-4 shadow-lg sm:w-[50vw] flex justify-between items-center z-10">
            <Button 
                variant="outline" 
                type="button" 
                onClick={onClose} 
                className="text-[#6b0000] border-[#6b0000] hover:bg-[#6b0000] hover:text-white cursor-pointer px-10"
            >
                Close
            </Button>
            {/* The form submission must be triggered by clicking this button */}
            <Button 
                type="submit" 
                className="bg-[#00694A] hover:bg-[#004d36] text-white cursor-pointer" 
                disabled={isSubmitting}
                onClick={handleSubmit(submitHandler)} // CRITICAL: This links the button to the form
            >
                {isEditing ? "Update/Re-Submit" : "Submit/Pay"}
            </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}