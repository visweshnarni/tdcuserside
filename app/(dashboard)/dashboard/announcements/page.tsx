// app/(member)/announcements/page.tsx

import Announcements from "@/app/components/dashboard/Announcements";
import { announcements } from "@/app/data/announcement";

export default function AnnouncementsPage() {
  return (
    <div>
      <Announcements entries={announcements} />;
    </div>
  );
}
