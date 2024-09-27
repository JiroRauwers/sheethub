"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { AppSidebar } from "~/components/sidebar";
import { socket } from "~/lib/socket";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { status, data } = useSession();

  useEffect(() => {
    console.log("status: ", status);
    if (status === "unauthenticated") {
      console.error("unauthenticated");
      redirect("/login");
    }
    if (data) socket.emit("handshake", data.user?.id);

    return () => {
      socket.disconnect();
    };
  }, [status, data]);

  return (
    <>
      <AppSidebar />
      {children}
    </>
  );
}
