import React, { Component } from "react";
import { ArbeidsledighetElement } from "../../../data/ApiTypes";
import ArbeidsledighetVisualization from "./ArbeidsledighetVisualization";
import NoData from "../Old/NoData";
import { ComparisonComponentProps } from "../../comparisonsConfig";
import ComparisonRow from "../../pages/ComparisonPage/ComparisonRow";
import Translate from "../../app/Translate";
import Header from "../Shared/HeaderVisualizations";

export type VisualizationHeaderConfigArbeidsledighet = {
  Fullført: Fullført[];
  Visning: Visning;
};
export type Fullført = "710" | "13" | "A";
export type Visning = "Andel" | "Antall";

class ArbeidsledighetWrapper extends React.Component<
  ComparisonComponentProps<ArbeidsledighetElement>,
  VisualizationHeaderConfigArbeidsledighet
> {
  setConfig = (config: VisualizationHeaderConfigArbeidsledighet) => {
    this.setState(config);
  };
  state: VisualizationHeaderConfigArbeidsledighet = {
    Fullført: ["13", "710", "A"],
    Visning: "Andel",
  };

  onFilterClicked = (event: any, key: string) => {
    var value = event.target.id;
    switch (key) {
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
        <Header
          mainHeader={<Translate nb="Ledighet" />}
          secondHeader={
            <Translate nb="Andel som er registrert som arbeidsledige" />
          }
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
