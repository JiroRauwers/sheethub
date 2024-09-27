"use server";
import { signOut } from "~/auth";

export async function logout() {
  "use server";
  return signOut();
}
