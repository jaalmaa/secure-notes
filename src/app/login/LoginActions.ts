"use server";
import { z } from "zod";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { login, type UserSchema } from "~/server/auth";

const accountSchema = z.object({
  username: z.string().min(2),
  password: z.string().min(6),
});

export async function handleUserLogin(
  previousState: string | undefined | null,
  formData: FormData
) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;
  try {
    accountSchema.parse({
      username: username,
      password: password,
    });
  } catch (error) {
    return "Invalid username or password";
  }
  const user: UserSchema = { username, password };
  try {
    const isLoggedIn = await login(user.username, user.password);
    if (isLoggedIn) {
      cookies().set("Authorization", isLoggedIn, {
        secure: true,
        httpOnly: true,
        expires: Date.now() + 2 * 60 * 60 * 1000, // expires after 2 hours
        path: "/",
        sameSite: "strict",
      });
    }
  } catch (error) {
    return "Invalid username or password";
  }
  redirect("/notes");
}
