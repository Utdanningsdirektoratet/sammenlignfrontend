import React, { Component } from "react";

import { StatistiskMål, Lønn, Tidsenhet } from "./VisualizationHeaderLonn";
import { Kjønn, IArbeidstid, Arbeidstid } from "../../../data/ApiTypes";
import NoData from "../Old/NoData";
import visualizationstyles from "../Visualization.module.scss";
import styles from "./LonnVisualization.module.scss";
import Translate from "../../app/Translate";
import LonnKvartilVisualization from "./LonnKvartilVisualization";
import ColumnChart from "../Generic/ColumnChart";
import { ReactComponent as Woman } from "../Generic/Woman.svg";
import { ReactComponent as Man } from "../Generic/Man.svg";
import { getNumberWithProperSpacing } from "../../../util/NumberWithThousandSpacing";

type Props = {
  data: IArbeidstid;
  arbeidstid: Arbeidstid;
  kjønn: Kjønn;
  statistiskMål: StatistiskMål;
  lønn: Lønn;
  tidsenhet: Tidsenhet;
  maxValue: number;
  showGraphics: boolean;
};

export type KvartilInfo = { [key: string]: string | number | null };

class LonnVisualization extends Component<Props> {
  getDataQuery = (kjønn: string, kvartil?: "q1" | "q3" | "median") => {
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

  getTimeUnit = (wage: string) => {
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
        wageCalc = wageCalc / 162.5;
    }
    return wageCalc;
  };

  calcWageTimeUnit = (wage: string, notLocale?: boolean) => {
    if (!(this.props.data as any)[this.props.arbeidstid]) return null;
    if (
      !(this.props.data as any)[this.props.arbeidstid][wage] &&
      this.props.lønn !== "Med overtid"
    )
      return null;
    let wageCalc = (this.props.data as any)[this.props.arbeidstid][wage]
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

  render() {
    const {
      kjønn,
      statistiskMål,
      maxValue,
      showGraphics,
      tidsenhet,
    } = this.props;
    let data = null;

    if (statistiskMål === "Median og kvartiler") {
      let q1: KvartilInfo = {};
      let median: KvartilInfo = {};
      let q3: KvartilInfo = {};
      if (kjønn === "A") {
        q1[kjønn] = this.calcWageTimeUnit(this.getDataQuery(kjønn, "q1"), true);
        median[kjønn] = this.calcWageTimeUnit(
          this.getDataQuery(kjønn, "median"),
          true
        );
        q3[kjønn] = this.calcWageTimeUnit(this.getDataQuery(kjønn, "q3"), true);

        if (!q1[kjønn] && !median[kjønn] && !q3[kjønn]) return <NoData />;
      } else {
        q1["K"] = this.calcWageTimeUnit(this.getDataQuery("K", "q1"), true);
        q1["M"] = this.calcWageTimeUnit(this.getDataQuery("M", "q1"), true);
        median["K"] = this.calcWageTimeUnit(
          this.getDataQuery("K", "median"),
          true
        );
        median["M"] = this.calcWageTimeUnit(
          this.getDataQuery("M", "median"),
          true
        );
        q3["K"] = this.calcWageTimeUnit(this.getDataQuery("K", "q3"), true);
        q3["M"] = this.calcWageTimeUnit(this.getDataQuery("M", "q3"), true);

        if (
          !q1["K"] &&
          !q1["M"] &&
          !median["K"] &&
          !median["M"] &&
          !q3["K"] &&
          !q3["M"]
        )
          return <NoData />;
      }

      return (
        <div
          className={`${visualizationstyles.visualization_container} ${
            styles.container
            }`}
        >
          {showGraphics ? (
            <ColumnChart
              kjønn={kjønn}
              low={q1}
              mid={median}
              high={q3}
              max={maxValue}
            />
          ) : null}
          <LonnKvartilVisualization
            kjønn={kjønn}
            low={q1}
            mid={median}
            high={q3}
            tidsenhet={tidsenhet}
          />
        </div>
      );
    }

    if (kjønn === "A") {
      data = this.calcWageTimeUnit(this.getDataQuery(kjønn));
      if (data === null) return <NoData />;
      return (
        <div
          className={`${visualizationstyles.visualization_container} ${
            styles.container
            }`}
        >
          {showGraphics ? (
            <ColumnChart
              kjønn={kjønn}
              mid={{ A: this.calcWageTimeUnit(this.getDataQuery(kjønn), true) }}
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
    } else {
      let kvinner = this.calcWageTimeUnit(this.getDataQuery("K"));
      let menn = this.calcWageTimeUnit(this.getDataQuery("M"));

      if (kvinner === null && menn === null) return <NoData />;
      return (
        <div
          className={`${visualizationstyles.visualization_container} ${
            styles.container
            }`}
        >
          {showGraphics ? (
            <ColumnChart
              kjønn={kjønn}
              mid={{
                K: this.calcWageTimeUnit(this.getDataQuery("K"), true),
                M: this.calcWageTimeUnit(this.getDataQuery("M"), true),
              }}
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
              <div className={styles.lonnVisualization_kjonn_text_kjønn}>
                <div className={`${styles.lonnVisualization_kjonn_text_M}`}>
                  {menn === null ? (
                    <Translate nb="Ingen data" />
                  ) : tidsenhet === "Ca. timelønn" ? (
                    "ca " + menn + " kr"
                  ) : (
                        menn + " kr"
                      )}
                  <div>
                    <Man />
                  </div>
                </div>
                <div className={`${styles.lonnVisualization_kjonn_text_K}`}>
                  {kvinner === null ? (
                    <Translate nb="Ingen data" />
                  ) : tidsenhet === "Ca. timelønn" ? (
                    "ca " + kvinner + " kr"
                  ) : (
                        kvinner + " kr"
                      )}
                  <div
                    className={`${
                      styles.lonnVisualization_kjonn_text_K_iconContainer
                      }`}
                  >
                    <Woman />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default LonnVisualization;
