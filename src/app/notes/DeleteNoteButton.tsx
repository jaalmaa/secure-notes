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
      className="px-2 rounded-lg hover:bg-gray-100 ease-in-out"
    >
      -
    </button>
  );
}
