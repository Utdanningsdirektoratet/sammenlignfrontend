export interface MainElement {
  alltext_nb: string[];
  funksjon: string;
  id: string;
  innholdstype: string;
  interesser?: string[];
  path: string;
  tittel: string;
  uno_id: string;
  yrkeskoder_styrk08?: string[];
  utdannelseskoder_nus?: string[];
  _version_: number;
}

export interface LonnObject {
  A_antall_ansatte: number;
  A_wage_avg: number;
  A_wage_median: number;
  A_wage_overtime_avg: number;
  A_wage_overtime_median: number;
  A_wage_overtime_q3: number;
  A_wage_q1: number;
  A_wage_q3: number;
  K_antall_ansatte: number;
  K_wage_avg: number;
  K_wage_median: number;
  K_wage_overtime_avg: number;
  K_wage_overtime_median: number;
  K_wage_overtime_q3: number;
  K_wage_q1: number;
  K_wage_q3: number;
  M_antall_ansatte: number;
  M_wage_avg: number;
  M_wage_median: number;
  M_wage_overtime_avg: number;
  M_wage_overtime_median: number;
  M_wage_overtime_q3: number;
  M_wage_q1: number;
  M_wage_q3: number;
  arbeidstid: "H";
  dato: string;
  funksjon: "lonn";
  id: string;
  innholdstype: string;
  kilde: string;
  kode: string;
  kodeverk: string;
  kodeverksnavn: string;
  path: string;
  sektor: Sektor;
  tittel: string;
  uno_id: string;
  _version_: number;
}
interface IArbeidstid {
  A: LonnObject;
  D: LonnObject;
  H: LonnObject;
}
export type Arbeidstid = "A" | "D" | "H";
interface ISektor {
  A: IArbeidstid;
  K: IArbeidstid;
  P: IArbeidstid;
  S: IArbeidstid;
}
export type Sektor = "A" | "K" | "P" | "S";
export type Innholdstype = "yrke" | "utdanning" | "studie";
export interface LonnElement {
  [kategori: string]: ISektor;
}

export interface Main {
  [id: string]: MainElement;
}
export type DataList = {
  list: MainElement[];
  interesser: string[];
};
