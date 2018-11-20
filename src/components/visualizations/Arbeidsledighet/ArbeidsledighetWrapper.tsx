import React from "react";
import { ArbeidsledighetElement } from "../../../data/ApiTypes";
import VisualizationHeaderArbeidsledighet, {
  VisualizationHeaderConfigArbeidsledighet,
} from "../Arbeidsledighet/VisualizationHeaderArbeidsledighet";
import ArbeidsledighetVisualization from "./ArbeidsledighetVisualization";
import NoData from "../Old/NoData";
import { ComparisonComponentProps } from "../../comparisonsConfig";
import ComparisonRow from "../../pages/ComparisonPage/ComparisonRow";

class ArbeidsledighetWrapper extends React.Component<
  ComparisonComponentProps<ArbeidsledighetElement>,
  VisualizationHeaderConfigArbeidsledighet
> {
  setConfig = (config: VisualizationHeaderConfigArbeidsledighet) => {
    this.setState(config);
  };
  state: VisualizationHeaderConfigArbeidsledighet = {
    Kjønn: "A",
    Fullført: ["A"],
    Visning: "Andel",
  };
  render() {
    const { data, uno_ids, template } = this.props;
    const config = this.state;
    if (!data || Object.keys(data).length === 0) return <NoData />;

    return (
      <div>
        <VisualizationHeaderArbeidsledighet
          setConfig={this.setConfig}
          config={this.state}
          comparison={this.props.template}
        />
        <ComparisonRow>
          {uno_ids.map(uno_id => {
            const d = data[uno_id];
            if (!d) return <NoData key={uno_id} />;
            const code = Object.keys(d)[0];
            if (!code) return <NoData key={uno_id} />;

            return (
              <ArbeidsledighetVisualization
                key={uno_id}
                data={d[code]}
                kjønn={config.Kjønn}
                fullført={config.Fullført}
                visning={config.Visning}
              />
            );
          })}
        </ComparisonRow>
      </div>
    );
  }
}

export default ArbeidsledighetWrapper;
