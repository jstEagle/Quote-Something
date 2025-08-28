import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { MobileNav } from "@/components/MobileNav";

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
        <nav className="bg-background/70 backdrop-blur border-b sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link href="/" className="text-xl font-bold">
                  Quote Something
                </Link>
              </div>
              <div className="hidden md:flex items-center space-x-2">
                <Button variant="ghost" asChild>
                  <Link href="/">Home</Link>
                </Button>
                <Button variant="ghost" asChild>
                  <Link href="/quotes">Quotes</Link>
                </Button>
                <Button variant="ghost" asChild>
                  <Link href="/groups">Groups</Link>
                </Button>
                <Button variant="ghost" asChild>
                  <Link href="/how-it-works">How It Works</Link>
                </Button>
                <ThemeToggle />
              </div>
              <div className="flex md:hidden items-center gap-1">
                <ThemeToggle />
                <MobileNav />
              </div>
            </div>
          </div>
        </nav>
        <main className="min-h-screen">
          {children}
        </main>
        <footer className="border-t mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-sm text-muted-foreground flex flex-col md:flex-row items-center justify-between gap-4">
            <p>© {new Date().getFullYear()} Quote Something</p>
            <div className="flex items-center gap-4">
              <Link href="/how-it-works" className="hover:underline">How it works</Link>
              <Link href="/quotes/new" className="hover:underline">Share a quote</Link>
              <Link href="/groups/new" className="hover:underline">Create a group</Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
