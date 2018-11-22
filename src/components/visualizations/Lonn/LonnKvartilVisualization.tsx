import React, { Component } from "react";
import { Kjønn } from "../../../data/ApiTypes";
import { KvartilInfo } from "./LonnVisualization";

import ColumnChart from "../Generic/ColumnChart";
import styles from "./LonnKvartilVisualization.module.scss";

type Props = {
  kjønn: Kjønn;
  q1: KvartilInfo;
  median: KvartilInfo;
  q3: KvartilInfo;
};

class LonnKvartilVisualization extends Component<Props> {
  render() {
    const { kjønn, q1, median, q3 } = this.props;
    return (
      <div className={styles.container_data}>
        <div
          className={
            kjønn === "A"
              ? styles.container_data_q3_A
              : styles.container_data_q3
          }
        >
          <div className={styles.container_data_header}>Høy kvart</div>
          {kjønn === "A" ? (
            <div>{!q3["A"] ? "(ingen data)" : q3["A"]}</div>
          ) : (
            <div>
              <div className={styles.container_data_male}>
                {!q3["M"] ? "(ingen data)" : q3["M"]}
              </div>
              <div className={styles.container_data_female}>
                {!q3["K"] ? "(ingen data)" : q3["K"]}
              </div>
            </div>
          )}
        </div>
        <div
          className={
            kjønn === "A"
              ? styles.container_data_median_A
              : styles.container_data_median
          }
        >
          <div className={styles.container_data_header}>Median</div>
          {kjønn === "A" ? (
            <div>{!median["A"] ? "(ingen data)" : median["A"]}</div>
          ) : (
            <div>
              <div className={styles.container_data_male}>
                {!median["M"] ? "(ingen data)" : median["M"]}
              </div>
              <div className={styles.container_data_female}>
                {!median["K"] ? "(ingen data)" : median["K"]}
              </div>
            </div>
          )}
        </div>
        <div className={styles.container_data_q1}>
          <div className={styles.container_data_header}>Lav kvart</div>
          {kjønn === "A" ? (
            <div>{!q1["A"] ? "(ingen data)" : q1["A"]}</div>
          ) : (
            <div>
              <div className={styles.container_data_male}>
                {!q1["M"] ? "(ingen data)" : q1["M"]}
              </div>
              <div className={styles.container_data_female}>
                {!q1["K"] ? "(ingen data)" : q1["K"]}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default LonnKvartilVisualization;
