"use server";
import { z } from "zod";
import { cookies } from "next/headers";
import { decodeToken } from "~/server/auth";
import { redirect } from "next/navigation";
import {
  createNote,
  deleteNoteById,
  getNoteById,
  updateNoteContentById,
} from "~/server/notes";
import { UUID } from "crypto";
import { RequestCookie } from "~/middleware";
import { getNotesByUserId } from "~/server/notes";
import { revalidatePath } from "next/cache";

const NoteSubmitSchema = z.object({
  id: z.string().uuid().nullable().optional(),
  title: z.string().min(1).trim(),
  content: z.string().trim(),
});

export type NoteSubmitData = z.infer<typeof NoteSubmitSchema>;

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
  const userId = await getCurrentUserContext();
  if (!note || userId !== note.authorId) redirect("/notes");
  return note;
}

export async function deleteNote(noteId: UUID) {
  const deletedNote = deleteNoteById(noteId);
  redirect("/notes");
}

export async function SaveNote(notedata: NoteSubmitData) {
  const authCookie = cookies().get("Authorization");
  if (!authCookie) redirect("/login");
  const { title, content } = notedata;
  const id = notedata.id ? notedata.id : undefined;
  try {
    NoteSubmitSchema.parse({
      id: id,
      title: title,
      content: content,
    });
  } catch (error) {
    return "An error occurred.";
  }
  if (id) {
    await updateNoteContentById(id as UUID, title, content);
    revalidatePath(`/notes/${notedata.id}`);
  } else {
    const authorId = await getUUIDFromJWT(authCookie);
    const createdNoteId = await createNote({ title, content, authorId });
    redirect(`/notes/${createdNoteId}`);
  }
}
