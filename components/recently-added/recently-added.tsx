import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { englishToBanglaNumber } from "@/utils/english-to-bangla-number";
import { VehicleToGari } from "@/utils/vehicle-to-gari";

function timeAgoInBangla(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "কিছুক্ষণ আগে";

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60)
    return englishToBanglaNumber(diffInMinutes) + " মিনিট আগে";

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24)
    return englishToBanglaNumber(diffInHours) + " ঘন্টা আগে";

  const diffInDays = Math.floor(diffInHours / 24);
  return englishToBanglaNumber(diffInDays) + " দিন আগে";
}

export default async function RecentlyAdded() {
  const supabase = createClient();
  const { data, error } = await (await supabase)
    .from("fares")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5);

  return (
    <div className="max-w-lg mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-muted-foreground font-medium">
          সম্প্রতি যোগ হয়েছে
        </h2>
        {/* <Link
          href="/recently-added"
          className="text-muted-foreground text-sm hover:underline"
        >
          আরো দেখুন &rarr;
        </Link> */}
      </div>
      <div className="space-y-3">
        {data?.map((f, idx) => (
          <div
            key={idx}
            className="bg-card flex items-center justify-between p-4 rounded-xl border border-border"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center p-2 shrink-0">
                {f.vehicles && f.vehicles[0] && (
                  <img
                    src={`/vehicles/${f.vehicles[0]}.png`}
                    alt={f.vehicles[0]}
                    className="w-8 h-8 object-contain"
                  />
                )}
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-base lg:text-lg flex items-center flex-wrap">
                  {f.original_from}{" "}
                  <span className="text-muted-foreground font-normal mx-1.5">
                    &rarr;
                  </span>{" "}
                  {f.original_to}
                </h3>
                <p className="text-muted-foreground text-xs lg:text-sm mt-0.5">
                  {f.district ? f.district + " · " : ""}
                  {f.vehicles ? f.vehicles.map(VehicleToGari).join(", ") : ""}
                  {" · " + timeAgoInBangla(f.created_at)}
                </p>
              </div>
            </div>
            <div className="text-primary font-bold text-xl lg:text-2xl shrink-0">
              ৳{englishToBanglaNumber(f.fare)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
