"use client";
import { handleNoteSubmit } from "~/app/notes/NotesActions";
import { useFormState } from "react-dom";
import { useState } from "react";
import type { UUID } from "crypto";
import DeleteNoteButton from "~/app/notes/DeleteNoteButton";

export type NoteEditorProps = {
  id?: UUID | string;
  title: string;
  content: string;
};

export function NoteEditor(props: { note: NoteEditorProps }) {
  const [errorMessage, noteSubmit] = useFormState(handleNoteSubmit, null);
  const initialNote = props.note;

  const [note, setNote] = useState(initialNote);
  const handleTitleChange = (event: React.FormEvent<HTMLInputElement>) => {
    setNote({ title: event.currentTarget.value, content: note.content });
  };
  const handleContentChange = (event: React.FormEvent<HTMLTextAreaElement>) => {
    setNote({ title: note.title, content: event.currentTarget.value });
  };

  return (
    <>
      <form
        className="flex flex-col h-full w-full rounded-md bg-white px-2 py-2"
        action={noteSubmit}
      >
        {initialNote.id ? (
          <input name="id" type="hidden" value={initialNote.id}></input>
        ) : (
          ""
        )}
        <div className="flex justify-between pr-2">
          <input
            name="title"
            value={note.title ? note.title : ""}
            placeholder="enter a title..."
            className="p-2 w-full h-1/8 focus:outline-none text-2xl font-semibold"
            onChange={handleTitleChange}
          />
          <div className="flex flex-row">
            <button
              type="submit"
              className="py-2 px-4 rounded-md hover:bg-gray-100"
            >
              Save
            </button>
            <DeleteNoteButton />
          </div>
        </div>
        <textarea
          className="w-full flex-1 shadow-sm p-2 focus:outline-none"
          placeholder="Begin typing your note..."
          name="content"
          value={note.content ? note.content : ""}
          onChange={handleContentChange}
        ></textarea>
      </form>
      {errorMessage ? errorMessage : ""}
    </>
  );
}
