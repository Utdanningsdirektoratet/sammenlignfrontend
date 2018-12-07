import Utdanning from "./Utdanning";
import Yrke from "./Yrke";

import { QueryObject } from "../../util/querystring";

export type ComparisonComponentProps<Data> = {
  data: { [uno_id: string]: Data };
  template: SammenligningTemplate;
  uno_ids: string[];
};

export interface SammenligningTemplate {
  title: string;
  description?: string;
  widget_id: string;
  path: string;
  query?: QueryObject;
  render?: (data: any) => JSX.Element;
  Component?: React.ComponentClass<ComparisonComponentProps<any>>;
}

const exported: { [key: string]: SammenligningTemplate[] } = {
  yrke: Yrke,
  utdanning: Utdanning,
};

export default exported;
