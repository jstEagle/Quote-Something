"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function QuoteDetailPage({ params }: { params: { id: string } }) {
  const quote = useQuery(api.quotes.getByIdWithMeta, { quoteId: params.id as any });

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {quote === undefined && (
        <div className="text-muted-foreground">Loading quote…</div>
      )}
      {quote === null && (
        <div className="text-muted-foreground">Quote not found.</div>
      )}
      {quote && (
        <Card>
          <CardContent className="pt-6">
            <blockquote className="text-2xl md:text-3xl italic mb-6">“{quote.text}”</blockquote>
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              {quote.category ? <Badge variant="secondary">{quote.category}</Badge> : null}
              <span>{new Date(quote.createdAt).toLocaleDateString()}</span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}


