'use client';

import NoteFromCouncil from "@/app/components/dashboard/NoteFromCouncil";
import { councilNotes } from "@/app/data/councilNotes";

export default function NoteFromCouncilPage() {
  return (
    <div >
      <NoteFromCouncil entries={councilNotes} />
    </div>
  );
}