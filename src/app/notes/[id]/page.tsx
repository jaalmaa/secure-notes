import { UUID } from "crypto";
import { NoteEditor } from "~/app/notes/NoteEditor";
import { NotesSidebar } from "~/app/notes/NotesSidebar";
import { getNote } from "~/app/notes/NotesActions";

export default async function noteView({
  params: { id: noteId },
}: {
  params: { id: UUID };
}) {
  const note = await getNote(noteId);

  return (
    <>
      <div className="flex h-full max-h-full w-full max-w-full">
        <NotesSidebar />
        <NoteEditor note={note} />
      </div>
    </>
  );
}
