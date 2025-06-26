import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-6">
          Share Your Favorite Quotes
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
          Discover inspiring quotes from people around the world. Join groups, share your thoughts, 
          and connect with others through the power of words.
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/quotes">
              Browse Quotes
            </Link>
          </Button>
          <Button variant="outline" asChild size="lg">
            <Link href="/groups">
              Join Groups
            </Link>
          </Button>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <Card>
          <CardHeader>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <CardTitle>Share Quotes</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Post your favorite quotes and share them with the community. 
              Add context, attribution, and your thoughts.
            </CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <CardTitle>Join Groups</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Connect with like-minded people in themed groups. 
              Discuss quotes, share insights, and build communities.
            </CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <CardTitle>Discover</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Explore quotes from different categories, authors, and themes. 
              Find inspiration and new perspectives.
            </CardDescription>
          </CardContent>
        </Card>
      </div>

      {/* Recent Quotes Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Quotes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <blockquote className="text-lg italic">
                "The only way to do great work is to love what you do."
              </blockquote>
              <p className="text-sm text-muted-foreground mt-2">— Steve Jobs</p>
            </div>
            <Separator />
            <div className="border-l-4 border-green-500 pl-4">
              <blockquote className="text-lg italic">
                "Be the change you wish to see in the world."
              </blockquote>
              <p className="text-sm text-muted-foreground mt-2">— Mahatma Gandhi</p>
            </div>
            <Separator />
            <div className="border-l-4 border-purple-500 pl-4">
              <blockquote className="text-lg italic">
                "Life is what happens when you're busy making other plans."
              </blockquote>
              <p className="text-sm text-muted-foreground mt-2">— John Lennon</p>
            </div>
          </div>
          <div className="mt-6 text-center">
            <Button variant="link" asChild>
              <Link href="/quotes">
                View all quotes →
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
