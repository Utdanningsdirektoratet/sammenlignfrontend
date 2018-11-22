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
import Translate from "../app/Translate";

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
          <span>
            <Translate
              nb="Viser tall for %nus_navn%"
              replacements={{ "%nus_navn%": data.nus_navn }}
            />
          </span>
          {data.selvstendige_andel ? (
            <>
              <h4>
                <Translate nb="Andel Selvstendig næringstrivende" />
              </h4>
              <PercentageBar value={data.selvstendige_andel * 100} />
            </>
          ) : null}
          {data.selvstendige_andel_menn ? (
            <>
              <h4>
                <Translate nb="Andel Selvstendig næringstrivende menn" />
              </h4>
              <PercentageBar value={data.selvstendige_andel_menn * 100} />
            </>
          ) : null}
          {data.selvstendige_andel_kvinner ? (
            <>
              <h4>
                <Translate nb="Andel Selvstendig næringstrivende kvinner" />
              </h4>
              <PercentageBar value={data.selvstendige_andel_kvinner * 100} />
            </>
          ) : null}

          {data.selvstendige_andel710 ? (
            <>
              <h4>
                <Translate nb="Andel Selvstendig næringstrivende blant de som fullførte utdanning for 7-10 år siden" />
              </h4>
              <PercentageBar value={data.selvstendige_andel710 * 100} />
            </>
          ) : null}
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
