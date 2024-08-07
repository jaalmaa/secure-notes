import {
  getCurrentUserContext,
  getNotesForUser,
} from "~/app/notes/NotesActions";
import { NoteLinkButton } from "~/app/notes/NoteLinkButton";
import Link from "next/link";

export async function NotesSidebar() {
  const userContext = await getCurrentUserContext();
  if (!userContext) {
    return "No notes found";
  }
  const notes = await getNotesForUser(userContext);

  // TODO: when creating a new note, add an action to append a new note to the list on the sidebar
  return (
    <div className="w-96 bg-white mr-1 py-2 px-4 flex flex-col rounded">
      <div className="flex justify-between mb-4">
        <h1 className="text-lg">Your Notes</h1>
        <div>
          <Link
            href="/notes"
            className="px-2 py-1 mx-1 rounded-lg hover:bg-gray-100 ease-in-out"
          >
            +
          </Link>
        </div>
      </div>
      <ul>
        {notes.map((note, id) => {
          return <NoteLinkButton key={id} note={note} />;
        })}
      </ul>
    </div>
  );
}
