import { NoteEditor } from "~/app/notes/NoteEditor";
import { NotesSidebar } from "~/app/notes/NotesSidebar";

const NoteEditorEmptyProps = {
  id: "",
  updatedAt: null,
  title: "",
  content: "",
  authorId: "",
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
