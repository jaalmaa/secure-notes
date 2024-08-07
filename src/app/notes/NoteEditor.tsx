"use client";
import { useState } from "react";
import DeleteNoteButton from "~/app/notes/DeleteNoteButton";
import { SaveNote, type NoteSubmitData } from "~/app/notes/NotesActions";
import { Modal } from "~/app/components/modal";

export function NoteEditor(props: { note: NoteSubmitData }) {
  const initialNote = props.note;

  const [blockSaveButton, setblockSaveButton] = useState<boolean>(true);
  const [note, setNote] = useState<NoteSubmitData>(initialNote);
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
          <div className="flex flex-row">
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
          </div>
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
