"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { login } from "../actions";

export function LoginForm() {
  const [state, loginAction] = useActionState(login, undefined);

  return (
    <form action={loginAction} className="flex max-w-[300px] flex-col gap-4 p-4 bg-gray-800 rounded-lg">
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-white">Email</label>
        <input id="email" name="email" placeholder="Email" className="p-2 rounded-md" />
      </div>
      {state?.errors?.email && (
        <p className="text-red-500">{state.errors.email}</p>
      )}

      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="text-white">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          className="p-2 rounded-md"
        />
      </div>
      {state?.errors?.password && (
        <p className="text-red-500">{state.errors.password}</p>
      )}
      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending} type="submit" className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-500">
      Login
    </button>
  );
}