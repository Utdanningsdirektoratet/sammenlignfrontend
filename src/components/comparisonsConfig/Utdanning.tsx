import React from "react";

import { SammenligningTemplate } from "./index";
import {
  MainElement,
  ArbeidsledighetElement,
  EntrepenorElement,
} from "../../data/ApiTypes";
import VisualizationHeaderArbeidsledighet, {
  VisualizationHeaderConfigArbeidsledighet,
} from "../visualizations/Arbeidsledighet/VisualizationHeaderArbeidsledighet";
import ArbeidsledighetWrapper from "../visualizations/Arbeidsledighet/ArbeidsledighetWrapper";
import NoData from "../visualizations/Old/NoData";
import PercentageBar from "../visualizations/Generic/PercentageBar";

const Utdanning: SammenligningTemplate[] = [
  {
    title: "Arbeidsledighet",
    widget_id: "arbeidsledighet",
    path: "/rest/arbeidsledighet",
    Component: ArbeidsledighetWrapper,
  },
  {
    title: "Uno id",
    widget_id: "",
    path: "/rest/main",
    render: (data: MainElement) => <span>{data.uno_id}</span>,
  },
  {
    title: "Entrepenørskap",
    widget_id: "entrepenorskap",
    path: "/rest/entrepenorskap",
    render: (element: EntrepenorElement) => {
      const keys = Object.keys(element);
      if (keys.length === 0) return <NoData />;
      const data = element[(keys[0] as any) as number];
      return (
        <div>
          <span>Viser tall for {data.nus_navn}</span>
          <h4>Andel Selvstendig næringstrivende</h4>
          <PercentageBar value={data.selvstendige_andel * 100} />
          <h4>Andel Selvstendig næringstrivende Menn</h4>
          <PercentageBar value={data.selvstendige_andel_menn * 100} />
          <h4>Andel Selvstendig næringstrivende Kvinner</h4>
          <PercentageBar value={data.selvstendige_andel_kvinner * 100} />
          <h4>Andel Selvstendig næringstrivende (40?)</h4>
          <PercentageBar value={data.selvstendige_andel40 * 100} />
          <h4>Andel Selvstendig næringstrivende (710?)</h4>
          <PercentageBar value={data.selvstendige_andel710 * 100} />
        </div>
      );
    },
  },
  {
    title: "Interesser",
    widget_id: "",
    path: "/rest/main",
    render: (data: MainElement) =>
      data.interesser ? (
        <ul>
          {data.interesser.map(interresse => (
            <li key={interresse}>{interresse}</li>
          ))}
        </ul>
      ) : (
        <span>Ingen interresser</span>
      ),
  },
];
export default Utdanning;
