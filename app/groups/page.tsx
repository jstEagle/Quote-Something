"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GroupCard } from "@/components/GroupCard";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";

export default function GroupsPage() {
  const router = useRouter();
  const params = useSearchParams();
  const { isSignedIn } = useUser();
  const groups = useQuery(api.groups.listMine, {});
  const [joinCode, setJoinCode] = useState("");
  const joinByCode = useMutation(api.groups.joinByCode);

  useEffect(() => {
    const code = params.get("code");
    if (!code) return;
    const tryJoin = async () => {
      if (!isSignedIn) {
        router.push("/sign-in");
        return;
      }
      try {
        const groupId = await joinByCode({ accessCode: code.toUpperCase() });
        if (groupId) router.push(`/groups/${groupId}`);
      } catch {
        // no-op
      }
    };
    void tryJoin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params, isSignedIn]);

  async function handleJoin() {
    if (!joinCode) return;
    if (!isSignedIn) {
      router.push("/sign-in");
      return;
    }
    const groupId = await joinByCode({ accessCode: joinCode.toUpperCase() });
    if (groupId) router.push(`/groups/${groupId}`);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Groups</h1>
        <p className="text-muted-foreground">Create a friend group or join with an access code.</p>
      </div>

      {/* Join or Create */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex-1">
              <Input type="text" placeholder="Enter access code" value={joinCode} onChange={(e) => setJoinCode(e.target.value.toUpperCase())} />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleJoin}>Join</Button>
              <Button asChild variant="outline">
                <Link href="/groups/new">Create Group</Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Groups Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups?.map((group: any) => (
          <GroupCard key={group._id} group={{
            id: group._id,
            name: group.name,
            description: group.description,
            memberCount: group.memberIds.length,
            quoteCount: 0,
            category: group.categoryNames[0],
            isJoined: true,
          }} />
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