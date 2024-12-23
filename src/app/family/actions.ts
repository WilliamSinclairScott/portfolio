"use server";
import { deleteSession } from "../lib/session";
import { redirect } from "next/navigation";


//TODO: redundant code, need to bring actions out and classify them correctly
export async function logout() {
  await deleteSession();
  redirect("/login");
}