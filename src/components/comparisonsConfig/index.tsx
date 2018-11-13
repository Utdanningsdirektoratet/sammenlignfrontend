import Utdanning from "./Utdanning";
import Yrke from "./Yrke";

import { QueryObject } from "../app/Api";
import { Innholdstype } from "../../data/ApiTypes";
import { ComparisonHeaderProps } from "../pages/ComparisonPage/ComparisonHeader";

export type SammenligningTemplate = {
  title: string;
  widget_id: string;
  path: string;
  query?: QueryObject;
  HeaderComponent?: React.ComponentClass<ComparisonHeaderProps>;
  render: (data: any, config?: any) => JSX.Element;
};

const exported: { [key: string]: SammenligningTemplate[] } = {
  yrke: Yrke,
  utdanning: Utdanning,
};

export default exported;
