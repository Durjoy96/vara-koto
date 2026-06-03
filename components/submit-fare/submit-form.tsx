"use client";

import { DistrictsCombobox } from "@/components/submit-fare/districts-combobox";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { LucideArrowRight, User } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import isBangla from "@/utils/isBangla";
import BanglishToBangla from "@/utils/banglish-to-bangla";
import CheckboxVehcileCard from "@/components/submit-fare/checkbox-vehicle-card";
import { createClient } from "@/lib/supabase/client";
import { AuthModal } from "@/components/submit-fare/auth-modal";

interface vehiclesOptions {
  id: string;
  title: string;
}

interface FormData {
  from_text: string;
  to_text: string;
  fare: number;
  tips: string;
}

const vehiclesList: vehiclesOptions[] = [
  {
    id: "rickshaw",
    title: "রিকশা",
  },
  {
    id: "van",
    title: "ভ্যান",
  },
  {
    id: "auto",
    title: "অটো",
  },
  {
    id: "cng",
    title: "সিএনজি",
  },
  {
    id: "bus",
    title: "বাস",
  },
  {
    id: "train",
    title: "ট্রেন",
  },
];

export default function SubmitForm() {
  const supabase = createClient();
  const [user, setUser] = useState<any>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [form, setForm] = useState<FormData>({
    from_text: "",
    to_text: "",
    fare: 0,
    tips: "",
  });
  const [vehicles, setVehicles] = useState<string[]>([]);
  const [district, setDistrict] = useState<string | null>(null);

  // Current user check
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) =>
      setUser(session?.user ?? null),
    );
    console.log(user);
    return () => subscription.unsubscribe();
  }, []);

  const set = (k: keyof FormData, v: string | number) => {
    return setForm((prev) => ({ ...prev, [k]: v }));
  };

  const isVaild =
    form.from_text && form.to_text && form.fare && vehicles.length > 0;

  function submitBtnHandler() {
    setHasSubmitted(true);
    if (!isVaild) return;
    const modalSeen = localStorage.getItem("auth_modal_seen");
    if (!user && !modalSeen) {
      setShowAuthModal(true);
      return;
    }
    // if user logged in or alreay saw the modal then submit the fare
    submitFare();
  }

  function continueAsGuestHandler() {
    localStorage.setItem("auth_modal_seen", "true");
    setShowAuthModal(false);
    submitFare();
  }

  async function submitFare() {
    try {
      setLoading(true);
      const supabase = createClient();
      const { data, error } = await supabase.from("fares").insert({
        original_from: form.from_text,
        standardized_from_bn: !isBangla(form.from_text)
          ? await BanglishToBangla(form.from_text)
          : form.from_text,
        original_to: form.to_text,
        standardized_to_bn: !isBangla(form.to_text)
          ? await BanglishToBangla(form.to_text)
          : form.to_text,
        fare: Number(form.fare),
        vehicles: vehicles,
        district: district,
        tips: form.tips,
        user_id: user?.id ?? null,
      });

      if (error) throw error;
      toast.success("ভাড়া সফলভাবে যুক্ত হয়েছে");
      // clear form
      setForm({
        from_text: "",
        to_text: "",
        fare: 0,
        tips: "",
      });
      setVehicles([]);
      setDistrict(null);
      setHasSubmitted(false);
    } catch (error) {
      toast.error("কিছু একটা সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  }
  return (
    <div>
      <AuthModal
        open={showAuthModal}
        onOpenChange={setShowAuthModal}
        onContinueAsGuest={continueAsGuestHandler}
      />
      <div className="space-y-3 lg:space-y-4">
        {/* from where */}
        <Field>
          <FieldLabel htmlFor="from-where">কোথা থেকে</FieldLabel>
          <Input
            placeholder="টেকনাফ"
            className="text-sm lg:text-base h-11 lg:h-12"
            value={form.from_text}
            onChange={(e) => set("from_text", e.target.value)}
          />
          {hasSubmitted && !form.from_text && (
            <FieldError>এটি একটি আবশ্যক ফিল্ড</FieldError>
          )}
        </Field>
        {/* to where */}
        <Field>
          <FieldLabel htmlFor="to-where">কোথায়</FieldLabel>
          <Input
            placeholder="তেতুলিয়া"
            className="text-sm lg:text-base h-11 lg:h-12"
            value={form.to_text}
            onChange={(e) => set("to_text", e.target.value)}
          />
          {hasSubmitted && !form.to_text && (
            <FieldError>এটি একটি আবশ্যক ফিল্ড</FieldError>
          )}
        </Field>
        {/* fare */}
        <Field>
          <FieldLabel htmlFor="fare">ভাড়া</FieldLabel>
          <Input
            placeholder="২০০০"
            className="text-sm lg:text-base h-11 lg:h-12"
            type="number"
            value={form.fare || ""}
            onChange={(e) => set("fare", e.target.value)}
          />
          {hasSubmitted && !form.fare && (
            <FieldError>এটি একটি আবশ্যক ফিল্ড</FieldError>
          )}
        </Field>
        {/* vehicle type */}
        <Field>
          <FieldLabel>যানবাহন</FieldLabel>
          <FieldGroup className="w-full grid grid-cols-3 lg:grid-cols-৪">
            {vehiclesList.map((i, idx) => (
              <CheckboxVehcileCard
                key={idx}
                id={i.id}
                title={i.title}
                checked={vehicles.includes(i.id)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setVehicles((prev) => [...prev, i.id]);
                  } else {
                    setVehicles((prev) => prev.filter((v) => v !== i.id));
                  }
                }}
              />
            ))}
          </FieldGroup>
          {hasSubmitted && vehicles.length === 0 && (
            <FieldError>কমপক্ষে একটি যানবাহন নির্বাচন করুন</FieldError>
          )}
        </Field>
        {/* select area (optional) */}
        <Field>
          <FieldLabel>এলাকা (ঐচ্ছিক)</FieldLabel>
          <DistrictsCombobox setDistrict={setDistrict} />
          <FieldDescription>কোন জেলার ভিতরে তা সিলেক্ট করুন</FieldDescription>
        </Field>
        {/* tips (optional) */}
        <Field>
          <FieldLabel>টিপস (ঐচ্ছিক)</FieldLabel>
          <Textarea
            placeholder="টাইপ করুন..."
            className="h-24"
            value={form.tips}
            onChange={(e) => set("tips", e.target.value)}
          />
        </Field>
      </div>
      {/* submit button */}
      <div className="mt-8 space-y-1">
        <Button
          disabled={loading}
          onClick={submitBtnHandler}
          className="px-8 h-11 w-full lg:w-auto cursor-pointer"
        >
          {loading ? (
            <>
              <Spinner data-icon="inline-start" /> যুক্ত করা হচ্ছে...
            </>
          ) : (
            <>
              যুক্ত করুন <LucideArrowRight />
            </>
          )}
        </Button>
        {/* Login status hint */}
        {user ? (
          <p className="text-left text-xs text-muted-foreground">
            {user.user_metadata?.full_name ?? "আপনি"} হিসেবে যুক্ত হবে
          </p>
        ) : (
          <p className="text-left text-xs text-muted-foreground">
            Guest হিসেবে যুক্ত হবে
          </p>
        )}
      </div>
    </div>
  );
}
