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

// switch (widgetType) {
//   case "lønn": {
//     return <Lonn high={19300} low={14400} avg={16100} />;
//   }
//   case "arbeidsledig": {
//     return <Arbeidsledighet newly={38} tenyears={2} />;
//   }
//   case "vanligeyrker": {
//     return (
//       <VanligeYrkerYrke
//         yrker={[
//           { id: 1, title: "Fisker", percentage: 90, info: 12 },
//           { id: 2, title: "Fiskeopdretter", percentage: 45, info: 12 },
//           { id: 3, title: "Fiskehelsebiolog", percentage: 30, info: 12 },
//           {
//             id: 4,
//             title: "Fagarbeider sjømatproduksjon",
//             percentage: 25,
//             info: 12,
//           },
//           { id: 5, title: "Sjømathandler", percentage: 15, info: 12 },
//           { id: 6, title: "Fiskeforsker", percentage: 5, info: 12 },
//         ]}
//       />
//     );
//   }
//   case "stryk": {
//     return <Frafall value={20} />;
//   }
//   case "gjennomføringstid": {
//     return <Gjennomforingstid years={5} months={9} />;
//   }
//   case "tilfredshet": {
//     return <Jobbtilfredshet value={92} />;
//   }
//   default: {
//     return <NoData />;
//   }

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
export default Yrke;
