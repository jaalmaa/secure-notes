"use client";
import { handleNoteSubmit } from "~/app/notes/NotesActions";
import { useFormState } from "react-dom";
import { useState } from "react";
import { UUID } from "crypto";

interface NoteEditorProps {
  id: UUID | string;
  title: string;
  content: string;
}

const defaultProps: NoteEditorProps = {
  id: "",
  title: "",
  content: "",
};

// TODO: Figure out how to type this!

export function NoteEditor(props: { note?: any }) {
  const [errorMessage, noteSubmit] = useFormState(handleNoteSubmit, null);
  const initialNote = props ? props.note : defaultProps;

  const [note, setNote] = useState(initialNote);
  const handleTitleChange = (event: React.FormEvent<HTMLInputElement>) => {
    setNote({ title: event.currentTarget.value, content: note?.content });
  };
  const handleContentChange = (event: React.FormEvent<HTMLTextAreaElement>) => {
    setNote({ title: note?.title, content: event.currentTarget.value });
  };

  return (
    <>
      <form
        className="flex flex-col h-full w-full p-1 rounded-md"
        action={noteSubmit}
      >
        {initialNote?.id ? (
          <input name="id" type="hidden" value={initialNote.id}></input>
        ) : (
          ""
        )}
        <input
          name="title"
          value={note?.title ? note.title : ""}
          placeholder="enter a title..."
          className="p-2 w-full h-1/8 focus:outline-none text-2xl font-semibold"
          onChange={handleTitleChange}
        />
        <textarea
          className="w-full flex-1 shadow-sm p-2 focus:outline-none"
          placeholder="Begin typing your note..."
          name="content"
          value={note?.content ? note.content : ""}
          onChange={handleContentChange}
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
