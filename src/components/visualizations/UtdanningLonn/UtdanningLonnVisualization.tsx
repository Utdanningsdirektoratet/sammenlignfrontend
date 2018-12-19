import React, { Component } from "react";
import { IUtdanningFullført } from "../../../data/ApiTypes";
import {
  Tidsenhet,
  Lønn,
  StatistiskMål,
} from "../Lonn/VisualizationHeaderLonn";
import { FullførtUtdanning } from "./UtdanningLonnConfig";
import NoData from "../Old/NoData";
import visualizationstyles from "../Visualization.module.scss";
import styles from "../Lonn/LonnVisualization.module.scss";
import { KvartilInfo } from "../Lonn/LonnVisualization";
import ColumnChart from "../Generic/ColumnChart";
import LonnKvartilVisualization from "../Lonn/LonnKvartilVisualization";
import { getNumberWithProperSpacing } from "../../../util/NumberWithThousandSpacing";

type Props = {
  data: IUtdanningFullført;
  statistiskMål: StatistiskMål;
  lønn: Lønn;
  tidsenhet: Tidsenhet;
  fullført: FullførtUtdanning;
  maxValue: number;
  showGraphics: boolean;
  getFullførtString: (fullført: FullførtUtdanning) => string;
};

class UtdanningLonnVisualization extends Component<Props> {
  getDataQuery = (kvartil?: "q1" | "q3" | "median") => {
    let wage = "A_wage";

    switch (this.props.lønn) {
      case "Brutto":
        break;
      case "Med overtid":
        wage += "_avtalt";
        break;
    }

    switch (this.props.statistiskMål) {
      case "Median":
        wage += "_median";
        break;
      case "Gjennomsnitt":
        wage += "_avg";
        break;
      case "Median og kvartiler":
        if (!kvartil) {
          wage += "_median";
          break;
        }
        wage += "_" + kvartil;
        break;
    }
    return wage;
  };

  calcWageTimeUnit = (wage: string, notLocale?: boolean) => {
    let fullført = this.props.getFullførtString(this.props.fullført);
    if (!(this.props.data as any)[fullført]) return null;
    if (
      !(this.props.data as any)[fullført][wage] &&
      this.props.lønn !== "Med overtid"
    )
      return null;
    let wageCalc = (this.props.data as any)[fullført][wage]
      ? (this.getTimeUnit(wage) as number)
      : 0;

    if (this.props.lønn === "Med overtid") {
      let brutto = wage.replace("_overtime", "");
      let bruttoCalc = this.getTimeUnit(brutto);
      if (bruttoCalc === null) return null;
      wageCalc += bruttoCalc;
    }

    if (notLocale) return Math.round(wageCalc);
    return getNumberWithProperSpacing(Math.round(wageCalc));
  };

  getTimeUnit = (wage: string) => {
    let fullført = this.props.getFullførtString(this.props.fullført);
    if (!(this.props.data as any)[fullført][wage]) return null;

    let wageCalc = (this.props.data as any)[fullført][wage] as number;
    switch (this.props.tidsenhet) {
      case "Årlig":
        wageCalc *= 12;
        break;
      case "Månedlig":
        break;
      case "Ca. timelønn":
        wageCalc = wageCalc / 162.5;
    }
    return wageCalc;
  };

  numberOrZero(kvartInfo: string | number | null) {
    if (!kvartInfo) return 0;
    if (typeof kvartInfo === "number") {
      return kvartInfo;
    }
    return parseFloat(kvartInfo);
  }

  render() {
    const { statistiskMål, maxValue, showGraphics, tidsenhet } = this.props;
    let data = null;

    if (statistiskMål === "Median og kvartiler") {
      let q1: KvartilInfo = {};
      let median: KvartilInfo = {};
      let q3: KvartilInfo = {};
      q1["A"] = this.calcWageTimeUnit(this.getDataQuery("q1"), true);
      median["A"] = this.calcWageTimeUnit(this.getDataQuery("median"), true);
      q3["A"] = this.calcWageTimeUnit(this.getDataQuery("q3"), true);

      if (!q1["A"] && !median["A"] && !q3["A"]) return <NoData />;

      return (
        <div
          className={`${visualizationstyles.visualization_container} ${
            styles.container
          }`}
        >
          {showGraphics ? (
            <ColumnChart
              kjønn={"A"}
              low={q1}
              mid={median}
              high={q3}
              max={maxValue}
            />
          ) : null}
          <LonnKvartilVisualization
            kjønn={"A"}
            low={q1}
            mid={median}
            high={q3}
            tidsenhet={tidsenhet}
          />
        </div>
      );
    }

    data = this.calcWageTimeUnit(this.getDataQuery());
    if (data === null) return <NoData />;
    return (
      <div
        className={`${visualizationstyles.visualization_container} ${
          styles.container
        }`}
      >
        {showGraphics ? (
          <ColumnChart
            kjønn={"A"}
            mid={{ A: this.calcWageTimeUnit(this.getDataQuery(), true) }}
            max={maxValue}
          />
        ) : null}

        <div
          className={
            showGraphics
              ? styles.lonnVisualization_kjonncontainer
              : styles.lonnVisualization_kjonncontainer_nographics
          }
        >
          <div
            className={
              showGraphics
                ? styles.lonnVisualization_kjonn
                : styles.lonnVisualization_kjonn_nographics
            }
          >
            <div className={`${styles.lonnVisualization_kjonn_text}`}>
              {tidsenhet === "Ca. timelønn" ? "ca " : null}
              {data + " kr"}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UtdanningLonnVisualization;
