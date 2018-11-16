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

    return (
      <div>
        {sektorData.map(s => {
          if (!lonn[s]) return <NoData key={s} />;
          return (
            <LonnVisualization
              data={lonn[s]}
              arbeidstid={config.Arbeidstid}
              kjønn={config.Kjønn}
              lønn={config.Lønn}
              statistiskMål={config.StatistiskMål}
              tidsenhet={config.Tidsenhet}
            />
          );
        })}
      </div>
    );
  }
}

export default LonnWrapper;
