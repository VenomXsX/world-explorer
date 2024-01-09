"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { checkDuplicates } from "@/utils/helper";
import { Player, TPlayer } from "@/utils/types";
import { Minus } from "lucide-react";

export default function Setup() {
  const router = useRouter();
  const [nameDuplicate, setNameDuplicate] = useState(false);
  const [invalidRounds, setInvalidRounds] = useState(false);
  const [placeholderPlayers, setPlaceholderPlayers] = useState<string[]>([
    "player1",
    "player2",
  ]);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const playernames = placeholderPlayers
      .map((item) => formData.get(item) as string)
      .map((name) => name.trim());
    if (checkDuplicates(playernames)) {
      setNameDuplicate(true);
    }
    if (!Number(formData.get("rounds"))) {
      setInvalidRounds(true);
    } else {
      const players: TPlayer[] = playernames.map((name) => new Player(name));
      const rounds = formData.get("rounds") as string;
      localStorage.setItem("world-explorer-players", JSON.stringify(players));
      localStorage.setItem("world-explorer-rounds", rounds);
      router.push("/game");
    }
  };
  useEffect(() => console.log(placeholderPlayers), [placeholderPlayers]);
  return (
    <main className="w-full h-fit flex flex-col flex-1 justify-center items-center">
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
        {invalidRounds ? (
          <span className="bg-red-400/50 p-4 rounded-md w-full">
            Invalid rounds
          </span>
        ) : (
          ""
        )}
        <span className="text-2xl font-bold">Game setup</span>
        <span>Number of rounds (1 to 20 rounds)</span>
        <input
          type="number"
          name="rounds"
          className="p-2 rounded-md text-black"
          defaultValue={5}
          min={1}
          max={20}
        />
        <span>Number of players (2 to 4 players)</span>
        {placeholderPlayers.map((name, i) => (
          <div
            key={i}
            className="w-full flex flex-row items-center justify-center gap-4"
          >
            <input
              type="text"
              name={`player${i + 1}`}
              className="p-2 rounded-md text-black"
              placeholder={name}
              required
              autoComplete="off"
            />
            {placeholderPlayers.length > 2 ? (
              <button
                type="button"
                onClick={() => {
                  setPlaceholderPlayers(
                    placeholderPlayers.filter(
                      (item) => item !== `player${i + 1}`
                    )
                  );
                }}
                className="text-red-400 p-2 h-8 w-8 rounded-sm bg-red-600/75 hover:bg-red-600 hover:text-gray-200 duration-200 flex justify-center items-center"
              >
                <Minus strokeWidth={5} />
              </button>
            ) : (
              <></>
            )}
          </div>
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
