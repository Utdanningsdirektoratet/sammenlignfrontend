import * as d3 from "d3";

import {
  ArbeidsmarkedUtdanningElement,
  ArbeidsmarkedElement,
  ArbeidsmarkedYrkeElement,
} from "../../../data/ApiTypes";
import { fileURLToPath } from "url";
import { TranslateString } from "../../app/Translate";

export const filterMappings = {
  title: TranslateString("Antall personer"),
  antall_personer: {
    fields: [TranslateString("antall personer")],
    selector: (d: ArbeidsmarkedElement) => [d.antall_personer],
  },
  offentlig_privat: {
    title: TranslateString("Offentlig / Privat"),
    fields: [
      TranslateString("antall som jobber i privat sektor"),
      TranslateString("antall som jobber i offentlig sektor"),
      TranslateString("uoppgitt sektor"),
    ],
    selector: (d: ArbeidsmarkedElement) => [
      d.antall_privat,
      d.antall_offentlig,
      d.antall_ukjent_sektor,
    ],
  },
  kvinner_menn: {
    title: TranslateString("Kvinner / menn"),
    fields: [
      TranslateString("antall kvinner"),
      TranslateString("antall menn"),
      TranslateString("uoppgitt kjønn"),
    ],
    selector: (d: ArbeidsmarkedElement) => [
      d.antall_kvinner,
      d.antall_menn,
      d.antall_ukjent_kjonn,
    ],
  },
  over_under_40: {
    title: TranslateString("Over 40år / Under 40 år"),
    fields: [
      TranslateString("antall personer under 40 år"),
      TranslateString("antall personer over 40 år"),
    ],
    selector: (d: ArbeidsmarkedElement) => [
      d.antall_40,
      d.antall_personer - d.antall_40,
    ],
  },
  kandidater_13: {
    title: TranslateString("Nyutdanna"),
    fields: [
      TranslateString("Nyutdanna"),
      TranslateString("Ferdigutdanna 7-10 år siden"),
      TranslateString("fullført, annet"),
    ],
    selector: (d: ArbeidsmarkedElement) => [
      d.antall_13,
      d.antall_710,
      d.antall_personer - d.antall_13 - d.antall_710,
    ],
  },
};

export type FilterTypes =
  | "antall_personer"
  | "kvinner_menn"
  | "offentlig_privat"
  | "over_under_40"
  | "kandidater_13";

export type ArbeidsmarkedDataElement = {
  tittel: string;
  data: number[];
  sum: number;
  rest?: boolean;
};
export type ArbeidsmarkedData = {
  data_labels: string[];
  elements: ArbeidsmarkedDataElement[];
};

export function mapUtdanningData(
  data: ArbeidsmarkedUtdanningElement[],
  filter: FilterTypes
): ArbeidsmarkedData {
  const mapping = filterMappings[filter];
  return {
    elements: data.map(d => {
      const data = mapping.selector(d);
      return {
        tittel: d.yrkeskode_styrk08_navn,
        data: data,
        sum: data.reduce((acc, v) => acc + v),
      };
    }),
    data_labels: mapping.fields,
  };
}
export function mapYrkeData(
  data: ArbeidsmarkedYrkeElement[],
  filter: FilterTypes
): ArbeidsmarkedData {
  const mapping = filterMappings[filter];
  return {
    elements: data.map(d => {
      const data = mapping.selector(d);
      return {
        tittel: d.utdanningskode_nus_kortnavn,
        data: data,
        sum: data.reduce((acc, v) => acc + v),
      };
    }),
    data_labels: mapping.fields,
  };
}

export function mapAnyData(
  data: any,
  filter: FilterTypes,
  uno_id: string | undefined,
  sort: number,
  show_all: boolean
): ArbeidsmarkedData {
  if (!uno_id) return { data_labels: [], elements: [] };
  let ret: ArbeidsmarkedData;
  if (uno_id[0] === "u") {
    ret = mapUtdanningData(data || [], filter);
  } else {
    ret = mapYrkeData(data || [], filter);
  }
  ret.elements.sort((a, b) => b.sum - a.sum);
  if (!show_all && ret.elements.length > 10) {
    const rest = ret.elements.slice(10);
    ret.elements = ret.elements.slice(0, 10);
    const dataRestAcc = rest.reduce(
      (acc, v) => acc.map((a, i) => a + v.data[i]),
      ret.data_labels.map(() => 0)
    );
    ret.elements.push({
      tittel: TranslateString("Andre"),
      sum: d3.sum(dataRestAcc),
      data: dataRestAcc,
      rest: true,
    });
  }
  return ret;
}
