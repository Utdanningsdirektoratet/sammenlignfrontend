export interface IMainElement {
  alltext_nb: string[];
  funksjon: string;
  id: string;
  innholdstype: string;
  path: string;
  tittel: string;
  uno_id: string;
  yrkeskoder_styrk08: string[];
  _version_: number;
}

export interface IMain {
  [id: string]: IMainElement;
}
