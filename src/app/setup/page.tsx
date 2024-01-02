"use client";

import React from "react";

export default function Setup() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const numberOfPlayers = formData.get("players");
    const numberOfRounds = formData.get("rounds");
  };
  return (
    <main className="w-full h-fit min-h-screen flex flex-col justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col p-8 rounded-md bg-transparent/25 text-secondary gap-2"
      >
        <span className="text-2xl font-bold">Game setup</span>
        <span>Number of players (2 to 4 players)</span>
        <input
          type="number"
          name="players"
          className="p-2 rounded-md text-black"
          defaultValue={2}
          min={2}
          max={4}
        />
        <span>Number of rounds (1 to 10 rounds)</span>
        <input
          type="number"
          name="rounds"
          className="p-2 roudned-md text-black"
          defaultValue={5}
          min={1}
          max={10}
        />
        <button className={`p-4 text-xl text-secondary `}>Let's play</button>
      </form>
    </main>
  );
}
