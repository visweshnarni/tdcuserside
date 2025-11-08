export interface NocRecord {
  _id?: string;
  name?: string;
  applicationNo?: string;
  applicationDate?: string;
  status?: "Pending" | "Approved" | "Rejected";
  dental_council_name?: string;
  postal_address?: string;
  tdc_reg_certificate_upload?: string;
  aadhaar_upload?: string;
  payment_id?: string;
}
