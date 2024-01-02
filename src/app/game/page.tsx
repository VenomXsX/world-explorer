"use client";

import React, { useEffect, useState } from "react";
import type { Country } from "@/utils/types";
import { fetchAll } from "../../../api/requests";
import Image from "next/image";

export default function GuessTheFlag() {
  const [country, setCountry] = useState<Country | null>(null);
  const [hasGuessed, setHasGuessed] = useState<boolean>(false);
  const [inputVal, setInputVal] = useState<string>("");
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  useEffect(() => {
    fetchAll().then((data) => {
      setCountry(data[Math.floor(Math.random() * data.length)]);
    });
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const answer = formData.get("answer")?.toString().toLowerCase();
    if (answer) {
      setHasGuessed(true);
      if (
        answer === country?.name.common.toLowerCase() ||
        answer === country?.name.official.toLowerCase()
      ) {
        setIsCorrect(true);
        setScore(score + 1);
      } else {
        setIsCorrect(false);
        setScore(0);
      }
    } else {
      setInputVal("");
    }
  };
  return (
    <main className="h-fit min-h-screen flex flex-col justify-center items-center gap-4">
      <span className="text-secondary text-4xl font-semibold">
        Guess this flag
      </span>
      <span className="text-secondary text-lg">Score {score}</span>
      <button
        className="p-4 px-4 bg-white/30 hover:bg-white/50 rounded-md"
        onClick={() => {
          fetchAll().then((data) => {
            setCountry(data[Math.floor(Math.random() * data.length)]);
            setHasGuessed(false);
            setInputVal("");
            setScore(0)
          });
        }}
      >
        New flag
      </button>
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
          {!hasGuessed ? (
            <form
              onSubmit={handleSubmit}
              className="flex flex-row justify-center"
            >
              <input
                name="answer"
                type="text"
                autoComplete="off"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                className="p-2 bg-white/20 outline-none text-lg text-secondary"
              />
              <button className="hidden">Enter</button>
            </form>
          ) : isCorrect ? (
            <div className="flex flex-col gap-2">
              <span className="text-secondary text-xl font-semibold">
                Correct
              </span>
              <button
                className="p-4 bg-white/30 hover:bg-white/50 rounded-md"
                onClick={() => {
                  fetchAll().then((data) => {
                    setCountry(data[Math.floor(Math.random() * data.length)]);
                    setHasGuessed(false);
                    setInputVal("");
                  });
                }}
              >
                Next
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <span className="text-secondary text-xl font-semibold">
                Incorrect
              </span>
              <button
                className="p-4 bg-white/30 hover:bg-white/50 rounded-md"
                onClick={() => setHasGuessed(false)}
              >
                Retry
              </button>
            </div>
          )}
        </div>
      ) : (
        <span>Loading...</span>
      )}
    </main>
  );
}
