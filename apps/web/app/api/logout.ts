"use server";
import { signOut } from "~/auth";
import { redirect } from "next/navigation";

export async function logout() {
  "use server";
  signOut({
    redirect: true,
    redirectTo: "/login",
  });
  return redirect("/login");
}
