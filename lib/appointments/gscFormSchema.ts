import { z } from "zod";

export const gscFormSchema = z.object({
  appointmentDate: z.date({ required_error: "Appointment date is required" }),
  slot: z.string().min(1, "Please select a slot"),
});

export type GscFormData = z.infer<typeof gscFormSchema>;
