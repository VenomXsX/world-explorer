"use client";

import { useRouter } from "next/navigation";
import Icon from "./Icon";

export default function Navbar() {
  const router = useRouter();
  const onSeach = (q: string) => {
    router.push(`/results?q=${q}`);
  };
  return (
    <nav className="w-full flex flex-col sm:flex-row sm:justify-between sm:items-center bg-white/10 backdrop-blur-md fixed top-0 z-20">
      <div className="flex flex-col sm:flex-row sm:items-center">
        <div className="flex flex-row justify-between items-center">
          <span className="py-4 font-bold text-secondary text-2xl font-serif tracking-tighter">
            <a href="/" className="p-4">
              <Icon className="w-8 h-8 inline text-secondary" type="Logo" />
              World Explorer
            </a>
          </span>
        </div>
      </div>
    </nav>
  );
}
