"use server";

import { z } from "zod";
import { createSession, deleteSession } from "../lib/session";
import { redirect } from "next/navigation";

const whitelistedUser = {
  id: "family",
  emails: process.env.FAMILY_WHITELIST,
  password: process.env.FAMILY_PASSWORD,
};

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .trim(),
});

export async function login(prevState: unknown, formData: FormData) {
  const result = loginSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { email, password } = result.data;

  if (whitelistedUser.emails?.split(",").includes(email) || password !== whitelistedUser.password) {
    return {
      errors: {
        email: ["Invalid email or password"],
      },
    };
  }

  await createSession(whitelistedUser.id);

  redirect("/family");
}


//TODO: redundant code, need to bring actions out and classify them correctly
export async function logout() {
  await deleteSession();
  redirect("/login");
}