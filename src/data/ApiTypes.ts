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

export interface Main {
  [id: string]: MainElement;
}
export type DataList = {
  list: MainElement[];
  interesser: string[];
};
