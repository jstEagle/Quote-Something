import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Quote Something - Share Your Favorite Quotes",
  description: "A platform to share and discover inspiring quotes from people around the world",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <nav className="bg-background border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link href="/" className="text-xl font-bold">
                  Quote Something
                </Link>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="ghost" asChild>
                  <Link href="/">Home</Link>
                </Button>
                <Button variant="ghost" asChild>
                  <Link href="/quotes">Quotes</Link>
                </Button>
                <Button variant="ghost" asChild>
                  <Link href="/groups">Groups</Link>
                </Button>
              </div>
            </div>
          </div>
        </nav>
        <main className="min-h-screen bg-muted/50">
          {children}
        </main>
      </body>
    </html>
  );
}
