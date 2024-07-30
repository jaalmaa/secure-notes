"use server";
import { z } from "zod";
import { cookies } from "next/headers";
import { decodeToken } from "~/server/auth";
import { redirect } from "next/navigation";
import { createNote } from "~/server/notes";
import { UUID } from "crypto";

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
  const decodedToken = await decodeToken(authCookie.value);
  const authorId = decodedToken.sub as UUID;
  const createdNote = await createNote({ title, content, authorId });
  return "1";
}
