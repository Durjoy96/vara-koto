import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ভাড়া যুক্ত করুন | ন্যায্য ভাড়া",
  description:
    "আপনার জানা ভাড়া যুক্ত করে সকলকে ন্যায্য ভাড়া জানতে সাহায্য করুন।",
};

export default function AddLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
