import Search from "@/components/search";

export default function Home() {
  return (
    <main className="max-w-7xl mx-auto px-5 pt-4">
      <div className="w-full">
        <h3 className="text-2xl font-bold">ভাড়া কত?</h3>
      </div>
      {/* search */}
      <Search />
    </main>
  );
}
