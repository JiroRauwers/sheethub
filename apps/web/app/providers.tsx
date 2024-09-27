"use client";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "~/components/theme-provider";

export default function AppProviders({
  children,
  sidebar_state,
}: {
  children: React.ReactNode;
  sidebar_state?: string;
}) {
  return (
    <SessionProvider
      refetchInterval={60 * 3}
      refetchWhenOffline={false}
      refetchOnWindowFocus
    >
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
}
