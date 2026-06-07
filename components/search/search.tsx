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
    const fromValue = await checkLanguageAndConvertBangla(from.trim());
    const toValue = await checkLanguageAndConvertBangla(to.trim());
    const supabase = createClient();

    // Split into words to make search more resilient
    const fromWords = fromValue.split(/\s+/).filter(Boolean);
    const toWords = toValue.split(/\s+/).filter(Boolean);

    let query = supabase.from("fares").select("*");

    if (fromWords.length > 0) {
      const fromConditions = fromWords
        .map((w) => `standardized_from_bn.ilike.%${w}%`)
        .join(",");
      query = query.or(fromConditions);
    }

    if (toWords.length > 0) {
      const toConditions = toWords
        .map((w) => `standardized_to_bn.ilike.%${w}%`)
        .join(",");
      query = query.or(toConditions);
    }

    let { data, error } = await query;

    // If no match, search Reverse (from = to => to = from)
    if (!data || data.length === 0) {
      let reverseQuery = supabase.from("fares").select("*");

      if (toWords.length > 0) {
        const fromReverseConditions = toWords
          .map((w) => `standardized_from_bn.ilike.%${w}%`)
          .join(",");
        reverseQuery = reverseQuery.or(fromReverseConditions);
      }

      if (fromWords.length > 0) {
        const toReverseConditions = fromWords
          .map((w) => `standardized_to_bn.ilike.%${w}%`)
          .join(",");
        reverseQuery = reverseQuery.or(toReverseConditions);
      }

      const { data: reverseData } = await reverseQuery;
      data = reverseData;
    }

    //Set empty or mock results based on your logic
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
