import Image from "next/image";
import { Country } from "@/utils/types";
import { useRouter } from "next/navigation";

export default function Card({ country }: { country: Country }) {
  const router = useRouter();
  return (
    <div
      className={`w-72 h-72 flex flex-col rounded-md backdrop-blur-md justify-start items-center my-8 border shadow-lg shadow-white/20 border-white/20 hover:shadow-2xl hover:shadow-white/50 hover:scale-[1.05] hover:-skew-x-1 hover:-skew-y-1 cursor-pointer duration-500`}
      onClick={() => router.push(`/details/${country.cca3}`)}
    >
      <Image
        alt={country.flags.alt}
        src={country.flags.png}
        width={3000}
        height={2000}
        quality={100}
        className="-translate-y-8 rounded-md"
        style={{
          height: "100px",
          width: "auto",
        }}
      />
      <div className="w-full px-4 flex flex-col">
        <span className="text-2xl text-left font-bold text-secondary">
          {country.name.common}
        </span>
        <span className="text-gray-500 mx-4 mb-2">
          {country.name.official}
        </span>
      </div>
      <div className="w-full px-4">
        <span className="text-gray-500 mx-4 mb-2">
          {country.capital ? (
            <span>
              <span>Capital(s): </span>
              <span>{country.capital.join(", ")}</span>
            </span>
          ) : (
            <span>No capital information available</span>
          )}
        </span>
      </div>
      <div className="w-full px-4">
        <span className="text-gray-500 mx-4 mb-2">
          Population: {country.population.toLocaleString()}
        </span>
      </div>
    </div>
  );
}
