import Utdanning from "./Utdanning";
import Yrke from "./Yrke";
import ExtraWidgets from "./ExtraWidgets";

import { QueryObject } from "../../util/querystring";

export type ComparisonComponentProps<Data> = {
  data: { [uno_id: string]: Data };
  template: SammenligningTemplate;
  uno_ids: string[];
  widget: boolean;
};

export interface SammenligningTemplate {
  title: string;
  description?: string;
  widget_id: string;
  path: string;
  query?: QueryObject;
  // render?: (data: any) => JSX.Element;
  render?: (data: any, layout: string) => JSX.Element;
  Component?: React.ComponentClass<ComparisonComponentProps<any>>;
}

const exported: { [key: string]: SammenligningTemplate[] } = {
  yrke: Yrke,
  utdanning: Utdanning,
  extra: ExtraWidgets,
};

export default exported;
