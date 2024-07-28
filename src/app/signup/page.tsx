import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createUser } from "~/server/auth";
import { login } from "~/server/auth";
import type { UserSchema } from "~/server/auth";

const accountSchema = z.object({
  username: z.string().min(2),
  password: z.string().min(6),
});

export default function Page() {
  async function handleSignupSubmit(FormData: FormData) {
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
    const created = await createUser(user);
    if (created) {
      const isLoggedIn = await login(user.username, user.password);
      if (!isLoggedIn) return "Login failed";
      cookies().set("Authorization", isLoggedIn, {
        secure: true,
        httpOnly: true,
        expires: Date.now() + 2 * 60 * 60 * 1000, // expires after 2 hours
        path: "/",
        sameSite: "strict",
      });
      redirect("/notes");
    }
  }

  return (
    <>
      <h1 className="text-5xl m-16">Secure Notes</h1>
      <div className="border-gray-200 border rounded-md px-4 py-8 space-y-4 w-1/4 shadow-md">
        <h1 className="font-semibold text-xl">Create Account</h1>
        <form
          action={handleSignupSubmit}
          className="flex flex-col items-start w-full"
        >
          <label className="text-sm">Username</label>
          <input
            type="text"
            name="username"
            className="mt-2 mb-1 p-1 w-full border border-gray-200 rounded-md"
          />
          <label className="text-sm">Password</label>
          <input
            type="password"
            name="password"
            className="mb-2 mt-1 p-1 w-full border border-gray-200 rounded-md"
          />
          <div className="flex w-full justify-between align-middle mt-4">
            <button
              type="submit"
              className="text-white bg-gray-600 hover:bg-gray-800 rounded-lg py-2 px-4 w-full"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
