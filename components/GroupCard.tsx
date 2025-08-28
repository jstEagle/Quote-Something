import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export type Group = {
  id: number | string;
  name: string;
  description: string;
  memberCount: number;
  quoteCount: number;
  category?: string;
  isJoined?: boolean;
};

export function GroupCard({ group }: { group: Group }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{group.name}</CardTitle>
        <CardDescription className="text-sm">{group.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0z" />
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
        {group.category ? <Badge variant="secondary" className="mb-4">{group.category}</Badge> : null}
        <div className="flex gap-2">
          {group.isJoined ? (
            <Button variant="secondary" className="flex-1" disabled>
              Joined
            </Button>
          ) : (
            <Button className="flex-1">Join Group</Button>
          )}
          <Button variant="outline" asChild>
            <Link href={`/groups/${group.id}`}>View</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}


