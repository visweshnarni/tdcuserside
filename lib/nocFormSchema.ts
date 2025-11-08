import { z } from "zod";

export const nocFormSchema = (isEdit: boolean) =>
  z.object({
    dental_council_name: z
      .string()
      .min(1, { message: "Transferee State Dental Council Name is required" }),

    postal_address: z
      .string()
      .min(1, { message: "Postal Address with Pincode is required" }),

    // ✅ Optional during edit, required otherwise
    current_tdc_reg_certificate: isEdit
      ? z.any().optional()
      : z
          .any()
          .refine(
            (file) => file instanceof FileList && file.length > 0 && file[0].type === "application/pdf",
            { message: "TDC Registration Certificate (PDF) is required" }
          ),

    aadhaar_upload: isEdit
      ? z.any().optional()
      : z
          .any()
          .refine(
            (file) => file instanceof FileList && file.length > 0 && file[0].type === "application/pdf",
            { message: "Aadhaar photocopy (PDF) is required" }
          ),

    payment_id: z.string().optional(),
  });

export type NocFormData = z.infer<ReturnType<typeof nocFormSchema>>;
