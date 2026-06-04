import SubmitForm from "@/components/submit-fare/submit-form";

export default function Add() {
  return (
    <main className="max-w-7xl mx-auto px-5">
      <div className="pt-10 lg:pt-12 pb-6">
        <h1 className="text-xl md:text-2xl lg:text-3xl text-foreground font-bold">
          ভাড়া যুক্ত করুন
        </h1>
        <p className="text-sm lg:text-base text-muted-foreground lg:mt-1">
          আপনার জানা ভাড়া সকলকেই জানতে সাহায্য করুন
        </p>
        <div className="max-w-lg mt-6 lg:mt-8">
          <SubmitForm />
        </div>
      </div>
    </main>
  );
}
