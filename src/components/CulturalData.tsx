import type { Country } from "@/utils/types";

interface Props {
  country: Country;
  languages: string[];
  demonymKeys: string[];
}

export default function CulturalData({
  country,
  languages,
  demonymKeys,
}: Props) {
  return (
    <div className="flex flex-col my-4 text-secondary">
      <span className="w-full text-left text-4xl font-thin">Cultural Data</span>
      <div className="ml-4 flex flex-col">
        <span className="text-xl">
          Languages:{" "}
          <div className="flex flex-col ml-4">
            {languages.length > 0 ? (
              languages.map((language, i) => (
                <span key={i} className="text-secondary/80">
                  - {country.languages[language]}
                </span>
              ))
            ) : (
              <span className="text-secondary/70 font-serif italic">N/A</span>
            )}
          </div>
        </span>
        <span className="text-xl">
          Demonym:{" "}
          <div className="flex flex-col ml-4">
            {demonymKeys.length > 0 ? (
              demonymKeys.map((key, i) => (
                <span key={i} className="text-secondary/80">
                  - {country.demonyms[key].m} | {country.demonyms[key].f} (
                  {key === "eng" ? "English" : "French"})
                </span>
              ))
            ) : (
              <span className="text-secondary/70 font-serif italic">N/A</span>
            )}
          </div>
        </span>
      </div>
    </div>
  );
}
