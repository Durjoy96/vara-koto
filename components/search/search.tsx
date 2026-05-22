"use client";

import { Search as SearchIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import isBangla from "@/utils/isBangla";
import BanglishToBangla from "@/utils/banglish-to-bangla";
import AutoCompleteCard from "./auto-complete-card";

export default function Search() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <>
      <div className="space-y-3 max-w-lg mx-auto mt-16 text-sm lg:text-base">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="relative mb-3">
            <Input
              onChange={(e) => setFrom(e.target.value)}
              placeholder="কোথা থেকে"
              className="h-12"
              value={from}
            />
            <AutoCompleteCard value={from} setValue={setFrom} />
          </div>
          <div className="relative mb-3">
            <Input
              onChange={(e) => setTo(e.target.value)}
              placeholder="কোথায়"
              className="h-12"
              value={to}
            />
            <AutoCompleteCard value={to} setValue={setTo} />
          </div>
          <Button className="w-full cursor-pointer h-12 mt-5">
            {" "}
            <SearchIcon /> ভাড়া খুঁজুন
          </Button>
        </form>
      </div>
    </>
  );
}
