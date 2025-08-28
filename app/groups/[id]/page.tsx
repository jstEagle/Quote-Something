"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QuoteCard } from "@/components/QuoteCard";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";

export default function GroupDetailPage() {
  const routeParams = useParams();
  const id = routeParams?.id as string;
  const group = useQuery(api.groups.get, { id: id as any });
  const quotes = useQuery(api.quotes.listByGroup, { groupId: id as any });
  const [copied, setCopied] = useState(false);
  const inviteUrl = useMemo(() => {
    if (!group?.accessCode) return "";
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    return `${origin}/groups?code=${group.accessCode}`;
  }, [group?.accessCode]);

  async function copyInvite() {
    if (!inviteUrl) return;
    try {
      await navigator.clipboard.writeText(inviteUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6 flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">{group?.name ?? "Group"}</h1>
          <p className="text-muted-foreground">{group?.description}</p>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link href={`/quotes/new?groupId=${id}`}>Add quote</Link>
          </Button>
          <Button variant="outline" onClick={copyInvite}>{copied ? "Copied" : "Copy invite"}</Button>
        </div>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Group activity</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          {group?.memberIds?.length ?? 0} members · {quotes?.length ?? 0} quotes
        </CardContent>
      </Card>

      <div className="grid gap-6">
        {quotes?.map((q) => (
          <QuoteCard key={q._id} quote={{ id: q._id, text: q.text, author: undefined, category: q.category, likes: undefined, date: new Date(q.createdAt).toLocaleDateString() }} />
        ))}
      </div>
    </div>
  );
}


