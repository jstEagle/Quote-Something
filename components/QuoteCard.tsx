"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState, useMemo } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export type Quote = {
  id: number | string;
  text: string;
  author?: string;
  category?: string;
  likesCount?: number;
  likedByMe?: boolean;
  savedByMe?: boolean;
  date?: string;
};

export function QuoteCard({ quote }: { quote: Quote }) {
  const toggleLike = useMutation(api.quotes.toggleLike);
  const toggleSave = useMutation(api.quotes.toggleSave);
  const [liked, setLiked] = useState(!!quote.likedByMe);
  const [saved, setSaved] = useState(!!quote.savedByMe);
  const [likesCount, setLikesCount] = useState<number>(quote.likesCount ?? 0);
  const [copied, setCopied] = useState(false);

  const shareUrl = useMemo(() => {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    return `${origin}/quotes/${quote.id}`;
  }, [quote.id]);

  async function onToggleLike() {
    const optimisticLiked = !liked;
    setLiked(optimisticLiked);
    setLikesCount((c) => c + (optimisticLiked ? 1 : -1));
    try {
      await toggleLike({ quoteId: quote.id as any });
    } catch {
      setLiked(!optimisticLiked);
      setLikesCount((c) => c + (optimisticLiked ? -1 : 1));
    }
  }

  async function onToggleSave() {
    const optimisticSaved = !saved;
    setSaved(optimisticSaved);
    try {
      await toggleSave({ quoteId: quote.id as any });
    } catch {
      setSaved(!optimisticSaved);
    }
  }

  async function onShare() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <blockquote className="text-xl italic mb-4">"{quote.text}"</blockquote>
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-2">
              {quote.author ? <span className="font-medium">— {quote.author}</span> : null}
              {quote.category ? <Badge variant="secondary">{quote.category}</Badge> : null}
              {quote.date ? <span>{quote.date}</span> : null}
            </div>
          </div>
          <div className="flex items-center gap-1 ml-4 text-muted-foreground">
            <Button
              onClick={onToggleLike}
              variant="ghost"
              size="sm"
              className={liked ? "text-red-500" : "text-muted-foreground hover:text-red-500"}
              aria-label={liked ? "Unlike" : "Like"}
            >
              <svg className="w-5 h-5 mr-1" fill={liked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {likesCount}
            </Button>
          </div>
        </div>
        <div className="flex gap-3 flex-wrap">
          <Button onClick={onShare} variant="link" size="sm" className="p-0 h-auto">{copied ? "Copied" : "Share"}</Button>
          <Button onClick={onToggleSave} variant="link" size="sm" className="p-0 h-auto">{saved ? "Saved" : "Save"}</Button>
        </div>
      </CardContent>
    </Card>
  );
}


