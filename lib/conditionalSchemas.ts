// lib/conditionalSchemas.ts
import * as z from 'zod';

// Reusable PDF validation
const pdfFileSchema = z
  .custom<File>()
  .refine(
    (file) => file instanceof File && file.type === 'application/pdf',
    { message: 'Only PDF files are allowed.' }
  );

const monthYearSchema = z
  .string()
  .min(7, "Month & Year must be in MM/YYYY format")
  .max(7, "Month & Year must be in MM/YYYY format")
  .regex(/^(0[1-9]|1[0-2])\/\d{4}$/, "Format must be MM/YYYY with a valid month")
  .refine(val => {
    const [month, year] = val.split('/').map(Number);
    const enteredDate = new Date(year, month - 1, 1);
    const now = new Date();
    return enteredDate <= now;
  }, {
    message: "Date must not be in the future",
  });

// Schema Definitions
export const conditionalSchemas = {
  "Provisional Registration": z.object({
    pr_bds_upload: pdfFileSchema,
    pr_bonafide_upload: pdfFileSchema,
    ssc_memo_upload: pdfFileSchema,
    custodian_clg_upload: pdfFileSchema.optional(),
  }),

  "Bachelor of Dental Surgery (BDS) from Telangana": z.object({
    professional_address: z.string().min(1, "Required"),
    qualification_description: z.string().min(1, "Required"),
    bds_university_address: z.string().min(1, "Required"),
    bds_qualification_year: monthYearSchema,
    bds_clg_address: z.string().min(1, "Required"),
    bds_degree_upload: pdfFileSchema,
    study_upload: pdfFileSchema,
    bds_intern_upload: pdfFileSchema.optional(),
    pr_certificate_upload: pdfFileSchema,
    bds_affidavit_upload: pdfFileSchema.optional(),
    ssc_memo_upload: pdfFileSchema,
    custodian_clg_upload: pdfFileSchema.optional(),
  }),

  "Transfer BDS (BDS registrant - from other state dental councils in India)": z.object({
    professional_address: z.string().min(1),
    qualification_description: z.string().min(1),
    bds_university_address: z.string().min(1),
    bds_qualification_year: monthYearSchema,
    bds_clg_address: z.string().min(1),
    bds_degree_upload: pdfFileSchema,
    study_upload: pdfFileSchema,
    bds_intern_upload: pdfFileSchema.optional(),
    pr_certificate_upload: pdfFileSchema,
    bds_affidavit_upload: pdfFileSchema.optional(),
    ssc_memo_upload: pdfFileSchema,
    custodian_clg_upload: pdfFileSchema.optional(),
  }),

  "Transfer BDS + New MDS": z.object({
    pg_specialist: z.string().min(1, "Please select a PG/MDS speciality"),
    professional_address: z.string().min(1),
    qualification_description: z.string().min(1),
    bds_university_address: z.string().min(1),
    bds_qualification_year: monthYearSchema,
    bds_clg_address: z.string().min(1),
    bds_degree_upload: pdfFileSchema,
    study_upload: pdfFileSchema,
    bds_intern_upload: pdfFileSchema.optional(),
    pr_certificate_upload: pdfFileSchema,
    bds_affidavit_upload: pdfFileSchema.optional(),
    ssc_memo_upload: pdfFileSchema,
    custodian_clg_upload: pdfFileSchema.optional(),
    mds_university_address: z.string().min(1),
    mds_qualification_year: monthYearSchema,
    mds_clg_address: z.string().min(1),
    mds_degree_upload: pdfFileSchema,
    mds_bonafide_marks_upload: pdfFileSchema,
    curr_tdc_reg_certificate_upload: pdfFileSchema,
    transfer_noc_upload: pdfFileSchema,
    noc_dci_upload: pdfFileSchema,
    mds_affidavit_upload: pdfFileSchema.optional(),
  }),

  "Transfer MDS (MDS registrant - from other state dental councils in India)": z.object({
    pg_specialist: z.string().min(1, "Please select a PG/MDS speciality"),
    mds_university_address: z.string().min(1),
    mds_qualification_year: monthYearSchema,
    mds_clg_address: z.string().min(1),
    mds_degree_upload: pdfFileSchema,
    mds_bonafide_marks_upload: pdfFileSchema,
    transfer_noc_upload: pdfFileSchema,
    noc_dci_upload: pdfFileSchema,
    ssc_memo_upload: pdfFileSchema,
    custodian_clg_upload: pdfFileSchema.optional(),
  }),

  "Master of Dental Surgery (MDS) from Telangana": z.object({
    pg_specialist: z.string().min(1, "Please select a PG/MDS speciality"),
    mds_affidavit_upload: pdfFileSchema.optional(),
    bds_university_address: z.string().min(1),
    bds_qualification_year: monthYearSchema,
    bds_clg_address: z.string().min(1),
    bds_degree_upload: pdfFileSchema,
    study_upload: pdfFileSchema,
    bds_intern_upload: pdfFileSchema.optional(),
    mds_university_address: z.string().min(1),
    mds_qualification_year: monthYearSchema,
    mds_clg_address: z.string().min(1),
    mds_degree_upload: pdfFileSchema,
    mds_bonafide_marks_upload: pdfFileSchema,
    curr_tdc_reg_certificate_upload: pdfFileSchema,
    ssc_memo_upload: pdfFileSchema,
    custodian_clg_upload: pdfFileSchema.optional(),
  }),

  "Non Indian Dentist Registration (Temporary)": z.object({
    qualification_description: z.string().min(1),
    dci_university_address: z.string().min(1),
    dci_qualification_year: monthYearSchema,
    dci_clg_address: z.string().min(1),
    dci_degree_upload: pdfFileSchema,
    dci_bonafide_upload: pdfFileSchema,
  }),
} satisfies Record<string, z.ZodObject<any>>;

export const getConditionalSchema = (category: keyof typeof conditionalSchemas): z.ZodObject<any> => {
  return conditionalSchemas[category] ?? z.object({});
};