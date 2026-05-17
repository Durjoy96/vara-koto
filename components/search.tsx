"use client";

import { Search as SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Search() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  useEffect(() => {
    const getData = async () => {
      if (from.length > 1) {
        const { data, error } = await supabase
          .from("fares")
          .select("fromName")
          .ilike("fromName", `%${from}%`);

        if (error) console.log(error);
        if (data) console.log(data);
      }
    };

    getData();
  }, [from]);

  return (
    <>
      <div className="space-y-3 max-w-lg mx-auto mt-16">
        <form onSubmit={(e) => handleSubmit(e)}>
          <Input
            onChange={(e) => setFrom(e.target.value)}
            value={from}
            placeholder="কোথা থেকে"
            className="h-12"
          />
          <Input
            onChange={(e) => setTo(e.target.value)}
            value={to}
            placeholder="কোথায়"
            className="h-12"
          />
          <Button className="w-full cursor-pointer h-12 mt-5">
            {" "}
            <SearchIcon /> ভাড়া খুঁজুন
          </Button>
        </form>
      </div>
    </>
  );
}
