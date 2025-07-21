import { z } from "zod";

export const renewalFormSchema = z.object({
  yearsToRenew: z.string().min(1, "Please select number of years"),
  registrationType: z.string().min(1, "Please select registration type"),
  aadhaarCard: z
    .instanceof(File)
    .refine((file) => file?.type === "application/pdf", {
      message: "Aadhaar Card must be a PDF",
    }),
  tsdcCertificate: z
    .instanceof(File)
    .refine((file) => file?.type === "application/pdf", {
      message: "TSDC Certificate must be a PDF",
    }),
});

export type RenewalFormData = z.infer<typeof renewalFormSchema>;
