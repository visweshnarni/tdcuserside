"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@radix-ui/react-select";
import { getConditionalSchema } from "@/lib/conditionalSchemas";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export type Step2FormValues = ReturnType<typeof getConditionalSchema>["_type"];

interface ConditionalFieldsProps {
  onNext: (data: Partial<Step2FormValues>) => void;
  onBack: () => void;
  defaultValues: Partial<Step2FormValues>;
  registrationCategory: string;
  onFileChange?: (name: string, file: File) => void;
}

const ConditionalFields: React.FC<ConditionalFieldsProps> = ({
  registrationCategory,
  onBack,
  onFileChange,
}) => {
  const { register } = useFormContext();

  const pgSpecialityOptions = [
    "Prosthodontics and Crown & Bridge",
    "Periodontology",
    "Oral and Maxillofacial Surgery",
    "Conservative Dentistry and Endodontics",
    "Orthodontics and Dentofacial Orthopedics",
    "Oral & Maxillofacial Pathology and Oral Microbiology",
    "Public Health Dentistry",
    "Pediatric and Preventive Dentistry",
    "Oral Medicine and Radiology",
  ];

  const dropdownField = (name: string, label: string, options: string[]) => (
    <FormField
      key={name}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label} <span className="text-red-500">*</span></FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <SelectTrigger className="w-full cursor-pointer">
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option} value={option} className="cursor-pointer">
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  const textField = (name: string, label: string, placeholder?: string) => (
    <FormField
      key={name}
      name={name}
      render={() => (
        <FormItem>
          <FormLabel>{label} <span className="text-red-500">*</span></FormLabel>
          <FormControl>
            <Input placeholder={placeholder} {...register(name)} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  const monthYearField = (name: string, label: string, placeholder?: string) => (
    <FormField
      key={name}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label} <span className="text-red-500">*</span></FormLabel>
          <FormControl>
            <Input
              placeholder={placeholder || "MM/YYYY"}
              maxLength={7}
              inputMode="numeric"
              value={field.value || ""}
              onChange={(e) => {
                let val = e.target.value.replace(/[^\d]/g, "");
                if (val.length >= 2) {
                  let month = val.slice(0, 2);
                  let year = val.slice(2, 6);
                  if (+month > 12) month = "12";
                  const currentYear = new Date().getFullYear();
                  const minYear = 1950;
                  const numericYear = parseInt(year, 10);
                  if (year.length === 4) {
                    if (numericYear < minYear) year = String(minYear);
                    if (numericYear > currentYear) year = String(currentYear);
                  }
                  val = month + (year ? "/" + year : "");
                }
                field.onChange(val);
              }}
              pattern="\d{2}/\d{4}"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  const textareaField = (name: string, label: string, placeholder?: string) => (
    <FormField
      key={name}
      name={name}
      render={() => (
        <FormItem className="md:col-span-2">
          <FormLabel>{label} <span className="text-red-500">*</span></FormLabel>
          <FormControl>
            <Textarea placeholder={placeholder} {...register(name)} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  const pdfField = (name: string, label: string, isMandatory = true) => (
    <FormField
      key={name}
      name={name}
      render={({ field: { value, onChange, ...fieldProps } }) => (
        <FormItem>
          <FormLabel>
            {label} {isMandatory && <span className="text-red-500">*</span>}
          </FormLabel>
          <FormControl>
            <Input
              {...fieldProps}
              type="file"
              accept="application/pdf"
              onChange={(e) => onChange(e.target.files?.[0])}
              className="block w-full h-10 text-sm text-gray-900 border border-gray-300 rounded-md bg-white file:h-full file:bg-[#EFEFEF] file:text-gray-700 file:font-medium file:border-1 file:rounded-l-md file:rounded-r-md file:px-4 file:cursor-pointer file:text-center"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  const fields: Record<string, React.ReactElement[]> = {
    "Provisional Registration": [
      pdfField("pr_bds_upload", "Provisional BDS Certificate (PR)"),
      pdfField("pr_bonafide_upload", "Upload College Bonafide Certificate (PR)"),
      pdfField("ssc_memo_upload", "SSC Marks Memo"),
      pdfField("custodian_clg_upload", "College Custodian", false),
    ],

    "Bachelor of Dental Surgery (BDS) from Telangana": [
      textField("professional_address", "Professional Address (for Clinicians)"),
      textareaField("qualification_description", "Description of Qualification/s"),
      textField("bds_university_address", "Name & address of the University (BDS)"),
      monthYearField("bds_qualification_year", "Month & year of attaining the Qualification (BDS)"),
      textField("bds_clg_address", "Name & Address of College/Institution (BDS)"),
      pdfField("bds_degree_upload", "Degree Certificate/s (BDS)"),
      pdfField("study_upload", "Study/Conduct/Attempt Certificate"),
      pdfField("bds_intern_upload", "Internship Certificate", false),
      pdfField("pr_certificate_upload", "TDC Provisional Registration Certificate"),
      pdfField("bds_affidavit_upload", "Affidavit", false),
      pdfField("ssc_memo_upload", "SSC Marks Memo"),
      pdfField("custodian_clg_upload", "College Custodian", false),
    ],

    "Transfer BDS (BDS registrant - from other state dental councils in India)": [
      textField("professional_address", "Professional Address (for Clinicians)"),
      textareaField("qualification_description", "Description of Qualification/s"),
      textField("bds_university_address", "Name & address of the University (BDS)"),
      monthYearField("bds_qualification_year", "Month & year of attaining the Qualification (BDS)"),
      textField("bds_clg_address", "Name & Address of College/Institution (BDS)"),
      pdfField("bds_degree_upload", "Degree Certificate/s (BDS)"),
      pdfField("study_upload", "Study/Conduct/Attempt Certificate"),
      pdfField("bds_intern_upload", "Internship Certificate", false),
      pdfField("pr_certificate_upload", "TDC Provisional Registration Certificate"),
      pdfField("bds_affidavit_upload", "Affidavit", false),
      pdfField("ssc_memo_upload", "SSC Marks Memo"),
      pdfField("custodian_clg_upload", "College Custodian", false),
    ],

    "Transfer BDS + New MDS": [
      dropdownField("pg_specialist", "PG / MDS Specialities", pgSpecialityOptions),
      textField("professional_address", "Professional Address (for Clinicians)"),
      textareaField("qualification_description", "Description of Qualification/s"),
      textField("bds_university_address", "Name & address of the University (BDS)"),
      monthYearField("bds_qualification_year", "Month & year of attaining the Qualification (BDS)"),
      textField("bds_clg_address", "Name & Address of College/Institution (BDS)"),
      pdfField("bds_degree_upload", "Degree Certificate/s (BDS)"),
      pdfField("study_upload", "Study/Conduct Certificate"),
      pdfField("bds_intern_upload", "Internship Certificate", false),
      pdfField("pr_certificate_upload", "TDC Provisional Registration Certificate"),
      pdfField("bds_affidavit_upload", "Affidavit", false),
      pdfField("ssc_memo_upload", "SSC Marks Memo"),
      pdfField("custodian_clg_upload", "College Custodian", false),
      textField("mds_university_address", "Name & address of the University (MDS)"),
      monthYearField("mds_qualification_year", "Month & year of attaining the Qualification (MDS)"),
      textField("mds_clg_address", "Name & Address of College/Institution (MDS)"),
      pdfField("mds_degree_upload", "Degree Certificate/s (MDS)"),
      pdfField("mds_bonafide_marks_upload", "College Bonafide/Marks Memo (MDS)"),
      pdfField("curr_tdc_reg_certificate_upload", "TDC Registration Certificate"),
      pdfField("noc_dci_upload", "NOC of DCI"),
      pdfField("transfer_noc_upload", "NOC from Transferor State Dental Council"),
      pdfField("mds_affidavit_upload", "MDS Affidavit", false),
    ],

    "Transfer MDS (MDS registrant - from other state dental councils in India)": [
      dropdownField("pg_specialist", "PG / MDS Specialities", pgSpecialityOptions),
      textField("mds_university_address", "Name & address of the University (MDS)"),
      monthYearField("mds_qualification_year", "Month & year of attaining the Qualification (MDS)"),
      textField("mds_clg_address", "Name & Address of College/Institution (MDS)"),
      pdfField("mds_degree_upload", "Degree Certificate/s (MDS)"),
      pdfField("mds_bonafide_marks_upload", "College Bonafide/Marks Memo (MDS)"),
      pdfField("transfer_noc_upload", "NOC from Transferor State Dental Council"),
      pdfField("noc_dci_upload", "NOC of DCI"),
      pdfField("ssc_memo_upload", "SSC Marks Memo"),
      pdfField("custodian_clg_upload", "College Custodian", false),
    ],

    "Master of Dental Surgery (MDS) from Telangana": [
      dropdownField("pg_specialist", "PG / MDS Specialities", pgSpecialityOptions),
      pdfField("mds_affidavit_upload", "Upload MDS Affidavit", false),
      textField("bds_university_address", "Name & address of the University (BDS)"),
      monthYearField("bds_qualification_year", "Month & year of attaining the Qualification (BDS)"),
      textField("bds_clg_address", "Name & Address of College/Institution from which applicant graduated (BDS)"),
      pdfField("bds_degree_upload", "Provisional/Permanent Degree Certificate/s (BDS)"),
      pdfField("study_upload", "Study or Conduct certificate"),
      pdfField("bds_intern_upload", "Internship Certificate", false),
      textField("mds_university_address", "Name & address of the University (MDS)"),
      monthYearField("mds_qualification_year", "Month & year of attaining the Qualification (MDS)"),
      textField("mds_clg_address", "Name & Address of College/Institution from which applicant passed (MDS)"),
      pdfField("mds_degree_upload", "Provisional/Permanent Degree Certificate/s (MDS)"),
      pdfField("mds_bonafide_marks_upload", "College Bonafide Certificate/ Marks memo (MDS)"),
      pdfField("custodian_clg_upload", "College Custodian", false),
      pdfField("curr_tdc_reg_certificate_upload", "Upload (Currently Holding) TSDC Registration Certificate"),
    ],

    "Non Indian Dentist Registration (Temporary)": [
      textareaField("nid_qualification_des", "Description of Qualification/s for which registration is desired"),
      textField("dci_university_address", "Name & address of the University (DCI recognized foreign degree)"),
      monthYearField("dci_qualification_year", "Month & year of attaining the Qualification (DCI recognized foreign degree)"),
      textField("dci_clg_address", "Name & Address of College/Institution from which applicant passed (DCI recognized foreign degree)"),
      pdfField("dci_degree_upload", "Provisional/Permanent Degree Certificate/s (DCI recognized foreign degree)"),
      pdfField("dci_bonafide_upload", "College Bonafide Certificate/s (DCI recognized foreign degree)"),
      pdfField("curr_tdc_reg_certificate_upload", "Upload (Currently Holding) TDC Registration Certificate"),
    ],
  };

  return registrationCategory && fields[registrationCategory] ? (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {fields[registrationCategory]}
    </div>
  ) : null;
};

export default ConditionalFields;