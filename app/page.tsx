import Search from "@/components/search/search";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="max-w-7xl mx-auto px-5 pt-4">
      <div className="w-full flex items-center justify-between">
        <h3 className="text-xl lg:text-2xl font-bold">ভাড়া কত?</h3>
        <Link href="/add">
          <Button variant="secondary" className="cursor-pointer">
            <Plus /> ভাড়া যুক্ত করুন
          </Button>
        </Link>
      </div>
      <div className="mt-12 lg:mt-16 mb-8 lg:mb-10 mx-auto max-w-xl text-center">
        <h1 className="text-4xl lg:text-5xl font-bold tracking-tight leading-normal">
          যাত্রার আগে{" "}
          <span className="relative whitespace-nowrap py-0 px-2">
            <span className="absolute bg-primary left-0 top-0 bottom-0 right-0 md:left-0 md:-top-0 md:-bottom-0 md:-right-3 -rotate-1"></span>
            <span className="relative text-primary-foreground">
              {" "}
              ন্যায্য ভাড়া জানুন
            </span>
          </span>
        </h1>
        <p className="mt-4 text-sm md:text-base font-normal text-muted-foreground">
          বাংলাদেশে যাতায়াতের ভাড়া নিয়ে একটি কমিউনিটি প্লাটফর্ম। নিজে ন্যায্য
          ভাড়া জানুন এবং অপরকে জানতে সাহায্য করুন।
        </p>
      </div>
      {/* search */}
      <Search />
    </main>
  );
}
