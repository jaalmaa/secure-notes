"use client";
import { useState } from "react";
import DeleteNoteButton from "~/app/notes/DeleteNoteButton";
import { SaveNote, type NoteSubmitData } from "~/app/notes/NotesActions";
import { Modal } from "~/app/components/modal";
import type { Note } from "~/server/notes";

export function NoteEditor(props: { note: Note }) {
  const initialNote = props.note;

  const [note, setNote] = useState<NoteSubmitData>(initialNote);
  const [updatedAt, setUpdatedAt] = useState<Date | null>(
    initialNote.updatedAt ? initialNote.updatedAt : null
  );
  const [blockSaveButton, setblockSaveButton] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleModal = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setIsOpen(!isOpen);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNote({
      id: note.id,
      title: event.currentTarget.value,
      content: note.content,
    });
    setblockSaveButton(false);
  };
  const handleContentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setNote({
      id: note.id,
      title: note.title,
      content: event.currentTarget.value,
    });
    setblockSaveButton(false);
  };
  const handleNoteSave = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setblockSaveButton(true);
    const saveNote = SaveNote({
      id: note.id,
      title: note.title,
      content: note.content,
    });
    setUpdatedAt(new Date());
  };

  return (
    <>
      <div className="flex flex-row h-full w-full rounded-md bg-white px-4 py-2">
        <div className="flex justify-between pr-2 flex-col flex-grow">
          <input
            name="title"
            value={note.title ? note.title : ""}
            placeholder="enter a title..."
            className="p-2 w-full h-1/8 focus:outline-none text-2xl font-semibold"
            onChange={handleTitleChange}
          />
          <textarea
            className="w-full flex-1 p-2 focus:outline-none"
            placeholder="Begin typing your note..."
            name="content"
            value={note.content ? note.content : ""}
            onChange={handleContentChange}
          ></textarea>
        </div>
        <div className="flex flex-col w-64">
          <div className="flex flex-row justify-end">
            {initialNote.id ? (
              <>
                <button
                  className="py-2 px-4 rounded-md hover:bg-red-200"
                  onClick={toggleModal}
                >
                  Delete
                </button>
                <Modal isOpen={isOpen}>
                  <div className="w-full h-full pt-16 px-8 flex flex-col justify-between">
                    <p className="h-3/4">
                      Are you sure you want to delete this note?
                    </p>
                    <div className="flex flex-row justify-end h-1/4 pb-8">
                      <DeleteNoteButton />
                      <button
                        onClick={toggleModal}
                        className="ml-4 hover:bg-gray-300 py-2 px-4 rounded-md"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </Modal>
              </>
            ) : (
              ""
            )}
            <button
              onClick={handleNoteSave}
              className={`py-2 px-4 rounded-md ${
                blockSaveButton
                  ? "text-gray-400 hover:bg-white"
                  : "hover:bg-gray-300"
              }`}
              disabled={blockSaveButton}
            >
              Save
            </button>
          </div>
          {updatedAt ? (
            <p className="text-gray-400 text-xs flex justify-end pt-2">
              Last updated at: {updatedAt?.toLocaleString()}
            </p>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}
