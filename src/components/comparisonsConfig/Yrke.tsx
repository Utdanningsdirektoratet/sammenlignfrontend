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
import ArbeidsledighetWrapper from "../visualizations/Arbeidsledighet/ArbeidsledighetWrapper";
import NoData from "../visualizations/Old/NoData";
import PercentageBar from "../visualizations/Generic/PercentageBar";
import Translate, { TranslateString } from "../app/Translate";
import EntreprenorskapWrapper from "../visualizations/Entreprenorskap/EntreprenorskapWrapper";
import PieChart from "../visualizations/Generic/PieChart";
import visualizationstyles from "../visualizations/Visualization.module.scss";
import BarChart from "../visualizations/Generic/BarChart";
import LenkeVisualizationWrapper from "../visualizations/Lenke/LenkeVisualizationWrapper";

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
    title: "Sektorer",
    widget_id: "sektor",
    path: "/rest/main",
    render: (element: MainElement) => {
      const SektorConfig = {
        values: [
          {
            label: TranslateString("Ikke i arbeid"),
            value: "sektor_antall_ikkearbeid",
          },
          { label: TranslateString("Privat"), value: "sektor_antall_privat" },
          {
            label: TranslateString("Offentlig"),
            value: "sektor_antall_offentlig",
          },
          {
            label: TranslateString("Arbeidsledig"),
            value: "sektor_antall_arbeidsledig",
          },
          {
            label: TranslateString("I utdanning"),
            value: "sektor_antall_iutdanning",
          },
          {
            label: TranslateString("Selvstendig næringsdriver"),
            value: "sektor_antall_selvstendig",
          },
        ],
        chartType: "bar",
      };

      let data = SektorConfig.values.map(s => {
        return (element as any)[s.value];
      });
      if (data.every(d => !d)) return <NoData />;
      return SektorConfig.chartType === "pie" ? (
        <PieChart values={SektorConfig.values} element={element} />
      ) : (
        <BarChart values={SektorConfig.values} element={element} />
      );
    },
  },
  {
    title: "Lenke",
    widget_id: "lenke",
    path: "/rest/main",
    Component: LenkeVisualizationWrapper,
  },
];
export default Yrke;
