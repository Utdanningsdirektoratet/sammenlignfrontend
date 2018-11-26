import React, { Component } from "react";
import { Kjønn } from "../../../data/ApiTypes";
import { KvartilInfo } from "./LonnVisualization";
import styles from "./LonnKvartilVisualization.module.scss";
import { ReactComponent as Female } from "../../../fontawesome/solid/female.svg";
import { ReactComponent as Male } from "../../../fontawesome/solid/male.svg";

type Props = {
  kjønn: Kjønn;
  low: KvartilInfo;
  mid: KvartilInfo;
  high: KvartilInfo;
};

class LonnKvartilVisualization extends Component<Props> {
  render() {
    const { kjønn, low, mid, high } = this.props;
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
            <div className={styles.container_data_text}>
              {!high["A"] ? "(ingen data)" : high["A"]}
            </div>
          ) : (
            <div>
              <div className={styles.container_data_male}>
                {!high["M"] ? "(ingen data)" : high["M"]}
                <Male />
              </div>
              <div className={styles.container_data_female}>
                {!high["K"] ? "(ingen data)" : high["K"]}
                <Female />
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
            <div className={styles.container_data_text}>
              {!mid["A"] ? "(ingen data)" : mid["A"]}
            </div>
          ) : (
            <div>
              <div className={styles.container_data_male}>
                {!mid["M"] ? "(ingen data)" : mid["M"]}
                <Male />
              </div>
              <div className={styles.container_data_female}>
                {!mid["K"] ? "(ingen data)" : mid["K"]}
                <Female />
              </div>
            </div>
          )}
        </div>
        <div className={styles.container_data_q1}>
          <div className={styles.container_data_header}>Lav kvart</div>
          {kjønn === "A" ? (
            <div className={styles.container_data_text}>
              {!low["A"] ? "(ingen data)" : low["A"]}
            </div>
          ) : (
            <div>
              <div className={styles.container_data_male}>
                {!low["M"] ? "(ingen data)" : low["M"]}
                <Male />
              </div>
              <div className={styles.container_data_female}>
                {!low["K"] ? "(ingen data)" : low["K"]}
                <Female />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default LonnKvartilVisualization;
