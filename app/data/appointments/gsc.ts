// app/data/generateDummyGscData.ts
import { faker } from "@faker-js/faker";
import { GscRecord } from "@/app/types/gsc";

export function generateDummyGscData(count = 10): GscRecord[] {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    registrationNumber: faker.number.int({ min: 100000, max: 999999 }).toString(),
    category: faker.helpers.arrayElement(["General", "Specialist"]),
    appointmentDate: faker.date.future().toLocaleDateString(),
    slot: faker.helpers.arrayElement(["9 AM - 10 AM", "10 AM - 11 AM", "11 AM - 12 PM"]),
  }));
}
