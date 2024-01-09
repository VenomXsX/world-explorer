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
    <div className="w-full flex flex-col items-center">
      {players ? (
        <>
          {players.map((player) => (
            <span>
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
