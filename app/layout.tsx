import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "CRM Application",
  description: "Customer Relationship Management System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
