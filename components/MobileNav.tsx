"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  function toggle() {
    setOpen((v) => !v);
  }

  function handleNavigate() {
    setOpen(false);
  }

  return (
    <div className="md:hidden">
      <Button variant="ghost" size="icon" aria-label="Open menu" onClick={toggle}>
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>
      {open ? (
        <div className="fixed top-16 inset-x-0 z-40 bg-background/95 backdrop-blur border-b">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <ul className="flex flex-col gap-2">
              <li>
                <Button variant="ghost" className="w-full justify-start" asChild onClick={handleNavigate}>
                  <Link href="/">Home</Link>
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="w-full justify-start" asChild onClick={handleNavigate}>
                  <Link href="/quotes">Quotes</Link>
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="w-full justify-start" asChild onClick={handleNavigate}>
                  <Link href="/groups">Groups</Link>
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="w-full justify-start" asChild onClick={handleNavigate}>
                  <Link href="/how-it-works">How It Works</Link>
                </Button>
              </li>
              <li className="pt-2">
                <Button asChild className="w-full" onClick={handleNavigate}>
                  <Link href="/groups/new">Create a group</Link>
                </Button>
              </li>
            </ul>
          </nav>
        </div>
      ) : null}
    </div>
  );
}


