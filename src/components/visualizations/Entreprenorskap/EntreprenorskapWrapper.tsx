import React, { Component } from "react";
import { ComparisonComponentProps } from "../../comparisonsConfig";
import { EntrepenorElement, Kjønn } from "../../../data/ApiTypes";
import NoData from "../Old/NoData";
import ComparisonRow from "../../pages/ComparisonPage/ComparisonRow";
import EntreprenorskapVisualization from "./EntreprenorskapVisualization";
import { Fullført, Visning } from "../Arbeidsledighet/ArbeidsledighetWrapper";
import Header from "../Shared/HeaderVisualizations";
import Translate from "../../app/Translate";

export type EntreprenorskapHeaderConfig = {
  Fullført: Fullført[];
  Visning: Visning;
};

class EntreprenorskapWrapper extends Component<
  ComparisonComponentProps<EntrepenorElement>,
  EntreprenorskapHeaderConfig
> {
  constructor(props: ComparisonComponentProps<EntrepenorElement>) {
    super(props);
    this.state = {
      Fullført: ["13", "710", "A"],
      Visning: "Andel",
    };
  }

  setConfig = (config: EntreprenorskapHeaderConfig) => {
    this.setState(config);
  };

  onFilterClicked = (event: any, key: string) => {
    var value = event.target.id;
    switch (key) {
      case "Fullført":
        this.setConfig({ ...this.state, Fullført: value });
        break;
      case "Visning":
        this.setConfig({ ...this.state, Visning: value });
        break;
      default:
        return;
    }
  };

  render() {
    const { data, uno_ids } = this.props;
    const config = this.state;
    if (!data || Object.keys(data).length === 0) return <NoData />;
    return (
      <div>
        <Header
          mainHeader={<Translate nb="Entreprenørskap" />}
          secondHeader={
            <Translate nb="Andel som har startet egen virksomhet" />
          }
        />
        <ComparisonRow>
          {uno_ids.map(uno_id => {
            const d = data[uno_id];
            if (!d) return <NoData key={uno_id} />;
            const code = Object.keys(d)[0];
            if (!code) return <NoData key={uno_id} />;

            return (
              <EntreprenorskapVisualization
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

export default EntreprenorskapWrapper;
