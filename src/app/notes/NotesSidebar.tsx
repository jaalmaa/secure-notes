import { Note } from "~/server/notes";
import {
  getCurrentUserContext,
  getNotesForUser,
} from "~/app/notes/NotesActions";
import { NoteLinkButton } from "~/app/notes/NoteLinkButton";

export async function NotesSidebar() {
  const userContext = await getCurrentUserContext();
  if (!userContext) {
    return "No notes found";
  }
  const notes = (await getNotesForUser(userContext)) as Note[];

  return (
    <div className="w-96 bg-white my-1 ml-1 py-2 px-4 flex flex-col rounded">
      <h1 className="text-lg mb-4">Your Notes</h1>
      <ul>
        {notes.map((note, id) => {
          return <NoteLinkButton key={id} note={note} />;
        })}
      </ul>
    </div>
  );
}
