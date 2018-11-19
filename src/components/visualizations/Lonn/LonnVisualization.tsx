import React from "react";

import { StatistiskMål, Lønn, Tidsenhet } from "./VisualizationHeaderLonn";
import { Kjønn, IArbeidstid, Arbeidstid } from "../../../data/ApiTypes";
import NoData from "../Old/NoData";
import visualizationstyles from "../Visualization.module.scss";
import { ReactComponent as Female } from "../../../fontawesome/solid/female.svg";
import { ReactComponent as Male } from "../../../fontawesome/solid/male.svg";
import styles from "./LonnVisualization.module.scss";
import Translate from "../../app/Translate";
import Arbeidsledighet from "../Old/Arbeidsledighet";

type Props = {
  data: IArbeidstid;
  arbeidstid: Arbeidstid;
  kjønn: Kjønn;
  statistiskMål: StatistiskMål;
  lønn: Lønn;
  tidsenhet: Tidsenhet;
};

class LonnVisualization extends React.Component<Props> {
  getDataQuery = (kjønn: string) => {
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
    if (!(this.props.data as any)[this.props.arbeidstid]) return null;
    if (!(this.props.data as any)[this.props.arbeidstid][wage]) return null;
    let wageCalc = (this.props.data as any)[this.props.arbeidstid][
      wage
    ] as number;
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
    let data = null;
    if (kjønn === "A") {
      data = this.calcWageTimeUnit(this.getDataQuery(kjønn));
      if (data === null) return <NoData />;
      return (
        <div className={visualizationstyles.visualization_container}>
          <div className={styles.lonnVisualization_kjonn}>
            <div className={styles.lonnVisualization_kjonn_text}>
              {data + " kr"}
            </div>
          </div>
        </div>
      );
    } else {
      let kvinner = this.calcWageTimeUnit(this.getDataQuery("K"));
      let menn = this.calcWageTimeUnit(this.getDataQuery("M"));

      if (kvinner === null && menn === null) return <NoData />;
      return (
        <div className={visualizationstyles.visualization_container}>
          <div className={styles.lonnVisualization_kjonn}>
            <div className={styles.lonnVisualization_kjonn_icon}>
              <Female />
            </div>
            <div className={styles.lonnVisualization_kjonn_text}>
              {kvinner === null ? (
                <Translate nb="Ingen data" nn="nynorsk" />
              ) : (
                kvinner + " kr"
              )}
            </div>
          </div>
          <div className={styles.lonnVisualization_kjonn}>
            <div className={styles.lonnVisualization_kjonn_icon}>
              <Male />
            </div>
            <div className={styles.lonnVisualization_kjonn_text}>
              {menn === null ? (
                <Translate nb="Ingen data" nn="nynorsk" />
              ) : (
                menn + " kr"
              )}
            </div>
          </div>
        </div>
      );
    }
  }
}

export default LonnVisualization;
