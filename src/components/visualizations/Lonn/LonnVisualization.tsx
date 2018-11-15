import React from "react";

import {
  StatistiskMål,
  Lønn,
  Tidsenhet,
} from "../../pages/ComparisonPage/Headers/VisualizationHeaderLonn";
import { LonnObject, Kjønn } from "../../../data/ApiTypes";
import NoData from "../Old/NoData";
import visualizationstyles from "../Visualization.module.scss";
import { ReactComponent as Smiley } from "../Generic/Smiley.svg";
import { ReactComponent as Mustache } from "../Generic/Mustache.svg";
import styles from "./LonnVisualization.module.scss";

type Props = {
  data: LonnObject;
  kjønn: Kjønn[];
  statistiskMål: StatistiskMål;
  lønn: Lønn;
  tidsenhet: Tidsenhet;
};

class LonnVisualization extends React.Component<Props> {
  getDataQuery = (kjønn: Kjønn) => {
    let wage = kjønn + "_wage";

    switch (this.props.lønn) {
      case "Brutto":
        break;
      case "Med overtid":
        wage += "_overtime";
        break;
    }

    switch (this.props.statistiskMål) {
      case "Median":
        wage += "_median";
        break;
      case "Gjennomsnitt":
        wage += "_avg";
        break;
    }
    return wage;
  };

  calcWageTimeUnit = (wage: string) => {
    if (!(this.props.data as any)[wage]) return null;
    let wageCalc = (this.props.data as any)[wage] as number;
    switch (this.props.tidsenhet) {
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
    const { kjønn } = this.props;
    let dom: any[] = [];
    kjønn.map(k => {
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
                {kjønn.length > 1 ? d.key : ""}
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
