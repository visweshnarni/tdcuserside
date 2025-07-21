'use client';

import { useState } from 'react';
import { Pencil } from 'lucide-react';

type ProfileData = {
  label: string;
  value: string;
};

const profileFields: ProfileData[] = [
  { label: 'Category', value: 'Bachelor of Dental Surgery (BDS)' },
  { label: 'Membership No.', value: 'A-1273' },
  { label: 'Name in full', value: 'Dr. MADISHETTI ABHILASH' },
  { label: 'Gender', value: 'Male' },
  { label: 'Father’s Name', value: 'MADISHETTI SATHAIAH' },
  { label: 'Mother’s Name', value: 'MADISHETTI RANI' },
  { label: 'Place, date & year of birth', value: 'JAGTIAL, 25/08/1992' },
  { label: 'Nationality', value: 'Natural born Indian Citizen' },
  { label: 'Residential address with pin code', value: 'H.NO:1-2-258/3, KRISHNANAGAR, JAGTIAL, DIST: JAGTIAL, PIN 505327' },
  { label: 'Description of Qualification/s', value: 'RENEWAL OF BDS REGISTRATION' },
  { label: 'Email ID', value: 'abhilash.madisetty92@gmail.com' },
  { label: 'Mobile No.', value: '7842810845' },
  { label: 'Aadhaar Card No.', value: '2801 0108 9567' },
  { label: 'PAN No.', value: 'BEMPM1234C' },
 

];

const editableLabels = ['Email ID', 'Mobile No.'];

export default function Profile() {
  const [fields, setFields] = useState(profileFields);
  const [editingLabel, setEditingLabel] = useState<string | null>(null);
  const [tempValue, setTempValue] = useState<string>("");

  const handleEditClick = (label: string, value: string) => {
    setEditingLabel(label);
    setTempValue(value);
  };

  const handleCancel = () => {
    setEditingLabel(null);
    setTempValue('');
  };

  const handleUpdate = () => {
    if (editingLabel !== null) {
      setFields(prev =>
        prev.map(field =>
          field.label === editingLabel ? { ...field, value: tempValue } : field
        )
      );
      setEditingLabel(null);
    }
  };

  return (
    <div >
     
      <div className="space-y-4">
        {fields.map(({ label, value }) => (
          <div key={label} className="flex flex-col sm:flex-row sm:items-start justify-between">
            <div className="flex flex-col sm:flex-row sm:items-start sm:gap-2 w-full">
              <span className="font-medium text-gray-600 sm:w-64">{label}</span>

              {editingLabel === label ? (
                <div className="flex flex-col sm:flex-row gap-2 sm:items-center w-full">
                  <input
                    type="text"
                    className="border border-gray-300 rounded px-2 py-1 text-sm font-semibold text-gray-900 w-full sm:w-auto"
                    value={tempValue}
                    onChange={(e) => setTempValue(e.target.value)}
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleUpdate}
                      className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      Update
                    </button>
                    <button
                      onClick={handleCancel}
                      className="px-3 py-1 text-sm bg-gray-400 text-white rounded hover:bg-gray-500"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between w-full sm:w-auto">
                  <span className="text-gray-900 font-semibold break-words">
                    : {value}
                  </span>
                  {editableLabels.includes(label) && (
                    <button
                      className="text-gray-500 hover:text-gray-700 ml-2"
                      onClick={() => handleEditClick(label, value)}
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
