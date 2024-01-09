import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "World Explorer",
  description: "Built with NextJS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-gradient-radial from-slate-800 to-slate-950 min-h-screen flex flex-col`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
