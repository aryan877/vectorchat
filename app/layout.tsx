import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Providers from "./providers";
import { Navbar } from "@/components/nav/navbar";

// Initialize font outside of the component
const inter = Inter({
  subsets: ["latin"],
  display: "swap", // Add display swap for better loading
  variable: "--font-inter", // Use CSS variable
});

export const metadata: Metadata = {
  title: "VectorChat AI - Intelligent Knowledge Base Chat",
  description: "Chat with your embedded content using DataStax and OpenAI",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <Providers>
          <div className="relative flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
