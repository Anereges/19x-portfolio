import type { Metadata } from "next";
import "./globals.css";
import { AdminAccess } from '@/components/layout/AdminAccess';

export const metadata: Metadata = {
  title: "Portfolio Platform | Software & Cybersecurity",
  description: "Showcasing Software Engineering and Cybersecurity projects",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AdminAccess />
        {children}
      </body>
    </html>
  );
}