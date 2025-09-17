// import { z } from "zod"

// export const gscFormSchema = z.object({
//   tdc_reg_certificate: z
//     .any()
//     .refine((file) => file instanceof File && file.type === "application/pdf", {
//       message: "Only PDF files allowed",
//     }),

//   testimonial_dental1: z
//     .any()
//     .refine((file) => file instanceof File && file.type === "application/pdf", {
//       message: "Only PDF files allowed",
//     }),

//   testimonial_dental2: z
//     .any()
//     .refine((file) => file instanceof File && file.type === "application/pdf", {
//       message: "Only PDF files allowed",
//     }),

//   gsc_aadhaar_upload: z
//     .any()
//     .refine((file) => file instanceof File && file.type === "application/pdf", {
//       message: "Only PDF files allowed",
//     }),

//   post_address: z
//     .string()
//     .min(1, { message: "Postal Address is required" }),

//   tdc_reg_dental1: z
//     .any()
//     .refine((file) => file instanceof File && file.type === "application/pdf", {
//       message: "Only PDF files allowed",
//     }),

//   tdc_reg_dental2: z
//     .any()
//     .refine((file) => file instanceof File && file.type === "application/pdf", {
//       message: "Only PDF files allowed",
//     }),
// })

// // Inferred TypeScript type for use in form
// export type GscFormData = z.infer<typeof gscFormSchema>

import * as z from "zod";

// A reusable schema for a single file upload that supports empty uploads (for updates)
const pdfFileSchema = z
  .custom<FileList>()
  .refine(files => files.length > 0, "PDF file is required.")
  .refine(files => files[0]?.size <= 5 * 1024 * 1024, "File size must be less than 5MB.")
  .refine(files => files[0]?.type === "application/pdf", "Only PDF files are allowed.");


// If you want file inputs optional for updates, use this instead

const optionalPdfFileSchema = z
  .custom<FileList>()
  .optional()
  .refine(files => !files || files.length === 0 || files[0]?.size <= 5 * 1024 * 1024, "File size must be less than 5MB.")
  .refine(
    files => !files || files.length === 0 || files[0]?.type === "application/pdf",
    "Only PDF files are allowed."
  );

export const gscFormSchema = z.object({
  // Use optionalPdfFileSchema if you want to allow skipping file upload on update
  tdc_reg_certificate_upload: optionalPdfFileSchema,
  testimonial_d1_upload: optionalPdfFileSchema,
  testimonial_d2_upload: optionalPdfFileSchema,
  aadhaar_upload: optionalPdfFileSchema,
  tdc_reg_d1_upload: optionalPdfFileSchema,
  tdc_reg_d2_upload: optionalPdfFileSchema,
  postal_address: z.string().min(1, { message: "Postal Address is required" }),
});

// Inferred TypeScript type
export type GscFormData = z.infer<typeof gscFormSchema>;
