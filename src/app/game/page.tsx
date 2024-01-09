"use client";

import React, { useEffect, useState } from "react";
import type { Country, TPlayer } from "@/utils/types";
import { fetchAll } from "../../../api/requests";
import Image from "next/image";
import Link from "next/link";

export default function GuessTheFlag() {
  const [country, setCountry] = useState<Country | null>(null);
  const [inputVal, setInputVal] = useState("");
  const [players, setPlayers] = useState<TPlayer[]>([]);
  const rounds = Number(localStorage.getItem("world-explorer-rounds"));
  const [currentRound, setCurrentRound] = useState(1);
  const [activePlayerIndex, setActivePlayerIndex] = useState(0);
  useEffect(() => {
    fetchAll().then((data) => {
      setCountry(data[Math.floor(Math.random() * data.length)]);
    });
    const playerdata: TPlayer[] =
      JSON.parse(localStorage.getItem("world-explorer-players") as string) ??
      [];
    setPlayers(playerdata);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const answer = formData.get("answer")?.toString().toLowerCase();
    setActivePlayerIndex(activePlayerIndex + 1);
    setInputVal("");
    if (
      answer === country?.name.common.toLowerCase() ||
      answer === country?.name.official.toLowerCase()
    ) {
      players[activePlayerIndex].score += 1;
      localStorage.setItem("world-explorer-players", JSON.stringify(players));
    }

    if (activePlayerIndex === players.length - 1) {
      setActivePlayerIndex(0);
      setCurrentRound(currentRound + 1);
      fetchAll().then((data) => {
        setCountry(data[Math.floor(Math.random() * data.length)]);
      });
    }
  };
  return (
    <main className="h-fit min-h-screen flex flex-col justify-center items-center gap-4">
      {currentRound <= rounds ? (
        <>
          <div className="w-full m-4 p-4 flex flex-col items-center text-secondary">
            {players ? (
              players.map((player, i) => (
                <span key={i}>
                  {player.name} : {player.score}
                </span>
              ))
            ) : (
              <span>Loading...</span>
            )}
          </div>
          <span className="text-secondary text-4xl font-semibold">
            Round: {currentRound}
          </span>
          <span className="text-secondary text-4xl font-semibold">
            {players[activePlayerIndex].name}
            {`'`}s turn
          </span>
          <span className="text-secondary text-lg"></span>
          {country ? (
            <div className="flex flex-col justify-center items-center gap-8">
              <div className="w-auto h-[300px] flex flex-row justify-center items-center">
                <Image
                  alt={"Mystery country"}
                  src={country.flags.svg}
                  width={3000}
                  height={2000}
                  className="pointer-events-none"
                  style={{
                    height: "100%",
                    width: "auto",
                  }}
                  quality={100}
                />
              </div>
              <form
                onSubmit={handleSubmit}
                className="flex flex-row justify-center"
              >
                <input
                  name="answer"
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  autoComplete="off"
                  className="p-2 bg-white/20 outline-none text-lg text-secondary"
                />
                <button
                  type="submit"
                  className="p-2 bg-green-500 rounded-sm text-secondary mx-4"
                >
                  Enter
                </button>
              </form>
            </div>
          ) : (
            <span>Loading...</span>
          )}
        </>
      ) : (
        <div className="w-fit p-4 text-secondary flex flex-col">
          <span className="text-2xl font-bold">Game finished!</span>
          <Link
            href="/finished"
            className="p-4 rounded-md bg-green-500/75 text-center"
          >
            See result
          </Link>
        </div>
      )}
    </main>
  );
}
