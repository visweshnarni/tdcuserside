import CertificateList from "@/app/components/dashboard/CertificateList";
import { generateDummyCertificates } from "@/app/data/generateDummyCertificates";

const certificates = generateDummyCertificates();

export default function CertificatePage() {
  return (
    <div >
      <h1 className="text-3xl font-semibold text-[#00694A] font-francois-one mb-6 pb-2 text-center">
        Certificates
      </h1>
      <CertificateList data={certificates} />
    </div>
  );
}
