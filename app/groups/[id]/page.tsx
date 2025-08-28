import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QuoteCard } from "@/components/QuoteCard";

export default function GroupDetailPage({ params }: { params: { id: string } }) {
  const group = {
    id: params.id,
    name: "Friday Friends",
    description: "A place to collect our funniest quotes and memories.",
    memberCount: 12,
  };

  const quotes = [
    { id: 1, text: "Who needs coffee when chaos exists?", author: "Mia", category: "Morning", likes: 9, date: "2024-08-01" },
    { id: 2, text: "I debug with vibes.", author: "Chris", category: "Tech", likes: 14, date: "2024-07-22" },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6 flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">{group.name}</h1>
          <p className="text-muted-foreground">{group.description}</p>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link href={`/quotes/new`}>Add quote</Link>
          </Button>
          <Button variant="outline">Invite</Button>
        </div>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Group activity</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          {group.memberCount} members · {quotes.length} quotes
        </CardContent>
      </Card>

      <div className="grid gap-6">
        {quotes.map((q) => (
          <QuoteCard key={q.id} quote={q} />
        ))}
      </div>
    </div>
  );
}


