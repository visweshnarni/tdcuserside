import { z } from "zod";

export const RegFormSchema = z.object({
  appointmentDate: z.date({ required_error: "Appointment date is required" }),
  slot: z.string().min(1, "Please select a slot"),
});

export type RegFormData = z.infer<typeof RegFormSchema>;
