import React from "react";

import { StatistiskMål, Lønn, Tidsenhet } from "./VisualizationHeaderLonn";
import { LonnObject, Kjønn } from "../../../data/ApiTypes";
import NoData from "../Old/NoData";
import visualizationstyles from "../Visualization.module.scss";
import { ReactComponent as Female } from "../../../fontawesome/solid/female.svg";
import { ReactComponent as Male } from "../../../fontawesome/solid/male.svg";
import styles from "./LonnVisualization.module.scss";
import Translate from "../../app/Translate";

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
          key = <Female />;
          break;
        case "M":
          key = <Male />;
          break;
        case "A":
          key = (
            <div>
              <Female />
              <Male />
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
                {d.value === null ? (
                  <Translate nb="Ingen data" nn="nynorsk" />
                ) : (
                  d.value + " kr"
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default LonnVisualization;
