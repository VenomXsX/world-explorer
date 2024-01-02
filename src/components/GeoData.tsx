import type { Country, NameField } from "@/utils/types";
import { ExternalLink, SquareSlash } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Props {
  country: Country;
  neighborCountries: NameField[];
}

export default function GeoData({ country, neighborCountries }: Props) {
  const router = useRouter();
  return (
    <div className="flex flex-col my-4 text-secondary">
      <span className="w-full text-left text-4xl font-thin">
        Geographical Data
      </span>
      <div className="ml-4 flex flex-col">
        <span className="text-xl">
          Continent:{" "}
          <span className="text-secondary/70 font-serif italic">
            {country.region}
          </span>
        </span>
        <span className="text-xl">
          Subcontinent:{" "}
          <span className="text-secondary/70 font-serif italic">
            {country.subregion ?? "N/A"}
          </span>
        </span>
        <span className="text-xl">
          Coordinates:{" "}
          <span className="text-secondary/70 font-serif">
            {country.latlng[0].toFixed(2)}°N, {country.latlng[1].toFixed(2)}°E
          </span>
        </span>
        <span className="text-xl">
          Area:{" "}
          <span className="text-secondary/70 font-serif">
            {country.area} km²
          </span>
        </span>
        <span className="text-xl">
          Neighboring {neighborCountries.length === 1 ? "country" : "countries"}
          :{" "}
          <div className="text-secondary/70 font-serif ml-4 flex flex-col">
            {neighborCountries.length > 0 ? (
              neighborCountries.map((e, i) => (
                <div key={i} className="group flex flex-row justify-between w-fit gap-2 items-center">
                  <Link
                    key={i}
                    href={`/details/${e.cca3}`}
                    className="group-hover:italic text-secondary/70 group-hover:text-secondary duration-300"
                    onClick={() => router.refresh()}
                  >
                    - {e.name.common}
                  </Link>
                  <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 duration-300" />
                </div>
              ))
            ) : (
              <span>None</span>
            )}
          </div>
        </span>
      </div>
    </div>
  );
}
