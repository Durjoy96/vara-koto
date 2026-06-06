import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import SearchResultCard from "@/components/search/search-result-card";
import Image from "next/image";
import { Metadata } from "next";
import { englishToBanglaNumber } from "@/utils/english-to-bangla-number";

export const metadata: Metadata = {
  title: "প্রোফাইল | ন্যায্য ভাড়া",
  description: "আপনার জমা দেওয়া ভাড়াগুলো",
};

export default async function ProfilePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/");

  const { data: fares } = await supabase
    .from("fares")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen max-w-7xl mx-auto px-5">
      {/* Header */}
      <div className="pt-10 lg:pt-12 pb-6">
        <div className="flex items-center gap-3">
          {user.user_metadata?.avatar_url && (
            <Image
              src={user.user_metadata.avatar_url}
              alt="avatar"
              width={48}
              height={48}
              className="w-12 h-12 rounded-full border border-border"
            />
          )}

          <div>
            <h1 className="text-lg font-bold">
              {user.user_metadata?.full_name ?? "আপনার profile"}
            </h1>
            <p className="text-xs text-muted-foreground">
              {englishToBanglaNumber(fares?.length) ?? 0}টি ভাড়া যোগ করেছেন
            </p>
          </div>
        </div>
      </div>

      {/* Fares list */}
      <div className="space-y-3 pb-20">
        <h2 className="text-xs text-muted-foreground tracking-wide mb-4">
          আপনার জমা দেওয়া ভাড়াগুলো
        </h2>
        <div>
          {fares && fares.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {fares.map((fare) => (
                <SearchResultCard buttons={true} key={fare.id} data={fare} />
              ))}
            </div>
          ) : (
            <div className="h-[50vh] flex flex-col justify-center items-center text-center py-16 text-muted-foreground">
              <p className="text-4xl mb-3">🛺</p>
              <p className="text-sm">এখনো কোনো ভাড়া যোগ করেন নি</p>
              <Link
                href="/submit"
                className="text-primary/90 text-sm mt-2 inline-block hover:text-primary"
              >
                প্রথম ভাড়া যোগ করুন →
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
