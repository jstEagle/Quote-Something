"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { QuoteCard } from "@/components/QuoteCard";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

export default function QuotesPage() {
  const quotes = useQuery(api.quotes.listMine, {});

  const categories = ["All", "Motivation", "Inspiration", "Life", "Dreams", "Success", "Innovation"];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Quotes</h1>
        <p className="text-muted-foreground">Discover and share inspiring quotes from your groups.</p>
      </div>

      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input type="text" placeholder="Search quotes..." />
            </div>
            <div className="flex gap-2">
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button asChild>
                <Link href="/quotes/new">Share Quote</Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <SignedOut>
        <div className="text-center text-muted-foreground">
          <p className="mb-4">Sign in to see quotes from your groups.</p>
          <SignInButton mode="modal">
            <Button>Sign in</Button>
          </SignInButton>
        </div>
      </SignedOut>

      <SignedIn>
        <div className="grid gap-6">
          {!quotes && (
            <div className="text-muted-foreground">Loading quotes…</div>
          )}
          {quotes && quotes.length === 0 && (
            <div className="text-muted-foreground">No quotes yet. Join or create a group and share one!</div>
          )}
          {quotes && quotes.map((q: any) => (
            <QuoteCard
              key={q._id}
              quote={{
                id: q._id,
                text: q.text,
                category: q.category,
                date: new Date(q.createdAt).toLocaleDateString(),
              }}
            />
          ))}
        </div>
      </SignedIn>

      <div className="text-center mt-8">
        <Button variant="outline" size="lg">Load More Quotes</Button>
      </div>
    </div>
  );
}