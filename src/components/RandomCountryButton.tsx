import type { Country } from "@/utils/types";
import { Dices } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  all: Country[];
}

export default function RandomCountryButton({ all }: Props) {
  const router = useRouter();
  return (
    <button
      className="h-12 px-4 gap-5 text-secondary flex flex-row justify-center items-center rounded-md bg-transparent hover:bg-white/10 hover:-skew-x-6 backdrop-blur-md duration-300"
      onClick={() =>
        router.push(
          `/details/${all[Math.floor(Math.random() * all.length)].cca3}`
        )
      }
    >
      <Dices />
      Random
    </button>
  );
}
