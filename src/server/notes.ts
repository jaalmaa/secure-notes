import "server-only";
import type { UUID } from "crypto";
import { PrismaClient } from "@prisma/client";

type User = {
  id: UUID;
  username: string;
  password: string;
  notes: Note[];
};

type Note = {
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
  await prisma.note.create({
    data: {
      title: title,
      slug: slug,
      content: content,
      authorId: authorId,
    },
  });
}

export async function getNotesByUserId(userid: UUID) {}

export function convertTitleToSlug(title: string): string {
  return title.replace(" ", "-");
}
