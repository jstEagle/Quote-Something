import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function NewQuotePage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Share a quote</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Quote</label>
            <Textarea placeholder="Type the quote here…" rows={4} />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">Who said it?</label>
              <Input placeholder="Name or nickname" />
            </div>
            <div>
              <label className="block text-sm mb-1">Category (optional)</label>
              <Input placeholder="e.g. Work, Trip, Inside joke" />
            </div>
          </div>
          <div>
            <label className="block text-sm mb-1">Context (optional)</label>
            <Input placeholder="Where/when/why" />
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button className="flex-1">Save</Button>
            <Button variant="outline" className="flex-1">Cancel</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


