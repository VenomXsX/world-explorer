"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { checkDuplicates } from "@/utils/helper";
import { Player, TPlayer } from "@/utils/types";

export default function Setup() {
  const router = useRouter();
  const [nameDuplicate, setNameDuplicate] = useState(false);
  const [placeholderPlayers, setPlaceholderPlayers] = useState<string[]>([
    "player1",
    "player2",
  ]);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    // store the data in localStorage here
    const playernames = placeholderPlayers.map((item) => {
      return formData.get(item);
    }) as string[];
    if (checkDuplicates(playernames)) {
      setNameDuplicate(true);
    } else {
      const players: TPlayer[] = playernames.map((name) => new Player(name));
      const rounds = formData.get("rounds") as string;
      localStorage.setItem("world-explorer-players", JSON.stringify(players));
      localStorage.setItem("world-explorer-rounds", rounds);
      router.push("/game");
    }
  };
  return (
    <main className="w-full h-fit min-h-screen flex flex-col justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col p-8 rounded-md bg-transparent/25 text-secondary gap-4"
      >
        {nameDuplicate ? (
          <span className="bg-red-400/50 p-4 rounded-md w-full">
            There is a name duplicate !
          </span>
        ) : (
          ""
        )}
        <span className="text-2xl font-bold">Game setup</span>
        <span>Number of rounds (1 to 10 rounds)</span>
        <input
          type="number"
          name="rounds"
          className="p-2 rounded-md text-black"
          defaultValue={5}
          min={1}
          max={10}
        />
        <span>Number of players (2 to 4 players)</span>
        {placeholderPlayers.map((name, i) => (
          <input
            key={i}
            type="text"
            name={`player${i + 1}`}
            className="p-2 rounded-md text-black"
            placeholder={name}
            required
          />
        ))}
        <button
          type="button"
          className={`p-4 rounded-md text-xl text-secondary hover:bg-secondary/20 duration-300 ${
            placeholderPlayers.length >= 4 ? "hidden" : ""
          }`}
          onClick={() =>
            placeholderPlayers.length < 4
              ? setPlaceholderPlayers([
                  ...placeholderPlayers,
                  `player${placeholderPlayers.length + 1}`,
                ])
              : undefined
          }
        >
          Add a player
        </button>
        <button
          type="submit"
          className={`p-4 rounded-md text-xl text-secondary hover:bg-green-400/75 duration-300 `}
        >
          Let{`'`}s play
        </button>
      </form>
    </main>
  );
}
