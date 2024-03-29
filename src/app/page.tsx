"use client";
import LinkButton from "@/components/LinkButton";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    localStorage.removeItem("world-explorer-players");
    localStorage.removeItem("world-explorer-rounds");
  }, []);
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center">
      <span className="text-6xl font-sans font-bold text-secondary text-center">
        World Explorer
      </span>
      <LinkButton
        className="animate-pulse text-2xl"
        label="Play now"
        link="/setup"
      />
    </div>
  );
}
