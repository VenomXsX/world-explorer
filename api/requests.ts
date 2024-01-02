import api from "./api";
import type { NameField, Country } from "@/utils/types";

interface SubregionRes {
  subregion: string;
}

export function fetchAll() {
  return api.get("/all/").then((res) => res.data as Country[]);
}

export function fetchByCca3(code: string) {
  return api
    .get(`/alpha/${code}`)
    .then((res) => res.data ?? null)
    .catch(() => {
      return null;
    });
}

export function searchCountriesByName(name: string) {
  return api
    .get(`/name/${name}?fullText=false`)
    .then((res) => {
      return res.data ?? null;
    })
    .catch(() => {
      return null;
    });
}

export async function fetchNeighboringCountries(codes: string[]) {
  try {
    const neighbors: NameField[] = await Promise.all(
      codes.map(async (code) => {
        const res = await api.get(`/alpha?codes=${code}&fields=name,cca3`);
        return res.data ?? null;
      })
    );

    return neighbors.filter((neighbor) => neighbor !== null);
  } catch (error) {
    console.error("Error fetching neighboring countries:", error);
    return [];
  }
}

function getUnique(value: string, index: number, array: string[]) {
  return array.indexOf(value) === index;
}

export async function fetchSubregions() {
  return api.get<SubregionRes[]>("all?fields=subregion").then((res) => {
    const all = res.data.map((item) => item.subregion);
    const uniques = all.filter(getUnique);
    return uniques.filter((item) => item !== "");
  });
}
