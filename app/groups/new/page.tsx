import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function NewGroupPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Create a group</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Group name</label>
            <Input placeholder="e.g. Friday Friends" />
          </div>
          <div>
            <label className="block text-sm mb-1">Description</label>
            <Textarea placeholder="What’s this group about?" rows={3} />
          </div>
          <div className="grid sm:grid-cols-2 gap-2">
            <Button>Create</Button>
            <Button variant="outline">Cancel</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


