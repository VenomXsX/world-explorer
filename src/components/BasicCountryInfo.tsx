import type { Country } from "@/utils/types";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Props {
  country: Country;
  languages: string[];
}

export default function BasicCountryInfo({ country, languages }: Props) {
  return (
    <div className="w-full flex flex-col sm:flex-row sm:justify-between mb-12">
      <div className="w-full flex flex-row justify-center items-center">
        <div className="w-[500px] h-[400px] sm:h-fit flex flex-row justify-center items-center">
          <Image
            alt={country.flags.alt}
            src={country.flags.png}
            width={500}
            height={400}
            className="pointer-events-none"
            style={{
              height: "100%",
              width: "auto",
            }}
            quality={100}
          />
        </div>
      </div>
      <div className="w-full flex flex-col justify-center my-4 sm:my-0">
        <div className="w-full flex flex-col justify-start">
          <Link
            href={country.maps.openStreetMaps}
            target="_blank"
            className="text-secondary text-6xl font-serif group hover:-skew-x-6 duration-300"
          >
            <span>
              {country.name.official}{" "}
              <ExternalLink className="inline opacity-0 group-hover:opacity-100 duration-300" />
            </span>
          </Link>
          <div className="w-full text-secondary/40 text-xl flex flex-col justify-start">
            <span>
              Common name:{" "}
              <span className="italic text-secondary">
                {country.name.common}
              </span>
            </span>
            {languages.map((language, i) => (
              <span key={i}>
                {country.name.nativeName[language].common}{" | "}
                {country.name.nativeName[language].official}{" "}
                <span className="italic">
                  {country.languages[language]
                    ? `(${country.languages[language]})`
                    : ""}
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
