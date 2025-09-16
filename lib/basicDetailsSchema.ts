import * as z from "zod";

export const basicDetailsSchema = z.object({
  // Backend IDs are now optional for testing
  regcategory_id: z.string().optional(),
  nationality_id: z.string().optional(),

  // Personal Information
  f_name: z
    .string()
    .min(1, "First name is required")
    .regex(/^[a-zA-Z\s]+$/, "Only alphabets are allowed")
    .optional(),

  m_name: z
    .string()
    .regex(/^[a-zA-Z\s]*$/, "Only alphabets are allowed")
    .optional(),

  l_name: z
    .string()
    .min(1, "Last name is required")
    .regex(/^[a-zA-Z\s]+$/, "Only alphabets are allowed")
    .optional(),

  gender: z.enum(["Male", "Female", "Other"]).optional(),

  father_name: z
    .string()
    .min(1, "Father's Name is required")
    .regex(/^[a-zA-Z\s]+$/, "Only alphabets are allowed")
    .optional(),

  mother_name: z
    .string()
    .min(1, "Mother's Name is required")
    .regex(/^[a-zA-Z\s]*$/, "Only alphabets are allowed")
    .optional(),

  place: z.string().optional(),
  
  dob: z.string().optional(),

  category: z.enum(
    ["Open Category", "Backward Classes", "Scheduled Castes", "Scheduled Tribes"]
  ).optional(),
  
  // Contact Info
  email: z.string().email("Invalid email format").optional(),

  mobile_number: z
    .string()
    .min(10, "Mobile number must be 10 digits")
    .max(10, "Mobile number must be 10 digits")
    .regex(/^[0-9]+$/, "Only numbers are allowed")
    .optional(),

  telephone_number: z
    .string()
    .regex(/^[0-9]*$/, "Only numbers are allowed")
    .optional(),

  address: z.string().optional(),

  // Identity Verification
  pan_number: z
    .string()
    .min(1, "PAN number is required")
    .regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, {
      message: "Invalid PAN number (e.g. AAAAA1234A)",
    })
    .optional(),

  aadhaar_number: z
    .string()
    .min(1, "Aadhaar number is required")
    .regex(/^\d{12}$/, "Aadhaar must be 12 digits")
    .optional(),

  regtype: z.enum(
    ["Regular (By Post - Fee includes postal charges)", "Tatkal (By Hand)"]
  ).optional(),

  // File Uploads are now optional for testing
  pan_upload: z.custom<File>((file) => file instanceof File).optional(),
  aadhaar_upload: z.custom<File>((file) => file instanceof File).optional(),
  sign_upload: z.custom<File>((file) => file instanceof File).optional(),
});