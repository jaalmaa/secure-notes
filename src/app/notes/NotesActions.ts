"use server";
import { z } from "zod";
import { cookies } from "next/headers";
import { decodeToken } from "~/server/auth";
import { redirect } from "next/navigation";
import { createNote, getNoteById, updateNoteContentById } from "~/server/notes";
import { UUID } from "crypto";
import { RequestCookie } from "~/middleware";
import { getNotesByUserId } from "~/server/notes";
import { revalidatePath } from "next/cache";

export async function getUUIDFromJWT(authCookie: RequestCookie) {
  const decodedToken = await decodeToken(authCookie.value);
  const authorId = decodedToken.sub as UUID;
  return authorId;
}

export async function getCurrentUserContext() {
  const authCookie = cookies().get("Authorization");
  if (!authCookie) {
    return undefined;
  }
  const currentUserContext = getUUIDFromJWT(authCookie);
  return currentUserContext;
}

export async function getNotesForUser(userContext: UUID) {
  const notes = await getNotesByUserId(userContext);
  return notes;
}

export async function getNote(noteId: UUID) {
  const note = await getNoteById(noteId);
  if (!note) return undefined;
  return note;
}

export async function handleNoteSubmit(
  previousState: string | undefined | null,
  formData: FormData
) {
  const authCookie = cookies().get("Authorization");
  if (!authCookie) {
    redirect("/login");
  }
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const id = formData.get("id") as UUID;
  if (id) {
    const updateNote = await updateNoteContentById(id, title, content);
    revalidatePath(`/notes/${id}`);
  } else {
    const authorId = await getUUIDFromJWT(authCookie);
    const createdNoteId = await createNote({ title, content, authorId });
    redirect(`/notes/${createdNoteId}`);
  }
  return "";
}
