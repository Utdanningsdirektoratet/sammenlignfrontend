import React, { Component } from "react";
import { ComparisonComponentProps } from "../../comparisonsConfig";
import { EntrepenorElement, Kjønn } from "../../../data/ApiTypes";
import NoData from "../Old/NoData";
import ComparisonRow from "../../pages/ComparisonPage/ComparisonRow";
import EntreprenorskapVisualization from "./EntreprenorskapVisualization";
import { Fullført, Visning } from "../Arbeidsledighet/ArbeidsledighetWrapper";
import Header from "../Shared/HeaderVisualizations";
import Translate from "../../app/Translate";
import CloseIcon from "../Generic/CloseIcon2";
import OpenIcon from "../Generic/OpenIcon";
import styles from "./EntreprenorskapVisualization.module.scss";

export type EntreprenorskapHeaderConfig = {
  Fullført: Fullført[];
  showValA: Fullført[];
  showVal: Fullført[];
  Visning: Visning;
  showAll: Boolean;
};

class EntreprenorskapWrapper extends Component<
  ComparisonComponentProps<EntrepenorElement>,
  EntreprenorskapHeaderConfig
  > {
  constructor(props: ComparisonComponentProps<EntrepenorElement>) {
    super(props);
    this.state = {
      Fullført: ["A"],
      showVal: ["A"],
      showValA: ["13", "710", "A"],
      Visning: "Andel",
      showAll: false,
    };
  }

  setConfig = (config: EntreprenorskapHeaderConfig) => {
    this.setState(config);
  };

  onFilterClicked = (event: any, key: string) => {
    var value = event.target.id;
    switch (key) {
      case "showAll":
        if (this.state.showAll)
          this.setConfig({ ...this.state, showAll: !this.state.showAll, Fullført: this.state.showVal })
        else
          this.setConfig({ ...this.state, showAll: !this.state.showAll, Fullført: this.state.showValA })
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
    let icon = this.state.showAll ? <CloseIcon /> : <OpenIcon />
    if (!data || Object.keys(data).length === 0) return <NoData />;
    return (
      <div>
        <Header
          mainHeader={<Translate nb="Selvstendig næringsdrivende" />}
          secondHeader={
            <Translate nb="Andel som har startet egen virksomhet" />
          }
        />
        <div className={`${styles.container_filter}`}>
          <div className={`${styles.container_filter_container}`}>
            <span className={`${styles.container_filter_container_text}`}>Vis nyutdannede</span>
            <div className={`${styles.container_filter_container_icon}`} onClick={() => this.onFilterClicked(event, "showAll")}>
              {icon}
            </div>
          </div>
        </div>
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
