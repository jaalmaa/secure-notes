import { NoteEditor } from "~/app/notes/NoteEditor";
import { NotesSidebar } from "~/app/notes/NotesSidebar";
import type { NoteEditorProps } from "~/app/notes/NoteEditor";

const NoteEditorEmptyProps: NoteEditorProps = {
  id: "",
  title: "",
  content: "",
};

export default function Page() {
  return (
    <>
      <div className="flex h-full max-h-full w-full max-w-full border">
        <NotesSidebar />
        <NoteEditor note={NoteEditorEmptyProps} />
      </div>
    </>
  );
}
