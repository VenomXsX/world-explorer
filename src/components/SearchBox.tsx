import React, { useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";

export default function SearchBox({
  submitFn,
}: {
  submitFn: (q: string) => void;
}) {
  const [inputValue, setInputValue] = useState("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const searchQuery = formData.get("country-name-search")?.toString();
    if (!searchQuery) return;
    submitFn(searchQuery);
    setInputValue("");
  };
  return (
    <div className="flex flex-row justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center p-4"
      >
        <div className="flex flex-row justify-center items-center gap-4">
          <input
            name="country-name-search"
            type="text"
            className="p-2 rounded-md backdrop-blur-md focus:outline-none focus:ring-0 bg-transparent focus:bg-transparent/30 text-secondary placeholder:italic"
            autoComplete="off"
            placeholder="Search any country"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />

          <button type="submit" className="">
            <Search className="text-secondary/70"/>
          </button>
          <Link
            href={"/advancedSearch"}
            className="text-secondary/70 hover:underline italic"
          >
            Advanced
          </Link>
        </div>
      </form>
    </div>
  );
}
