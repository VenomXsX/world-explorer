import type { Country } from "@/utils/types";

interface Props {
  country: Country;
  giniKeys: string[];
  currencyKeys: string[];
}

export default function EcoDemoData({
  country,
  giniKeys,
  currencyKeys,
}: Props) {
  return (
    <div className="flex flex-col my-4 text-secondary">
      <span className="w-full text-left text-4xl font-thin">
        Economic and demographic data
      </span>
      <div className="ml-4 flex flex-col">
        <span className="text-xl">
          Inhabitants:{" "}
          <span className="text-secondary/70 font-serif italic">
            {country.population.toLocaleString()}
          </span>
        </span>
        <span className="text-xl">
          Currency.ies:{" "}
          {currencyKeys.length > 0 ? (
            currencyKeys.map((key, i) => (
              <span key={i} className="text-secondary/70 font-serif">
                {country.currencies[key].name} ({country.currencies[key].symbol}
                )
              </span>
            ))
          ) : (
            <span className="text-secondary/70 font-serif italic">N/A</span>
          )}
        </span>
        <span className="text-xl">
          GINI coef.:{" "}
          <div className="flex flex-col">
            {giniKeys.length > 0 ? (
              giniKeys.map((key, i) => (
                <span key={i} className="text-secondary/70 font-serif ml-4">
                  - {key} ({(country.gini[Number(key)] / 100).toFixed(3)})
                </span>
              ))
            ) : (
              <span className="text-secondary/70 font-serif ml-4">No data</span>
            )}
          </div>
        </span>
      </div>
    </div>
  );
}
