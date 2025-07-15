'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const menuItems = [
	{ label: 'Application Form', path: '/dashboard/application-form' },
	{ label: 'Note from Council', path: '/dashboard/note-from-council' },
	{ label: 'My Profile', path: '/dashboard/profile' },
	{ label: 'My Certificate', path: '/dashboard/certificates' },
	{ label: 'Renewal', path: '/dashboard/renewal' },
	{ label: 'Good Standing Certificates', path: '/dashboard/gsc' },
	{ label: 'No Objection Certificate', path: '/dashboard/noc' },
	{
		label: 'Appointment',
		isDropdown: true,
		children: [
			{ label: 'Registration', path: '/dashboard/appointment/registration' },
			{ label: 'Renewal (Tatkal)', path: '/dashboard/appointment/renewal-tatkal' },
			{ label: 'Good Standing Certificates', path: '/dashboard/appointments/gsc' },
			{ label: 'No Objection Certificate', path: '/dashboard/appointments/noc' },
		],
	},
	{ label: 'Payments', path: '/dashboard/payments' },
	{ label: 'Announcements', path: '/dashboard/announcements' },
	{ label: 'Events', path: '/dashboard/events' },
];

export default function Sidebar() {
	const router = useRouter();
	const pathname = usePathname();
	const [openDropdown, setOpenDropdown] = useState<string | null>(null);

	const toggleDropdown = (label: string) => {
		setOpenDropdown((prev) => (prev === label ? null : label));
	};

	return (
    <aside className="fixed top-20 left-0 h-[calc(100vh-5rem)] w-72 bg-white shadow p-6 font-poppins z-40 hidden md:flex flex-col">
      {/* Profile Info */}
      <div className="text-center mb-6 border-b pb-4">
        <Image
          src="/images/dravatar.jpg"
          alt="Profile"
          width={90}
          height={90}
          className="mx-auto rounded-full object-cover border"
        />
        <h3 className="mt-3 text-sm font-semibold text-gray-800 leading-tight">
          Dr. MADISHETTI ABHILASH
        </h3>
        <p className="text-xs text-gray-500">
          Bachelor of Dental Surgery (BDS)
        </p>
      </div>

      {/* Menu */}
      <div className="space-y-1 flex-1 overflow-y-auto">
        {menuItems.map((item) =>
          item.isDropdown ? (
            <div key={item.label}>
              <button
                type="button"
                onClick={() => toggleDropdown(item.label)}
                className="cursor-pointer w-full flex justify-between items-center px-3 py-2 rounded-md text-sm font-medium text-left hover:bg-gray-100 text-gray-700"
              >
                <span>{item.label}</span>
                {openDropdown === item.label ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                )}
              </button>
              {openDropdown === item.label && (
                <div className="pl-4 mt-1 space-y-1">
                  {item.children.map((child) => (
                    <button
                      key={child.label}
                      type="button"
                      onClick={() => router.push(child.path)}
                      className={`cursor-pointer block w-full text-left px-3 py-1 rounded-md text-sm ${
                        pathname === child.path
                          ? "bg-blue-100 text-[#00694A] font-semibold"
                          : "hover:bg-gray-100 text-gray-700"
                      }`}
                    >
                      {child.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <button
              key={item.label}
              type="button"
              onClick={() => router.push(item.path!)}
              className={`cursor-pointer w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                pathname === item.path
                  ? "bg-blue-100 text-[#00694A] font-semibold"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              {item.label}
            </button>
          )
        )}
      </div>
    </aside>
  );
}
