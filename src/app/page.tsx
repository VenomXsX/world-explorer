"use client";
import LinkButton from "@/components/LinkButton";

export default function Home() {
  return (
    <div className="w-full h-fit min-h-screen flex flex-col items-center justify-center">
      <span className="text-6xl font-sans font-bold text-secondary">World Explorer</span>
      <LinkButton className="animate-pulse text-2xl" label="Play now" link="/setup" />
    </div>
  );
}
