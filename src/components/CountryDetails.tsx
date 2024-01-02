import type { Country } from "@/utils/types";

export default function CountryDetails({ country }: { country: Country }) {
  return (
    <div className="flex flex-col my-4 text-secondary">
      <span className="w-full text-left text-4xl font-thin">
        Country Details
      </span>
      <div className="flex flex-col text-xl ml-4">
        <div className="flex flex-row">
          <span className="mr-4">Internet domains:</span>
          <span className="text-secondary/70 font-serif italic">
            {country.tld.map((e) => e + " ")}
          </span>
        </div>
        <span className="text-xl">
          Capital:{" "}
          <span className="text-secondary/70 font-serif italic">
            {country.capital ?? "No capital info"}
          </span>
        </span>
        <span className="text-xl">
          Independent:{" "}
          <span className="text-secondary/70 font-serif italic">
            {country.independent ? "Yes" : "No"}
          </span>
        </span>
        <span className="text-xl">
          UN Member:{" "}
          <span className="text-secondary/70 font-serif italic">
            {country.unMember ? "Is a member" : "Not a member"}
          </span>
        </span>
      </div>
    </div>
  );
}
