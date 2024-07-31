"use server";
import { z } from "zod";
import { cookies } from "next/headers";
import { decodeToken } from "~/server/auth";
import { redirect } from "next/navigation";
import { createNote } from "~/server/notes";
import { UUID } from "crypto";
import { RequestCookie } from "~/middleware";
import { getNotesByUserId } from "~/server/notes";

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
  const authorId = await getUUIDFromJWT(authCookie);
  const createdNote = await createNote({ title, content, authorId });
  return "";
}
