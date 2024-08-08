import { NoteEditor } from "~/app/notes/NoteEditor";
import { NotesSidebar } from "~/app/notes/NotesSidebar";
import type { NoteSubmitData } from "~/app/notes/NotesActions";

const NoteEditorEmptyProps = {
  id: "",
  updatedAt: null,
  title: "",
  content: "",
};

export default function Page() {
  return (
    <>
      <div className="flex h-full max-h-full w-full max-w-full">
        <NotesSidebar />
        <NoteEditor note={NoteEditorEmptyProps} />
      </div>
    </>
  );
}
