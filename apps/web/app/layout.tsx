import type { Metadata } from "next";
import AppProviders from "./providers";
import { cookies } from "next/headers";
import "@sheet-hub/ui/globals.css";

export const metadata: Metadata = {
  title: "Sheet Hub",
  description: "Sheet Hub",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </head>
      <body>
        <AppProviders sidebar_state={cookies().get("sidebar:state")?.value}>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
