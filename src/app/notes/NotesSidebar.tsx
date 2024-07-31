import { getCurrentUserContext, getNotesForUser } from "./NotesActions";

export async function NotesSidebar() {
  const userContext = await getCurrentUserContext();
  if (!userContext) {
    return "No notes found";
  }
  const notes = await getNotesForUser(userContext);

  return (
    <div className="w-64 bg-white my-1 ml-1 py-2 px-4 flex flex-col rounded">
      <h1 className="text-lg mb-4">Your Notes</h1>
      <ul>
        {notes.map((note, id) => {
          return <li key={id}>{note.title}</li>;
        })}
      </ul>
    </div>
  );
}
