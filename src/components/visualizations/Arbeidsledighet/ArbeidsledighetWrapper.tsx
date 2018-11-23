import React, { Component } from "react";
import { ArbeidsledighetElement } from "../../../data/ApiTypes";
import VisualizationHeaderArbeidsledighet, {
  VisualizationHeaderConfigArbeidsledighet,
} from "../Arbeidsledighet/VisualizationHeaderArbeidsledighet";
import ArbeidsledighetVisualization from "./ArbeidsledighetVisualization";
import NoData from "../Old/NoData";
import { ComparisonComponentProps } from "../../comparisonsConfig";
import ComparisonRow from "../../pages/ComparisonPage/ComparisonRow";
import ArbeidsledighetHeaderFilterDesktop from "./ArbeidsledighetHeaderFilterDesktop";

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

  onFilterClicked = (event: any, key: string) => {
    var value = event.target.id;
    switch (key) {
      case "Kjønn":
        this.setConfig({ ...this.state, Kjønn: value });
        break;
      case "Arbeidsledighet":
        const index = this.state.Fullført.indexOf(value);
        if (index > -1) {
          this.setConfig({
            ...this.state,
            Fullført: this.state.Fullført.filter(f => f !== value),
          });
        } else {
          this.setConfig({
            ...this.state,
            Fullført: [...this.state.Fullført, value].sort(),
          });
        }

        break;
      case "Visning":
        let config = { ...this.state };
        config.Visning = value;
        this.setState(config);
        break;
      default:
        return;
    }
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
          onFilterClicked={this.onFilterClicked}
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
        <ArbeidsledighetHeaderFilterDesktop
          onFilterClicked={this.onFilterClicked}
          config={this.state}
        />
      </div>
    );
  }
}

export default ArbeidsledighetWrapper;
