"use client";

import { Search as SearchIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useRef, useState } from "react";
import isBangla from "@/utils/isBangla";
import BanglishToBangla from "@/utils/banglish-to-bangla";
import AutoCompleteCard from "./auto-complete-card";
import { Spinner } from "../ui/spinner";
import Link from "next/link";
import SearchResultCard from "./search-result-card";
import { createClient } from "@/lib/supabase/client";

const checkLanguageAndConvertBangla = async (
  value: string,
): Promise<string> => {
  if (!isBangla(value)) {
    return await BanglishToBangla(value);
  } else {
    return value;
  }
};

export default function Search({
  recentlyAdded,
}: {
  recentlyAdded?: React.ReactNode;
}) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const fromContainerRef = useRef<HTMLDivElement>(null);
  const toContainerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setHasSearched(true);

    const fromBangla = await checkLanguageAndConvertBangla(from.trim());
    const toBangla = await checkLanguageAndConvertBangla(to.trim());
    const supabase = createClient();

    // Debug: log what text we're actually searching with
    /*     console.log("[Search Debug]", {
      rawFrom: from.trim(),
      rawTo: to.trim(),
      convertedFrom: fromBangla,
      convertedTo: toBangla,
    }); */

    // Split inputs into words (strip commas — they break Supabase .or() filter syntax)
    const splitWords = (text: string) =>
      text
        .split(/[\s,।.]+/)
        .map((w) => w.replace(/[,।.]/g, "").trim())
        .filter((w) => w.length > 0);

    const fromParts = splitWords(fromBangla);
    const toParts = splitWords(toBangla);

    let data: any[] | null = null;

    // Strategy 1: Exact route match — every from-word must match from fields AND every to-word must match to fields
    // Chaining .or() calls creates AND between them, so each word is required
    {
      let query = supabase.from("fares").select("*");

      for (const w of fromParts) {
        query = query.or(
          `standardized_from_bn.ilike.%${w}%,original_from.ilike.%${w}%`,
        );
      }
      for (const w of toParts) {
        query = query.or(
          `standardized_to_bn.ilike.%${w}%,original_to.ilike.%${w}%`,
        );
      }

      const { data: exactData, error } = await query;
      if (error) console.error("[Search] Strategy 1 error:", error);
      if (exactData && exactData.length > 0) data = exactData;
    }

    // Strategy 2: Reverse direction — from-words match to fields AND to-words match from fields
    if (!data || data.length === 0) {
      let query = supabase.from("fares").select("*");

      for (const w of fromParts) {
        query = query.or(
          `standardized_to_bn.ilike.%${w}%,original_to.ilike.%${w}%`,
        );
      }
      for (const w of toParts) {
        query = query.or(
          `standardized_from_bn.ilike.%${w}%,original_from.ilike.%${w}%`,
        );
      }

      const { data: reverseData, error } = await query;
      if (error) console.error("[Search] Strategy 2 error:", error);
      if (reverseData && reverseData.length > 0) data = reverseData;
    }

    // Strategy 3: Broad word-level fallback — any word matches any location field
    if (!data || data.length === 0) {
      const allWords = [...fromParts, ...toParts];

      if (allWords.length > 0) {
        const conditions = allWords.flatMap((w) => [
          `standardized_from_bn.ilike.%${w}%`,
          `standardized_to_bn.ilike.%${w}%`,
          `original_from.ilike.%${w}%`,
          `original_to.ilike.%${w}%`,
        ]);

        const { data: broadData, error } = await supabase
          .from("fares")
          .select("*")
          .or(conditions.join(","));

        if (error) console.error("[Search] Strategy 3 error:", error);
        if (broadData && broadData.length > 0) data = broadData;
      }
    }

    // console.log("[Search Debug] Results found:", data?.length ?? 0);
    setResults(data || []);
    setIsLoading(false);
  }

  return (
    <>
      <div className="max-w-lg mx-auto text-sm lg:text-base">
        <form onSubmit={(e) => handleSubmit(e)} className="space-y-3">
          <div ref={fromContainerRef} className="relative">
            <Input
              onChange={(e) => setFrom(e.target.value)}
              placeholder="কোথা থেকে"
              className="h-12"
              value={from}
              required
            />
            <AutoCompleteCard
              value={from}
              setValue={setFrom}
              containerRef={fromContainerRef}
            />
          </div>
          <div ref={toContainerRef} className="relative mb-3">
            <Input
              onChange={(e) => setTo(e.target.value)}
              placeholder="কোথায়"
              className="h-12"
              value={to}
              required
            />
            <AutoCompleteCard
              value={to}
              setValue={setTo}
              containerRef={toContainerRef}
            />
          </div>
          <Button
            disabled={isLoading}
            className="w-full cursor-pointer h-12 mt-3 lg:mt-5"
          >
            {isLoading ? <Spinner /> : <SearchIcon className="h-4 w-4" />}
            ভাড়া খুঁজুন
          </Button>
        </form>

        {/* Show the result or recently added */}
        <div className="mt-8">
          {hasSearched && !isLoading && results.length > 0 && (
            <div className=" space-y-4">
              <h3 className="text-muted-foreground font-medium mb-4">
                Search Results
              </h3>
              {results.map((result, index) => (
                <SearchResultCard buttons={false} key={index} data={result} />
              ))}
            </div>
          )}

          {!hasSearched && recentlyAdded}
        </div>

        {/* handle no data found with add button with will redirect to the /add page */}
        {hasSearched && !isLoading && results.length === 0 && (
          <div className="mt-8 text-center space-y-4">
            <p className="text-muted-foreground">
              দুঃখিত, কোনো ডাটা পাওয়া যায়নি।
            </p>
            <Link href="/add">
              <Button className="cursor-pointer" variant="outline">
                নতুন ভাড়া যুক্ত করুন
              </Button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
