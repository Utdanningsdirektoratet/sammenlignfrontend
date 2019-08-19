import React from "react";

import { SammenligningTemplate } from "./index";
import {
  MainElement,
  LonnElement,
  ArbeidsledighetElement,
  EntrepenorElement,
  ArbeidsmarkedYrkeElement,
  ArbeidsmarkedUtdanningElement,
} from "../../data/ApiTypes";
import LonnWrapper from "../visualizations/Lonn/LonnWrapper";
import ArbeidsledighetWrapper from "../visualizations/Arbeidsledighet/ArbeidsledighetWrapper";
import NoData from "../visualizations/Old/NoData";
import Translate, { TranslateString } from "../app/Translate";
import EntreprenorskapWrapper from "../visualizations/Entreprenorskap/EntreprenorskapWrapper";
import PieChart from "../visualizations/Generic/PieChart";
import BarChart from "../visualizations/Generic/BarChart";
import LenkeVisualizationWrapper from "../visualizations/Lenke/LenkeVisualizationWrapper";
import { Visualization } from "job-market-visuals";
import ComparisonPageVisualization from "../ui/ComparisonPageVisualization";


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
    title: "Arbeidsmarked",
    description: TranslateString("Andre like yrker"),
    widget_id: "arbeidsmarkedUtdanning",
    path: "/rest/utdanning2yrke",
    render: (element: ArbeidsmarkedUtdanningElement[]) => {
      // return <Visualization unoId={element} direction="yrke2utdanning" limit={5} />
      return <ComparisonPageVisualization uno_id={element} direction="yrke2utdanning" />

    },
  },
  {
    title: "Utdanningsbakgrunn",
    description: TranslateString("Vanligste utdanningsbakgrunn for yrke"),
    widget_id: "arbeidsmarkedYrke",
    path: "/rest/yrke2utdanning",
    render: (element: ArbeidsmarkedYrkeElement[]) => {
      // return <Visualization
      //   unoId={element}
      //   limit={8}
      //   layout="bars"
      //   direction="yrke2utdanning"
      // />
      return <ComparisonPageVisualization uno_id={element} direction="yrke2utdanning" />
    },
  },
  {
    title: "Selvstendig næringsdrivende",
    widget_id: "entrepenorskap",
    path: "/rest/entrepenorskap",
    Component: EntreprenorskapWrapper,
  },
  {
    title: "Lenke",
    widget_id: "lenke",
    path: "/rest/main",
    Component: LenkeVisualizationWrapper,
  },
];
export default Yrke;
