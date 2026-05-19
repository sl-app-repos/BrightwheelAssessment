import type { Metadata } from "next";
import { inter } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "BrightStart AI Front Desk",
  description:
    "Prototype AI front desk for Little Sprouts Learning Center — guardian Q&A and operator control center.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-dvh`}>
      <body className={`${inter.className} h-dvh overflow-hidden antialiased`}>
        {children}
      </body>
    </html>
  );
}
