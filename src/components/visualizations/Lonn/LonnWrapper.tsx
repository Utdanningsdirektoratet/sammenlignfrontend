import React from "react";
import { LonnElement, Sektor, Arbeidstid, Kjønn } from "../../../data/ApiTypes";
import { VisualizationHeaderConfigLonn } from "./VisualizationHeaderLonn";
import NoData from "../Old/NoData";
import LonnVisualization from "./LonnVisualization";

type Props = { data: LonnElement; config: VisualizationHeaderConfigLonn };

class LonnWrapper extends React.Component<Props> {
  render() {
    const { data, config } = this.props;
    const lonn = data[Object.keys(data)[0]];
    if (!data || Object.keys(data).length === 0) return null;

    let sektorData: Sektor[] =
      config.Sektor.length > 0 ? config.Sektor : ["A", "S", "P", "K"];
    let arbeidstidData: Arbeidstid[] =
      config.Arbeidstid.length > 0 ? config.Arbeidstid : ["A", "H", "D"];
    let kjønnData: Kjønn[] =
      config.Kjønn.length > 0 ? config.Kjønn : ["A", "K", "M"];

    return (
      <div>
        {sektorData.map(s => {
          if (!lonn[s]) return <NoData key={s} />;
          return arbeidstidData.map(a => {
            if (!lonn[s][a]) return <NoData key={s + a} />;
            return (
              <LonnVisualization
                data={lonn[s][a]}
                kjønn={kjønnData}
                lønn={config.Lønn}
                statistiskMål={config.StatistiskMål}
                tidsenhet={config.Tidsenhet}
              />
            );
          });
        })}
      </div>
    );
  }
}

export default LonnWrapper;
