import Utdanning from "./Utdanning";
import Yrke from "./Yrke";

import { QueryObject } from "../app/Api";
import { Innholdstype } from "../../data/ApiTypes";
import { ComparisonHeaderProps } from "../visualizations/Shared/ComparisonHeader";

export interface SammenligningTemplate {
  title: string;
  widget_id: string;
  path: string;
  query?: QueryObject;
  HeaderComponent?: React.ComponentClass<ComparisonHeaderProps<any>>;
  render: (
    data: any,
    config?: any,
    rowIndex?: number,
    unoId?: string,
    setConfig?: (config: any) => void
  ) => JSX.Element;
}

const exported: { [key: string]: SammenligningTemplate[] } = {
  yrke: Yrke,
  utdanning: Utdanning,
};

export default exported;
