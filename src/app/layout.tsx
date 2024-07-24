import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Secure Notes",
  description: "Securely store notes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="h-screen max-h-screen w-screen max-w-screen">
        {children}
      </body>
    </html>
  );
}
