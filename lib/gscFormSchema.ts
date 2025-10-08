import * as z from "zod";

// Define a schema that allows a FileList (for new upload) OR a string (for existing URL)
const FileOrUrlSchema = z.union([
  // Case 1: Allows the field to be undefined (e.g., when the form initializes empty)
  z.undefined(),
  // Case 2: Allows a string URL (when editing an existing record)
  z.string(),
  // Case 3: The actual file input from the browser (FileList)
  z.custom<FileList>((files) => files instanceof FileList, {
    message: "Invalid file selection.",
  }),
]).optional();

// Define validation that only runs if the user chose a *new* file (i.e., the value is a FileList)
const fileValidationRefinement = FileOrUrlSchema.superRefine((val, ctx) => {
  // If the value is a string (existing URL) or undefined/empty, it passes the file check.
  if (typeof val === 'string' || !val || val.length === 0) {
    return;
  }
  
  // If we reach here, the value is a FileList with a file chosen (val.length > 0)
  const file = val[0];

  if (file.size > 5 * 1024 * 1024) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "File size must be less than 5MB.",
    });
  }

  if (file.type !== "application/pdf") {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Only PDF files are allowed.",
    });
  }
});


export const gscFormSchema = z.object({
  // Apply the fileValidationRefinement to all file fields
  tdc_reg_certificate_upload: fileValidationRefinement,
  testimonial_d1_upload: fileValidationRefinement,
  testimonial_d2_upload: fileValidationRefinement,
  aadhaar_upload: fileValidationRefinement,
  tdc_reg_d1_upload: fileValidationRefinement,
  tdc_reg_d2_upload: fileValidationRefinement,
  
  // Postal address remains strictly required
  postal_address: z.string().min(1, { message: "Postal Address is required" }),
});

export type GscFormData = z.infer<typeof gscFormSchema>;