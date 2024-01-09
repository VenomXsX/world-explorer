"use client";
import { TPlayer } from "@/utils/types";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Finished() {
  const [players, setPlayers] = useState<TPlayer[]>([]);
  useEffect(() => {
    const playerdata: TPlayer[] =
      JSON.parse(localStorage.getItem("world-explorer-players") as string) ??
      [];
    setPlayers(playerdata);
  }, []);
  return (
    <div className="w-full h-fit min-h-screen flex flex-col justify-center items-center text-secondary">
      {players ? (
        <>
          {players.map((player) => (
            <span className="m-4 text-2xl">
              {player.name}'s score: {player.score}
            </span>
          ))}
          <Link
            href="/"
            className="p-4 rounded-md bg-green-500/75 text-secondary"
          >
            Return to home
          </Link>
        </>
      ) : (
        <span>Loading...</span>
      )}
    </div>
  );
}
