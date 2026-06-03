import SubmitForm from "@/components/submit-fare/submit-form";
import { LucideArrowLeft } from "lucide-react";
import Link from "next/link";

export default function Add() {
  return (
    <main className="max-w-7xl mx-auto px-5 py-6">
      <div>
        <Link
          href="/"
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-4 transition-colors"
        >
          <LucideArrowLeft className="w-4 h-4 mr-1" />
          হোম
        </Link>
        <h1 className="text-xl lg:text-2xl text-foreground font-bold">
          ভাড়া যুক্ত করুন
        </h1>
        <p className="text-sm lg:text-base text-muted-foreground lg:mt-1">
          আপনার জানা ভাড়া সকলকেই জানতে সাহায্য করুন
        </p>
      </div>
      <div className="max-w-lg mt-6 lg:mt-8">
        <SubmitForm />
      </div>
    </main>
  );
}
