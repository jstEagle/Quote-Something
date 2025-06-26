import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function GroupsPage() {
  // Mock data for groups
  const groups = [
    {
      id: 1,
      name: "Motivational Quotes",
      description: "Daily inspiration and motivation to keep you going. Share quotes that lift spirits and drive success.",
      memberCount: 1247,
      quoteCount: 892,
      category: "Motivation",
      isJoined: true
    },
    {
      id: 2,
      name: "Philosophy & Wisdom",
      description: "Deep thoughts and philosophical insights from great minds throughout history.",
      memberCount: 856,
      quoteCount: 634,
      category: "Philosophy",
      isJoined: false
    },
    {
      id: 3,
      name: "Business & Leadership",
      description: "Quotes about entrepreneurship, leadership, and business success from industry leaders.",
      memberCount: 1123,
      quoteCount: 445,
      category: "Business",
      isJoined: true
    },
    {
      id: 4,
      name: "Love & Relationships",
      description: "Beautiful quotes about love, friendship, and human connections.",
      memberCount: 678,
      quoteCount: 567,
      category: "Relationships",
      isJoined: false
    },
    {
      id: 5,
      name: "Creativity & Art",
      description: "Inspiration for artists, writers, and creative minds. Quotes that spark imagination.",
      memberCount: 445,
      quoteCount: 234,
      category: "Creativity",
      isJoined: false
    },
    {
      id: 6,
      name: "Science & Discovery",
      description: "Quotes from scientists, inventors, and explorers about discovery and innovation.",
      memberCount: 789,
      quoteCount: 345,
      category: "Science",
      isJoined: true
    }
  ];

  const categories = ["All", "Motivation", "Philosophy", "Business", "Relationships", "Creativity", "Science"];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Groups</h1>
        <p className="text-muted-foreground">
          Join communities of like-minded people and share quotes in themed groups.
        </p>
      </div>

      {/* Search and Filter */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Search groups..."
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
              <Button>
                Create Group
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Groups Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups.map((group) => (
          <Card key={group.id}>
            <CardHeader>
              <CardTitle className="text-lg">{group.name}</CardTitle>
              <CardDescription className="text-sm">
                {group.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  {group.memberCount.toLocaleString()} members
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  {group.quoteCount} quotes
                </span>
              </div>
              <Badge variant="secondary" className="mb-4">
                {group.category}
              </Badge>
              <div className="flex gap-2">
                {group.isJoined ? (
                  <Button variant="secondary" className="flex-1" disabled>
                    Joined
                  </Button>
                ) : (
                  <Button className="flex-1">
                    Join Group
                  </Button>
                )}
                <Button variant="outline" asChild>
                  <Link href={`/groups/${group.id}`}>
                    View
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create Your Own Group */}
      <Card className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50">
        <CardContent className="pt-6 text-center">
          <h2 className="text-2xl font-bold mb-4">
            Can't find the right group?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Create your own group and build a community around your favorite quotes and themes. 
            Share your passion with like-minded people.
          </p>
          <Button size="lg">
            Create New Group
          </Button>
        </CardContent>
      </Card>
    </div>
  );
} 