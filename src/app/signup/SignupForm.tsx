"use client";

import { handleUserSignup } from "~/app/signup/SignupActions";
import { useFormState } from "react-dom";

export function SignupForm() {
  const [errorMessage, signupSubmitAction] = useFormState(
    handleUserSignup,
    null
  );

  return (
    <>
      <div className="border-gray-200 border rounded-md px-4 py-8 space-y-4 w-1/4 shadow-md">
        <h1 className="font-semibold text-xl">Create Account</h1>
        <form
          action={signupSubmitAction}
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
        <p className="text-sm text-red-400">
          {errorMessage ? errorMessage : ""}
        </p>
      </div>
    </>
  );
}
