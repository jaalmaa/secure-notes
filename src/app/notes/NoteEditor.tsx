"use client";
import { handleNoteSubmit } from "~/app/notes/NotesActions";
import { useFormState } from "react-dom";

export function NoteEditor() {
  const [errorMessage, noteSubmit] = useFormState(handleNoteSubmit, null);

  return (
    <>
      <form
        className="flex flex-col h-full w-full p-1 rounded-md"
        action={noteSubmit}
      >
        <input
          name="title"
          placeholder="enter a title..."
          className="p-2 w-full h-1/8 focus:outline-none text-2xl font-semibold"
        ></input>
        <textarea
          className="w-full flex-1 shadow-sm p-2 focus:outline-none"
          placeholder="Begin typing your note..."
          name="content"
        ></textarea>
        <button
          type="submit"
          className="absolute bottom-8 right-8 py-2 px-4 bg-gray-600 hover:bg-gray-800 text-white rounded-md"
        >
          Save
        </button>
      </form>
      {errorMessage ? errorMessage : ""}
    </>
  );
}
