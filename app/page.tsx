import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function Home() {
  return (
    <main className="max-w-7xl mx-auto px-5 pt-4">
      <div className="w-full">
        <h3 className="text-2xl font-bold">ভাড়া কত?</h3>
      </div>
      {/* search */}
      <div className="space-y-3 max-w-lg mx-auto mt-16">
        <Input placeholder="কোথা থেকে" className="h-12" />
        <Input placeholder="কোথায়" className="h-12" />
        <Button className="w-full cursor-pointer h-12 mt-5">
          {" "}
          <Search /> ভাড়া খুঁজুন
        </Button>
      </div>
    </main>
  );
}
