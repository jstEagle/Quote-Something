"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Suspense, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter, useSearchParams } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useUser } from "@clerk/nextjs";

function NewQuotePageContent() {
  const router = useRouter();
  const params = useSearchParams();
  const groupId = params.get("groupId");
  const createQuote = useMutation(api.quotes.create);
  const groups = useQuery(api.groups.listMine, {});
  const { isSignedIn } = useUser();
  const [text, setText] = useState("");
  const [category, setCategory] = useState("");
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isSignedIn) {
      router.push("/sign-in");
      return;
    }
    const effectiveGroupId = (groupId || selectedGroupId) as string | null;
    if (!effectiveGroupId) return;
    try {
      setIsSubmitting(true);
      await createQuote({ text, groupId: effectiveGroupId as any, category: category || undefined });
      router.push(`/groups/${effectiveGroupId}`);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Share a quote</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={onSubmit}>
            {!groupId && (
              <div>
                <label className="block text-sm mb-1">Group</label>
                <Select onValueChange={setSelectedGroupId}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a group" />
                  </SelectTrigger>
                  <SelectContent>
                    {groups?.map((g: any) => (
                      <SelectItem key={g._id} value={g._id}>
                        {g.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            <div>
              <label className="block text-sm mb-1">Quote</label>
              <Textarea placeholder="Type the quote here…" rows={4} value={text} onChange={(e) => setText(e.target.value)} required />
            </div>
            <div>
              <label className="block text-sm mb-1">Category (optional)</label>
              <Input placeholder="e.g. Work, Trip, Inside joke" value={category} onChange={(e) => setCategory(e.target.value)} />
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button className="flex-1" type="submit" disabled={isSubmitting || !(groupId || selectedGroupId)}>
                {isSubmitting ? "Saving..." : "Save"}
              </Button>
              <Button variant="outline" className="flex-1" type="button" onClick={() => router.back()}>Cancel</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default function NewQuotePage() {
  return (
    <Suspense fallback={<div className="px-4 py-8 text-muted-foreground">Loading…</div>}>
      <NewQuotePageContent />
    </Suspense>
  );
}


