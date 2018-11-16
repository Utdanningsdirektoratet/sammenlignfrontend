import React from "react";

import { SammenligningTemplate } from "./index";
import {
  MainElement,
  LonnElement,
  ArbeidsledighetElement,
} from "../../data/ApiTypes";
import VisualizationHeaderLonn, {
  VisualizationHeaderConfigLonn,
} from "../pages/ComparisonPage/Headers/VisualizationHeaderLonn";
import VisualizationHeaderArbeidsledighet, {
  VisualizationHeaderConfigArbeidsledighet,
} from "../pages/ComparisonPage/Headers/VisualizationHeaderArbeidsledighet";
import ArbeidsledighetWrapper from "../visualizations/Arbeidsledighet/ArbeidsledighetWrapper";

const Utdanning: SammenligningTemplate[] = [
  {
    title: "Lønnsstatistikk",
    widget_id: "lonn",
    path: "/rest/lonn",
    HeaderComponent: VisualizationHeaderLonn,
    //query: { sektor: "A" },
    render: (data: LonnElement, config: VisualizationHeaderConfigLonn) => (
      <div>
        hei
        {Object.keys(data).map(key => {
          const lonn = data[key];
          return (
            <div>
              hei
              {lonn.A.D.sektor}
            </div>
          );
        })}
      </div>
    ),
  },
  {
    title: "Arbeidsledighet",
    widget_id: "arbeidsledighet",
    path: "/rest/arbeidsledighet",
    HeaderComponent: VisualizationHeaderArbeidsledighet,
    render: (
      fullData: ArbeidsledighetElement,
      config: VisualizationHeaderConfigArbeidsledighet
    ) => {
      const data = fullData[Object.keys(fullData)[0]];

      return <ArbeidsledighetWrapper data={data} config={config} />;
    },
  },
  {
    title: "Uno id",
    widget_id: "",
    path: "/rest/main",
    render: (data: MainElement) => <span>{data.uno_id}</span>,
  },
  {
    title: "Interesser",
    widget_id: "",
    path: "/rest/main",
    render: (data: MainElement) =>
      data.interesser ? (
        <ul>
          {data.interesser.map(interresse => (
            <li>{interresse}</li>
          ))}
        </ul>
      ) : (
        <span>Ingen interresser</span>
      ),
  },
];
export default Utdanning;
