"use client";

import { useParams } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { QuoteCard } from "@/components/QuoteCard";

export default function QuoteDetailPage() {
  const { id } = useParams();
  const quote = useQuery(api.quotes.getByIdWithMeta, { quoteId: id as any });

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {quote && (
        <QuoteCard
          quote={{
            id: quote._id,
            text: quote.text,
            category: quote.category,
            likesCount: (quote as any).likesCount,
            likedByMe: (quote as any).likedByMe,
            savedByMe: (quote as any).savedByMe,
            date: new Date(quote.createdAt).toLocaleDateString(),
          }}
        />
      )}
    </div>
  );
}


