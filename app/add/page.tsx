"use client";

import { DistrictsCombobox } from "@/components/districts-combobox";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import RadioVehicleCard from "@/components/radio-vehicle-card";
import { supabase } from "@/lib/supabase";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircleIcon } from "lucide-react";

interface vehiclesOptions {
  id: string;
  title: string;
}

const vehicles: vehiclesOptions[] = [
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

export default function Add() {
  const vehicleDefaultValue = "rickshaw";

  const [vehicle, setVehicle] = useState(vehicleDefaultValue);
  const [district, setDistrict] = useState<string | null>(null);

  const formHandler = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target;
    const fromName = form.fromName.value;
    const toName = form.toName.value;
    const fare = form.fare.value;
    const tips = form.tips.value || null;
    const { data, error } = await supabase.from("fares").insert({
      fromName: fromName,
      toName: toName,
      fare: fare,
      vehicle: vehicle,
      district: district,
      tips: tips,
    });
    console.log(data);
    console.log(error);
  };

  return (
    <main className="max-w-7xl mx-auto px-5 py-6">
      <div>
        <h1 className="text-xl lg:text-2xl text-foreground font-bold">
          ভাড়া যুক্ত করুন
        </h1>
        <p className="text-sm lg:text-base text-muted-foreground lg:mt-1">
          আপনার জানা ভাড়া সকলকেই জানতে সাহায্য করুন
        </p>
      </div>
      <div className="max-w-lg mt-6 lg:mt-8">
        <form onSubmit={(e) => formHandler(e)}>
          <div className="space-y-3 lg:space-y-4">
            {/* from where */}
            <Field>
              <FieldLabel htmlFor="from-where">কোথা থেকে</FieldLabel>
              <Input
                name="fromName"
                id="from-where"
                placeholder="টেকনাফ"
                className="text-sm lg:text-base h-11 lg:h-12"
              />
            </Field>
            {/* to where */}
            <Field>
              <FieldLabel htmlFor="to-where">কোথায়</FieldLabel>
              <Input
                name="toName"
                id="to-where"
                placeholder="তেতুলিয়া"
                className="h-12"
              />
            </Field>
            {/* fare */}
            <Field>
              <FieldLabel htmlFor="fare">ভাড়া</FieldLabel>
              <Input
                name="fare"
                id="fare"
                placeholder="২০০০"
                className="h-12"
                type="number"
              />
            </Field>
            {/* vehicle type */}
            <Field>
              <FieldLabel>যানবাহন</FieldLabel>
              <RadioGroup
                onValueChange={(value) => setVehicle(value)}
                defaultValue={vehicleDefaultValue}
                className="w-full grid grid-cols-3 lg:grid-cols-৪"
              >
                {vehicles.map((i, idx) => (
                  <RadioVehicleCard key={idx} id={i.id} title={i.title} />
                ))}
              </RadioGroup>
            </Field>
            {/* select area (optional) */}
            <Field>
              <FieldLabel>এলাকা (ঐচ্ছিক)</FieldLabel>
              <DistrictsCombobox setDistrict={setDistrict} />
              <FieldDescription>
                কোন জেলার ভিতরে তা সিলেক্ট করুন
              </FieldDescription>
            </Field>
            {/* tips (optional) */}
            <Field>
              <FieldLabel>টিপস (ঐচ্ছিক)</FieldLabel>
              <Textarea
                name="tips"
                placeholder="টাইপ করুন..."
                className="h-24"
              />
            </Field>
          </div>
          {/* submit */}
          <div className="mt-8">
            <Button className="px-12 h-12 w-full lg:w-auto cursor-pointer">
              <PlusCircleIcon /> যুক্ত করুন
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
