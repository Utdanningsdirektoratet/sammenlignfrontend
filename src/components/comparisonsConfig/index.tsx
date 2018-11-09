import Utdanning from "./Utdanning";
import Yrke from "./Yrke";

import { QueryObject } from "../app/Api";
import { Innholdstype } from "../../data/ApiTypes";

export type SammenligningTemplate = {
  title: string;
  widget_id: string;
  path: string;
  query?: QueryObject;
  render: (data: any) => JSX.Element;
};

const exported: { [key: string]: SammenligningTemplate[] } = {
  yrke: Yrke,
  utdanning: Utdanning,
};

export default exported;
