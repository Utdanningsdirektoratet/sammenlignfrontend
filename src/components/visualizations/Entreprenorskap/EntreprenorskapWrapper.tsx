import React, { Component } from "react";
import { ComparisonComponentProps } from "../../comparisonsConfig";
import { EntrepenorElement } from "../../../data/ApiTypes";
import { EntreprenorskapHeaderConfig } from "./EntreprenorskapHeaderFilters";
import NoData from "../Old/NoData";
import ComparisonRow from "../../pages/ComparisonPage/ComparisonRow";
import EntreprenorskapVisualization from "./EntreprenorskapVisualization";
import VisualizationHeaderEntreprenorskap from "./VisualizationHeaderEntreprenorskap";
import EntreprenorskapHeaderDesktop from "./EntreprenorskapHeaderDekstop";

class EntreprenorskapWrapper extends Component<
  ComparisonComponentProps<EntrepenorElement>,
  EntreprenorskapHeaderConfig
> {
  constructor(props: ComparisonComponentProps<EntrepenorElement>) {
    super(props);
    this.state = {
      Kjønn: "A",
      Fullført: "A",
      Visning: "Andel",
    };
  }

  setConfig = (config: EntreprenorskapHeaderConfig) => {
    this.setState(config);
  };

  onFilterClicked = (event: any, key: string) => {
    var value = event.target.id;
    switch (key) {
      case "Kjønn":
        this.setConfig({ ...this.state, Kjønn: value });
        break;
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
        <VisualizationHeaderEntreprenorskap
          config={this.state}
          onFilterClicked={this.onFilterClicked}
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
                kjønn={config.Kjønn}
                fullført={config.Fullført}
                visning={config.Visning}
              />
            );
          })}
        </ComparisonRow>
        <EntreprenorskapHeaderDesktop
          config={this.state}
          onFilterClicked={this.onFilterClicked}
        />
      </div>
    );
  }
}

export default EntreprenorskapWrapper;
