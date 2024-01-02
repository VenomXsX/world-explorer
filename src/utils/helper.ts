import { Country } from "./types";

interface sortParameters {
  countries: Country[];
  order: "alphaName";
  reversed?: boolean;
}

interface filterParameters {
  all: Country[];
  continentVal: string;
  subcontinent: string;
  inputVal: string;
}

const sortCountries = ({
  countries,
  order,
  reversed = false,
}: sortParameters) => {
  if (!countries) return [];
  switch (order) {
    case "alphaName":
      const sortedCountries = countries.slice().sort((a, b) => {
        const nameA = a.name.common.toLowerCase();
        const nameB = b.name.common.toLowerCase();

        if (nameA < nameB) {
          return reversed ? 1 : -1;
        }
        if (nameA > nameB) {
          return reversed ? -1 : 1;
        }
        return 0;
      });
      return sortedCountries;
    default:
      return countries;
  }
};

const filterTheCountries = ({
  all,
  continentVal,
  inputVal,
  subcontinent,
}: filterParameters) => {
  return all
    .filter((item) => {
      if (continentVal === "all") {
        return true;
      }
      return item.region.toLowerCase() === continentVal;
    })
    .filter((item) => {
      if (subcontinent) {
        if (item.subregion === subcontinent) {
          return true;
        } else if (subcontinent === "all-continents") {
          return true;
        }
      } else {
        return true;
      }
    })
    .filter((item) => {
      if (
        item.name.common.toLowerCase().includes(inputVal.toLowerCase()) ||
        item.name.official.toLowerCase().includes(inputVal.toLowerCase())
      ) {
        return true;
      }
    });
};

export { sortCountries, filterTheCountries };
