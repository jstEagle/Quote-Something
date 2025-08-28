import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export type Quote = {
  id: number | string;
  text: string;
  author?: string;
  category?: string;
  likes?: number;
  date?: string;
};

export function QuoteCard({ quote }: { quote: Quote }) {
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
          {typeof quote.likes === "number" ? (
            <div className="flex items-center gap-1 ml-4 text-muted-foreground">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-red-500">
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {quote.likes}
              </Button>
            </div>
          ) : null}
        </div>
        <div className="flex gap-3">
          <Button variant="link" size="sm" className="p-0 h-auto">Share</Button>
          <Button variant="link" size="sm" className="p-0 h-auto">Comment</Button>
          <Button variant="link" size="sm" className="p-0 h-auto">Save</Button>
        </div>
      </CardContent>
    </Card>
  );
}


