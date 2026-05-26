"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { ArrowRight } from "lucide-react";
import { englishToBanglaNumber } from "@/utils/english-to-bangla-number";

export default function SearchResultCard({ data }: { data: any }) {
  const [upvotes, setUpvotes] = useState(data?.upvote || 0);
  const [downvotes, setDownvotes] = useState(data?.downvote || 0);
  const [hasVoted, setHasVoted] = useState<"up" | "down" | null>(null);

  // Simple local state logic for UX. Real logic should call Supabase to update
  const handleUpvote = () => {
    if (hasVoted === "up") return;
    setUpvotes((prev: number) => prev + 1);
    if (hasVoted === "down") setDownvotes((prev: number) => prev - 1);
    setHasVoted("up");
  };

  const handleDownvote = () => {
    if (hasVoted === "down") return;
    setDownvotes((prev: number) => prev + 1);
    if (hasVoted === "up") setUpvotes((prev: number) => prev - 1);
    setHasVoted("down");
  };

  return (
    <Card className="w-full transition-all hover:border-primary/50 shadow-sm hover:shadow-md">
      <CardHeader className="pb-3 border-b border-border/50 bg-muted/10">
        <CardTitle className="flex items-center gap-2 text-lg lg:text-xl font-bold">
          <span className="text-card-foreground">
            {data?.standardized_from_bn || "From Destination"}
          </span>
          <ArrowRight className="h-4 w-4 lg:h-5 lg:w-5 text-muted-foreground flex-shrink-0" />
          <span className="text-card-foreground">
            {data?.standardized_to_bn || "To Destination"}
          </span>
        </CardTitle>
        <CardDescription className="text-sm lg:text-base font-medium">
          {data?.vehicles.map((v: string, idx: number) => (
            <span key={idx}>{v}</span>
          ))}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-5">
        <div className="flex justify-between items-center gap-4">
          <div>
            <p className="text-xs lg:text-sm font-medium text-muted-foreground mb-1">
              আনুমানিক ভাড়া
            </p>
            <p className="text-2xl lg:text-3xl font-extrabold tracking-tight">
              ৳ {englishToBanglaNumber(data?.fare || 0)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
