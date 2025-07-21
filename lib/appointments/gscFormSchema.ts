import { z } from "zod";

export const gscFormSchema = z.object({
  appointmentDate: z.date({
    required_error: "Appointment date is required",
    invalid_type_error: "Invalid date",
  }),
  slot: z.string().min(1, "Please select a slot"),
});

export type GscFormData = z.infer<typeof gscFormSchema>;
