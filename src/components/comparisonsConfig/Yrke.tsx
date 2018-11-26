import React from "react";

import { SammenligningTemplate } from "./index";
import {
  MainElement,
  LonnElement,
  ArbeidsledighetElement,
  EntrepenorElement,
} from "../../data/ApiTypes";
import VisualizationHeaderLonn, {
  VisualizationHeaderConfigLonn,
} from "../visualizations/Lonn/VisualizationHeaderLonn";
import LonnWrapper from "../visualizations/Lonn/LonnWrapper";
import VisualizationHeaderArbeidsledighet, {
  VisualizationHeaderConfigArbeidsledighet,
} from "../visualizations/Arbeidsledighet/VisualizationHeaderArbeidsledighet";
import ArbeidsledighetWrapper from "../visualizations/Arbeidsledighet/ArbeidsledighetWrapper";
import NoData from "../visualizations/Old/NoData";
import PercentageBar from "../visualizations/Generic/PercentageBar";
import Translate from "../app/Translate";
import EntreprenorskapWrapper from "../visualizations/Entreprenorskap/EntreprenorskapWrapper";

const Yrke: SammenligningTemplate[] = [
  {
    title: "Lønnsstatistikk",
    widget_id: "lonn",
    path: "/rest/lonn",
    // query: { sektor: "A" },
    Component: LonnWrapper,
  },
  {
    title: "Arbeidsledighet",
    widget_id: "arbeidsledighet",
    path: "/rest/arbeidsledighet",
    Component: ArbeidsledighetWrapper,
  },
  {
    title: "Entrepenørskap",
    widget_id: "entrepenorskap",
    path: "/rest/entrepenorskap",
    Component: EntreprenorskapWrapper,
  },
  {
    title: "Uno id",
    widget_id: "",
    path: "/rest/main",
    render: (data: MainElement) => (
      <div>
        {data.uno_id}
        <br />
        {data.tittel}
      </div>
    ),
  },
  {
    title: "Interesser",
    widget_id: "interesser",
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
  {
    title: "Sektorer",
    widget_id: "sektor",
    path: "/rest/main",
    render: (data: MainElement) => {
      return (
        <table>
          <tbody>
            {typeof data.sektor_antall_personer !== "undefined" ? (
              <tr>
                <th>
                  <Translate nb="Antall personer" />
                </th>
                <td>{data.sektor_antall_personer}</td>
              </tr>
            ) : null}
            {typeof data.sektor_antall_arbeidsledig !== "undefined" ? (
              <tr>
                <th>
                  <Translate nb="Antall arbeidsledige" />
                </th>
                <td>{data.sektor_antall_arbeidsledig}</td>
              </tr>
            ) : null}
            {typeof data.sektor_antall_ikkearbeid !== "undefined" ? (
              <tr>
                <th>
                  <Translate nb="Antall ikke i arbeid" />
                </th>
                <td>{data.sektor_antall_ikkearbeid}</td>
              </tr>
            ) : null}
            {typeof data.sektor_antall_iutdanning !== "undefined" ? (
              <tr>
                <th>
                  <Translate nb="Antall i utdanning" />
                </th>
                <td>{data.sektor_antall_iutdanning}</td>
              </tr>
            ) : null}
            {typeof data.sektor_antall_offentlig !== "undefined" ? (
              <tr>
                <th>
                  <Translate nb="Antall offentlig sektor" />
                </th>
                <td>{data.sektor_antall_offentlig}</td>
              </tr>
            ) : null}
            {typeof data.sektor_antall_personer !== "undefined" ? (
              <tr>
                <th>
                  <Translate nb="Antall privat sektor" />
                </th>
                <td>{data.sektor_antall_personer}</td>
              </tr>
            ) : null}
            {typeof data.sektor_antall_selvstendig !== "undefined" ? (
              <tr>
                <th>
                  <Translate nb="Antall selvstendig næringsdrivende" />
                </th>
                <td>{data.sektor_antall_selvstendig}</td>
              </tr>
            ) : null}
          </tbody>
        </table>
      );
    },
  },
];
export default Yrke;
