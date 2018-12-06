import React from "react";

import { SammenligningTemplate } from "./index";
import { MainElement } from "../../data/ApiTypes";
import ArbeidsledighetWrapper from "../visualizations/Arbeidsledighet/ArbeidsledighetWrapper";
import NoData from "../visualizations/Old/NoData";
import { TranslateString } from "../app/Translate";
import EntreprenorskapWrapper from "../visualizations/Entreprenorskap/EntreprenorskapWrapper";
import PieChart from "../visualizations/Generic/PieChart";
import { SektorConfig } from "../visualizations/Sektor/SektorConfig";
import BarChart from "../visualizations/Generic/BarChart";
import LenkeVisualization from "../visualizations/Lenke/LenkeVisualization";
import UtdanningLonnWrapper from "../visualizations/UtdanningLonn/UtdanningLonnWrapper";

const Utdanning: SammenligningTemplate[] = [
  {
    title: "Lønn",
    widget_id: "utdanninglonn",
    path: "/rest/lonn2",
    Component: UtdanningLonnWrapper,
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
      const SektorConfig: SektorConfig = {
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
        chartType: "pie",
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
    Component: LenkeVisualization,
  },
];
export default Utdanning;
