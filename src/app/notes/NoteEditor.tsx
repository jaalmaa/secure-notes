"use client";
import { useState } from "react";
import DeleteNoteButton from "~/app/notes/DeleteNoteButton";
import { SaveNote, type NoteSubmitData } from "~/app/notes/NotesActions";

export function NoteEditor(props: { note: NoteSubmitData }) {
  const initialNote = props.note;

  const [note, setNote] = useState(initialNote);
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNote({
      id: note.id,
      title: event.currentTarget.value,
      content: note.content,
    });
  };
  const handleContentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setNote({
      id: note.id,
      title: note.title,
      content: event.currentTarget.value,
    });
  };
  const handleNoteSave = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const saveNote = SaveNote({
      id: note.id,
      title: note.title,
      content: note.content,
    });
  };

  return (
    <>
      <div className="flex flex-col h-full w-full rounded-md bg-white px-2 py-2">
        <div className="flex justify-between pr-2 flex-row">
          <input
            name="title"
            value={note.title ? note.title : ""}
            placeholder="enter a title..."
            className="p-2 w-full h-1/8 focus:outline-none text-2xl font-semibold"
            onChange={handleTitleChange}
          />
          <button
            onClick={handleNoteSave}
            className="py-2 px-4 rounded-md hover:bg-gray-200"
          >
            Save
          </button>
          <div className="flex flex-row">
            {initialNote.id ? (
              <>
                <input name="id" type="hidden" value={initialNote.id}></input>
                <DeleteNoteButton />
              </>
            ) : (
              ""
            )}
          </div>
        </div>
        <textarea
          className="w-full flex-1 shadow-sm p-2 focus:outline-none"
          placeholder="Begin typing your note..."
          name="content"
          value={note.content ? note.content : ""}
          onChange={handleContentChange}
        ></textarea>
      </div>
    </>
  );
}
