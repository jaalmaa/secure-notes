import { NoteEditor } from "~/app/notes/NoteEditor";
import { NotesSidebar } from "./NotesSidebar";

export default function Page() {
  return (
    <>
      <div className="flex h-full max-h-full w-full max-w-full border">
        <NotesSidebar />
        <NoteEditor />
      </div>
    </>
  );
}
