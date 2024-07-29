"use client";
import Link from "next/link";
import { useFormState } from "react-dom";
import { handleUserLogin } from "~/app/login/LoginActions";

export function LoginForm() {
  const [errorMessage, loginSubmitAction] = useFormState(handleUserLogin, null);

  return (
    <>
      <div className="border-gray-200 border rounded-md px-4 py-8 space-y-4 w-1/4 shadow-md">
        <h1 className="font-semibold text-xl">Login</h1>
        <form
          action={loginSubmitAction}
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
              className="text-white bg-gray-600 hover:bg-gray-800 rounded-lg py-2 px-4"
            >
              Sign in
            </button>
            <Link
              href="/signup"
              className="hover:text-gray-800 text-gray-600 py-2 mr-2"
            >
              Create account
            </Link>
          </div>
        </form>
        <p className="text-sm text-red-400">
          {errorMessage ? errorMessage : ""}
        </p>
      </div>
    </>
  );
}
