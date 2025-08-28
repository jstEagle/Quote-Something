"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";

export default function NewGroupPage() {
  const router = useRouter();
  const { isSignedIn } = useUser();
  const createGroup = useMutation(api.groups.create);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState<string>("");

  function generateAccessCode() {
    return Math.random().toString(36).slice(2, 8).toUpperCase();
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isSignedIn) {
      router.push("/sign-in");
      return;
    }
    const code = generateAccessCode();
    const categoryNames = categories
      .split(",")
      .map((c) => c.trim())
      .filter(Boolean);
    const groupId = await createGroup({
      name,
      description: description || undefined,
      accessCode: code,
      categoryNames,
    });
    router.push(`/groups/${groupId}`);
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Create a friend group</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={onSubmit}>
            <div>
              <label className="block text-sm mb-1">Group name</label>
              <Input placeholder="e.g. Friday Friends" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
              <label className="block text-sm mb-1">Description</label>
              <Textarea placeholder="What’s this group about?" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm mb-1">Custom categories (comma-separated)</label>
              <Input placeholder="e.g. Work, Trip, Inside joke" value={categories} onChange={(e) => setCategories(e.target.value)} />
            </div>
            <div className="grid sm:grid-cols-2 gap-2">
              <Button type="submit">Create</Button>
              <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}


