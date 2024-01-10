"use client";
import { TPlayer } from "@/utils/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";

export default function Finished() {
  const [players, setPlayers] = useState<TPlayer[]>([]);
  useEffect(() => {
    const playerdata = localStorage.getItem("world-explorer-players") as string;
    const parsedplayerdata: TPlayer[] = playerdata
      ? JSON.parse(playerdata)
      : redirect("/setup");
  }, []);
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center text-secondary">
      {players ? (
        <>
          {players.map((player, i) => (
            <span key={i} className="m-4 text-2xl text-secondary">
              <span className="underline">{player.name}</span>
              {`'`}s score: {player.score}
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
