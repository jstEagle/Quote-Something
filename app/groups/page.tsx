import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GroupCard } from "@/components/GroupCard";

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
              <Button asChild>
                <Link href="/groups/new">Create Group</Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Groups Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups.map((group) => (
          <GroupCard key={group.id} group={group} />
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
          <Button size="lg" asChild>
            <Link href="/groups/new">Create New Group</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
} 