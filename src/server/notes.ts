import "server-only";
import { PrismaClient } from "@prisma/client";

type User = {
  id: string;
  username: string;
  password: string;
  notes: Note[];
};

export type Note = {
  id?: string;
  title: string;
  slug?: string;
  content: string;
  author?: User;
  authorId: string;
};

const prisma = new PrismaClient();

export async function createNote(note: Note): Promise<string | undefined> {
  const { title, content, authorId } = note;
  const slug = convertTitleToSlug(title);
  const createdNote = await prisma.note.create({
    data: {
      title: title,
      slug: slug,
      content: content,
      authorId: authorId,
    },
  });
  if (createdNote) return createdNote.id;
  else {
    return undefined;
  }
}

export async function getNotesByUserId(userid: string): Promise<Note[]> {
  const notes = await prisma.note.findMany({
    where: { authorId: userid },
  });
  return notes;
}

export async function getNoteById(noteId: string): Promise<Note | null> {
  const note = await prisma.note.findFirst({
    where: { id: noteId },
  });
  return note;
}

export async function deleteNoteById(noteId: string): Promise<boolean> {
  const deleted = await prisma.note.delete({
    where: { id: noteId },
  });
  if (deleted) return true;
  else return false;
}

export async function updateNoteContentById(
  noteId: string,
  title: string,
  content: string
): Promise<boolean> {
  const updateNote = await prisma.note.update({
    where: { id: noteId },
    data: {
      title: title,
      content: content,
    },
  });
  if (updateNote) return true;
  else return false;
}

export async function checkNoteExists(noteId: string): Promise<Boolean> {
  const note = await prisma.note.findFirst({
    where: { id: noteId },
  });
  if (note) return true;
  else return false;
}

export function convertTitleToSlug(title: string): string {
  return title.replace(" ", "-");
}
