import React, { Component } from "react";
import styles from "./ColumnChart.module.scss";
import { Kjønn } from "../../../data/ApiTypes";
import { KvartilInfo } from "../Lonn/LonnVisualization";
import { ReactComponent as Woman } from "../Generic/Woman.svg";
import { ReactComponent as Man } from "../Generic/Man.svg";

import MaleFemaleBarChart from "./MaleFemaleBarChart";
import SingleBarChart from "./SingleBarChart";
import { number } from "prop-types";

type Props = {
  kjønn: Kjønn;
  low?: KvartilInfo;
  mid?: KvartilInfo;
  high?: KvartilInfo;
  max: number;
};
type KvartilKjønn = "M" | "K" | "A";

function numberOrZero(kjønn: KvartilKjønn, kvartInfo?: KvartilInfo) {
  if (!kvartInfo) return 0;
  const value = kvartInfo[kjønn];
  if (!value) return 0;
  if (typeof value === "number") {
    return value;
  }
  return parseFloat(value);
}

class ColumnChart extends Component<Props> {
  render() {
    const { kjønn, low, mid, high, max } = this.props;
    return (
      <div className={`${styles.columnchart}`}>
        {kjønn === "A" ? (
          <div className={`${styles.columnchart_container}`}>
            <SingleBarChart
              max={max}
              data={{
                top: numberOrZero("A", high),
                middle: numberOrZero("A", mid),
                bottom: numberOrZero("A", low),
              }}
            />
          </div>
        ) : (
          <div className={`${styles.columnchart_container}`}>
            <MaleFemaleBarChart
              max={max}
              male={{
                top: numberOrZero("M", high),
                middle: numberOrZero("M", mid),
                bottom: numberOrZero("M", low),
              }}
              female={{
                top: numberOrZero("K", high),
                middle: numberOrZero("K", mid),
                bottom: numberOrZero("K", low),
              }}
            />
          </div>
        )}
      </div>
    );
  }
}

export default ColumnChart;
