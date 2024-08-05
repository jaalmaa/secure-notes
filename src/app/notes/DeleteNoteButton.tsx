"use client";
import { UUID } from "crypto";
import { usePathname } from "next/navigation";
import { deleteNote } from "./NotesActions";

export default function DeleteNoteButton() {
  const currentNoteID = usePathname().split("/")[2] as UUID;
  const handleDeleteNote = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const test = deleteNote(currentNoteID);
  };
  return (
    <button
      onClick={handleDeleteNote}
      className="py-2 px-4 rounded-md hover:bg-red-200"
    >
      Delete
    </button>
  );
}
