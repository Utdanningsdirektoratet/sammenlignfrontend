import React from "react";

import { SammenligningTemplate } from "./index";
import { MainElement, LonnElement } from "../../data/ApiTypes";
import VisualizationHeaderLonn, {
  VisualizationHeaderConfigLønn,
} from "../pages/ComparisonPage/VisualizationHeaderLonn";

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
    HeaderComponent: VisualizationHeaderLonn,
    query: { sektor: "A" },
    render: (data: LonnElement, config: VisualizationHeaderConfigLønn) => (
      <div>
        {Object.keys(data).map(key => {
          const lonn = data[key];
          return <div>{config.Kjønn}</div>;
        })}
      </div>
    ),
  },
  {
    title: "Arbeidsledighet",
    widget_id: "arbeidsledighet",
    path: "/rest/main",
    render: (data: MainElement) => (
      <>
        <span>{data.funksjon}</span>
      </>
    ),
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
export default Yrke;
