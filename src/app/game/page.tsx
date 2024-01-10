"use client";

import React, { useEffect, useState } from "react";
import type { Country, TPlayer } from "@/utils/types";
import { fetchAll } from "../../../api/requests";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function GuessTheFlag() {
  const router = useRouter();
  const [country, setCountry] = useState<Country | null>(null);
  const [nameInputVal, setNameInputVal] = useState("");
  const [capitalInputVal, setCapitalInputVal] = useState("");
  const [languageInputVal, setLanguageInputVal] = useState("");
  const [players, setPlayers] = useState<TPlayer[]>([]);
  const [rounds, setRounds] = useState(-1);
  const [currentRound, setCurrentRound] = useState(1);
  const [activePlayerIndex, setActivePlayerIndex] = useState(0);
  useEffect(() => {
    fetchAll().then((data) => {
      setCountry(data[Math.floor(Math.random() * data.length)]);
    });
    const playerdata = localStorage.getItem("world-explorer-players") as string;
    const rounddata = localStorage.getItem("world-explorer-rounds");
    const parsedplayerdata: TPlayer[] = playerdata
      ? JSON.parse(playerdata)
      : [];
    setPlayers(parsedplayerdata);
    setRounds(rounddata ? Number(JSON.parse(rounddata)) : 0);
    if (!playerdata || !rounds) {
      router.push("/setup");
    }
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const nameAnswer = formData
      .get("country-name-answer")
      ?.toString()
      .toLowerCase()
      .trim();
    const capitalAnswer = formData
      .get("capital-answer")
      ?.toString()
      .toLowerCase()
      .trim();
    const languageAnswer = formData
      .get("language-answer")
      ?.toString()
      .toLowerCase()
      .trim();
    setActivePlayerIndex(activePlayerIndex + 1);
    setNameInputVal("");
    setCapitalInputVal("");
    setLanguageInputVal("");
    // Country name check
    if (
      nameAnswer === country?.name.common.toLowerCase() ||
      nameAnswer === country?.name.official.toLowerCase()
    ) {
      players[activePlayerIndex].score += 1;
      localStorage.setItem("world-explorer-players", JSON.stringify(players));
    }
    // Country capital check
    if (capitalAnswer === country?.capital[0].toLowerCase()) {
      players[activePlayerIndex].score += 1;
      localStorage.setItem("world-explorer-players", JSON.stringify(players));
    }
    // Country language check
    if (
      country &&
      country.languages &&
      languageAnswer &&
      Object.keys(country.languages)
        .map((key) => country.languages[key].toLowerCase())
        .includes(languageAnswer)
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
    <main className="min-h-screen flex flex-col justify-center items-center gap-4">
      {currentRound <= rounds ? (
        <>
          <div className="w-full m-4 p-4 flex flex-col items-center text-secondary">
            {players ? (
              players.map((player, i) => (
                <span key={i} className="text-secondary text-lg">
                  {player.name}
                  {`'`}s score: {player.score}
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
            <div className="flex flex-col justify-center items-center gap-8 w-full px-8">
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
                className="flex flex-col justify-center gap-4 w-full items-center"
              >
                <div className="w-full grid grid-cols-2 gap-4">
                  <span className="text-secondary text-md text-ellipsis">
                    Country name:
                  </span>
                  <input
                    name="country-name-answer"
                    type="text"
                    value={nameInputVal}
                    onChange={(e) => setNameInputVal(e.target.value)}
                    autoComplete="off"
                    className="p-2 bg-white/20 outline-none text-lg text-secondary flex-1 sm:flex-none"
                  />
                </div>
                <div className="w-full grid grid-cols-2 gap-4">
                  <span className="text-secondary text-md text-ellipsis">
                    Capital name:
                  </span>
                  <input
                    name="capital-answer"
                    type="text"
                    value={capitalInputVal}
                    onChange={(e) => setCapitalInputVal(e.target.value)}
                    autoComplete="off"
                    className="p-2 bg-white/20 outline-none text-lg text-secondary flex-1 sm:flex-none"
                  />
                </div>
                {country.languages ? (
                  <div className="w-full grid grid-cols-2 gap-4">
                    <span className="text-secondary text-md break-words">
                      1 of the language(s) spoken:
                    </span>
                    <input
                      name="language-answer"
                      type="text"
                      value={languageInputVal}
                      onChange={(e) => setLanguageInputVal(e.target.value)}
                      autoComplete="off"
                      className="p-2 bg-white/20 outline-none text-lg text-secondary"
                    />
                  </div>
                ) : (
                  <></>
                )}
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 rounded-sm text-secondary mx-4"
                >
                  Submit
                </button>
              </form>
            </div>
          ) : (
            <span>Loading...</span>
          )}
        </>
      ) : (
        <div className="w-fit p-4 text-secondary flex flex-col gap-4">
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
