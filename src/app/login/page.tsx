import { cookies } from "next/headers";
import Link from "next/link";
import { z } from "zod";
import { login, type UserSchema } from "~/server/auth";

const accountSchema = z.object({
  username: z.string().min(2),
  password: z.string().min(6),
});

export default function Page() {
  const handleLoginSubmit = async (FormData: FormData) => {
    "use server";
    const username = FormData.get("username") as string;
    const password = FormData.get("password") as string;
    try {
      accountSchema.parse({
        username: username,
        password: password,
      });
    } catch (error) {
      console.log(error);
    }
    const user: UserSchema = { username, password };
    const isLoggedIn = await login(user.username, user.password);
    if (!isLoggedIn) return "Login failed";
    cookies().set("Authorization", isLoggedIn, {
      secure: true,
      httpOnly: true,
      expires: Date.now() + 2 * 60 * 60 * 1000, // expires after 2 hours
      path: "/",
      sameSite: "strict",
    });
  };

  return (
    <>
      <h1>Login</h1>
      <form action={handleLoginSubmit}>
        <input placeholder="username" name="username" />
        <input placeholder="password" type="password" name="password" />
        <button type="submit">Log in</button>
      </form>
      <Link href="/login">Create account</Link>
    </>
  );
}
