import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QuoteCard } from "@/components/QuoteCard";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Collect <i>hilarious</i> quotes with your friends
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
          Create a group, add your inside-joke quotes, and later host a quiz to guess who said what.
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/groups/new">Create a group</Link>
          </Button>
          <Button variant="outline" asChild size="lg">
            <Link href="/how-it-works">How it works</Link>
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-16">
        <Card>
          <CardHeader>
            <CardTitle>Make a private group</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            Invite friends with a link. Everyone can add quotes and see the feed.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Add quotes effortlessly</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            Capture the funny line with author and context. Mobile-friendly and fast.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Host the quiz later</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            Turn your group’s quotes into a Kahoot-style game night. Coming soon.
          </CardContent>
        </Card>
      </div>

      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Recent quotes</h2>
        <Button variant="link" asChild>
          <Link href="/quotes">View all →</Link>
        </Button>
      </div>
      <div className="grid gap-6">
        {[
          { id: 1, text: "That meeting could have been a meme.", author: "Alex", category: "Work", likes: 42, date: "2024-09-01" },
          { id: 2, text: "I don’t nap, I pre-update my sleep.", author: "Sam", category: "Life", likes: 31, date: "2024-08-21" },
          { id: 3, text: "It’s not a bug, it’s a surprise feature.", author: "Jordan", category: "Tech", likes: 54, date: "2024-08-10" },
        ].map((q) => (
          <QuoteCard key={q.id} quote={q} />
        ))}
      </div>
    </div>
  );
}
