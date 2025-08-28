import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HowItWorksPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">How it works</h1>
      <p className="text-muted-foreground mb-10">
        Quote Something helps friend groups collect funny one-liners and turn them into a quiz later.
      </p>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <Card>
          <CardHeader>
            <CardTitle>Create a group</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">Start a private space for your friends.</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Add quotes</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">Anyone in the group can add quotes with author and context.</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Play the quiz</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">Turn quotes into a Kahoot-style game night. Coming soon.</CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button asChild>
          <Link href="/groups/new">Create a group</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/quotes/new">Share a quote</Link>
        </Button>
      </div>
    </div>
  );
}


