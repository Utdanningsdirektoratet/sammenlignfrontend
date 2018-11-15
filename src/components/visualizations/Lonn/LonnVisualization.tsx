import React from "react";

import {
  StatistiskMål,
  Lønn,
  Tidsenhet,
} from "../../pages/ComparisonPage/Headers/VisualizationHeaderLonn";
import { LonnObject, Kjønn } from "../../../data/ApiTypes";
import NoData from "../Old/NoData";
import visualizationstyles from "../Visualization.module.scss";
import { ReactComponent as Smiley } from "./Smiley.svg";
import { ReactComponent as Mustache } from "./Mustache.svg";
import styles from "./LonnVisualization.module.scss";

type LonnVisualizationData = {
  data: LonnObject;
  kjønn: Kjønn[];
  statistiskMål: StatistiskMål;
  lønn: Lønn;
  tidsenhet: Tidsenhet;
};

type Props = {
  data: LonnVisualizationData;
};

class LonnVisualization extends React.Component<Props> {
  getDataQuery = (kjønn: Kjønn) => {
    let wage = kjønn + "_wage";

    switch (this.props.data.lønn) {
      case "Brutto":
        break;
      case "Med overtid":
        wage = wage + "_overtime";
        break;
    }

    switch (this.props.data.statistiskMål) {
      case "Median":
        wage = wage + "_median";
        break;
      case "Gjennomsnitt":
        wage = wage + "_avg";
        break;
    }
    console.log(wage);
    return wage;
  };

  calcWageTimeUnit = (wage: string) => {
    if (!(this.props.data.data as any)[wage]) return null;
    let wageCalc = (this.props.data.data as any)[wage] as number;
    switch (this.props.data.tidsenhet) {
      case "Årlig":
        wageCalc *= 12;
        break;
      case "Månedlig":
        break;
      case "Ca. timelønn":
        wageCalc = wageCalc / 30 / 7.5;
    }

    return Math.round(wageCalc).toLocaleString();
  };

  render() {
    const { data } = this.props;
    let dom: any[] = [];
    data.kjønn.map(k => {
      let key = null;
      switch (k) {
        case "K":
          key = <Smiley />;
          break;
        case "M":
          key = <Mustache />;
          break;
        case "A":
          key = (
            <div>
              <Smiley />
              <Mustache />
            </div>
          );
          break;
      }
      dom.push({
        key: key,
        value: this.calcWageTimeUnit(this.getDataQuery(k)),
      });
    });
    if (
      dom.every(d => {
        return d.value === null;
      })
    )
      return <NoData />;
    return (
      <div className={visualizationstyles.visualization_container}>
        {dom.map(d => {
          return (
            <div className={styles.lonnVisualization_kjonn}>
              <div className={styles.lonnVisualization_kjonn_icon}>
                {data.kjønn.length > 1 ? d.key : ""}
              </div>
              <div className={styles.lonnVisualization_kjonn_text}>
                {d.value === null ? "Ingen data" : d.value + " kr"}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default LonnVisualization;
