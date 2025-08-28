import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { QuoteCard } from "@/components/QuoteCard";

export default function QuotesPage() {
  // Mock data for quotes
  const quotes = [
    {
      id: 1,
      text: "The only way to do great work is to love what you do.",
      author: "Steve Jobs",
      category: "Motivation",
      likes: 1247,
      date: "2024-01-15"
    },
    {
      id: 2,
      text: "Be the change you wish to see in the world.",
      author: "Mahatma Gandhi",
      category: "Inspiration",
      likes: 892,
      date: "2024-01-14"
    },
    {
      id: 3,
      text: "Life is what happens when you're busy making other plans.",
      author: "John Lennon",
      category: "Life",
      likes: 567,
      date: "2024-01-13"
    },
    {
      id: 4,
      text: "The future belongs to those who believe in the beauty of their dreams.",
      author: "Eleanor Roosevelt",
      category: "Dreams",
      likes: 743,
      date: "2024-01-12"
    },
    {
      id: 5,
      text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
      author: "Winston Churchill",
      category: "Success",
      likes: 634,
      date: "2024-01-11"
    },
    {
      id: 6,
      text: "The best way to predict the future is to invent it.",
      author: "Alan Kay",
      category: "Innovation",
      likes: 445,
      date: "2024-01-10"
    }
  ];

  const categories = ["All", "Motivation", "Inspiration", "Life", "Dreams", "Success", "Innovation"];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Quotes</h1>
        <p className="text-muted-foreground">
          Discover and share inspiring quotes from people around the world.
        </p>
      </div>

      {/* Search and Filter */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Search quotes..."
              />
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

      {/* Quotes List */}
      <div className="grid gap-6">
        {quotes.map((quote) => (
          <QuoteCard key={quote.id} quote={quote} />
        ))}
      </div>

      {/* Load More */}
      <div className="text-center mt-8">
        <Button variant="outline" size="lg">
          Load More Quotes
        </Button>
      </div>
    </div>
  );
} 