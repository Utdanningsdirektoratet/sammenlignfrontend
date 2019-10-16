export interface MainElement {
  // funksjon: string;
  // id: string;
  innholdstype: "utdanningsbeskrivelse" | "yrke";
  interesser?: string[];
  // path: string;
  tittel: string;
  uno_id: string;
  // yrkeskoder_styrk08?: string[];
  // utdannelseskoder_nus?: number[];
  // _version_: number;
  sektor_antall_arbeidsledig?: number;
  sektor_antall_iutdanning?: number;
  sektor_antall_privat?: number;
  sektor_antall_personer?: number;
  sektor_antall_ikkearbeid?: number;
  sektor_antall_selvstendig?: number;
  sektor_antall_offentlig?: number;
  url: string;
  utdanningstype?: any; //Because for now, yrke and utdanning is different (string and string[])
}

export interface EntrepenorElement {
  [kategori: string]: EntrepenorObject;
}

export interface EntrepenorObject {
  // funksjon: "entrepenorskap";
  // id: string;
  // nus_kode: string;
  nus_kortnavn: string;
  nus_navn: string;
  // path: string;
  selvstendige_andel?: number;
  selvstendige_andel40?: number;
  selvstendige_andel710?: number;
  selvstendige_andel_kvinner?: number;
  selvstendige_andel_menn?: number;
  selvstendige_antall?: number;
  selvstendige_antall710?: number;
  uno_id: string;
  // _version_: number;
}

export interface ArbeidsledighetElement {
  [kategori: string]: ArbeidsledighetObject;
}

export interface ArbeidsledighetObject {
  nus_navn?: string;
  uno_id?: string;
  arbeidsledige_andel_menn?: number;
  arbeidsledige_antall13?: number;
  arbeidsledige_andel13?: number;
  arbeidsledige_andel40?: number;
  nus_kode?: string;
  arbeidsledige_andel710?: number;
  arbeidsledige_andel_kvinner?: number;
  nus_kortnavn?: string;
  arbeidsledige_antall?: number;
  arbeidsledige_antall710?: number;
  arbeidsledige_andel?: number;
}

export interface LonnObject {
  A_antall_ansatte: number;
  A_wage_avg?: number;
  A_wage_median?: number;
  A_wage_overtime_avg?: number;
  A_wage_overtime_median?: number;
  A_wage_overtime_q3?: number;
  A_wage_q1?: number;
  A_wage_q3?: number;
  K_antall_ansatte?: number;
  K_wage_avg?: number;
  K_wage_median?: number;
  K_wage_overtime_avg?: number;
  K_wage_overtime_median?: number;
  K_wage_overtime_q3?: number;
  K_wage_q1?: number;
  K_wage_q3?: number;
  M_antall_ansatte?: number;
  M_wage_avg?: number;
  M_wage_median?: number;
  M_wage_overtime_avg?: number;
  M_wage_overtime_median?: number;
  M_wage_overtime_q3?: number;
  M_wage_q1?: number;
  M_wage_q3?: number;

  kilde: string;
  // kode: string;
  // kodeverk: string;
  // kodeverksnavn: string;
  // path: string;
  // sektor: Sektor;
  tittel: string;
  uno_id: string;
  // _version_: number;
}
export interface IArbeidstid {
  A?: LonnObject;
  D?: LonnObject;
  H?: LonnObject;
  yrke?: boolean;
}
export type Arbeidstid = "A" | "D" | "H";
export interface ISektor {
  A?: IArbeidstid;
  K?: IArbeidstid;
  P?: IArbeidstid;
  S?: IArbeidstid;
}
export type Sektor = "A" | "K" | "P" | "S";
export type Innholdstype = "yrke" | "utdanning" | "studie";
export interface LonnElement {
  [kategori: string]: ISektor;
}

export interface Main {
  [id: string]: MainElement;
}

export interface SuggestElement {
  uno_id: string;
  tittel: string;
}

export interface Suggest {
  response: {
    numFound: number;
    docs: SuggestElement[];
  };
}

export type DataList = {
  list: MainElement[];
  interesser: string[];
  nivåer: string[];
};
export type Kjønn = "A" | "KM";

export interface UtdanningLonnObject {
  tittel: string;
  uno_id: string;
  A_antall_ansatte: number;
  A_wage_avtalt_median?: number;
  A_wage_q1?: number;
  A_wage_q3?: number;
  A_wage_avg?: number;
  A_wage_median?: number;
  A_wage_overtime_avg?: number;
  A_wage_overtime_median?: number;
  A_wage_overtime_q3?: number;
}

export interface IUtdanningFullført {
  A?: UtdanningLonnObject;
  "00-04"?: UtdanningLonnObject;
  "05-"?: UtdanningLonnObject;
}

export interface IUtdanningUnknow {
  A: IUtdanningFullført;
}

export interface IUtdanningArbeidstid {
  A: IUtdanningUnknow;
}

export interface IUtdanningSektor {
  A: IUtdanningArbeidstid;
}

export interface UtdanningLonnElement {
  [kategori: string]: IUtdanningSektor;
}

export interface ArbeidsmarkedYrkeElement {
  utdanningskode_nus_kortnavn: string;
  antall_personer: number;
}

export interface ArbeidsmarkedUtdanningElement {
  yrkeskode_styrk08_navn: string;
  antall_personer: number;
}
