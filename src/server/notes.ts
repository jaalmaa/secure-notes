import "server-only";
import type { UUID } from "crypto";
import { PrismaClient } from "@prisma/client";

type User = {
  id: UUID;
  username: string;
  password: string;
  notes: Note[];
};

export type Note = {
  id?: UUID;
  title: string;
  slug?: string;
  content: string;
  author?: User;
  authorId: UUID;
};

const prisma = new PrismaClient();

export async function createNote(note: Note) {
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
  return createdNote.id;
}

export async function getNotesByUserId(userid: UUID) {
  const notes = await prisma.note.findMany({
    where: { authorId: userid },
  });
  return notes;
}

export async function getNoteById(noteId: UUID) {
  const note = await prisma.note.findFirst({
    where: { id: noteId },
  });
  return note;
}

export async function deleteNoteById(noteId: UUID) {
  const deleted = await prisma.note.delete({
    where: { id: noteId },
  });
  if (deleted) return true;
  else return false;
}

export async function updateNoteContentById(
  noteId: UUID,
  title: string,
  content: string
) {
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

export async function checkNoteExists(noteId: UUID): Promise<Boolean> {
  const note = await prisma.note.findFirst({
    where: { id: noteId },
  });
  if (note) return true;
  else return false;
}

export function convertTitleToSlug(title: string): string {
  return title.replace(" ", "-");
}
