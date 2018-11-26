import React, { Component } from "react";
import { Kjønn } from "../../../data/ApiTypes";
import { KvartilInfo } from "./LonnVisualization";
import styles from "./LonnKvartilVisualization.module.scss";
import { ReactComponent as Female } from "../../../fontawesome/solid/female.svg";
import { ReactComponent as Male } from "../../../fontawesome/solid/male.svg";
import Translate from "../../app/Translate";

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
      <div>
        <div
          className={
            kjønn === "A"
              ? styles.container_data_q3_A
              : styles.container_data_q3
          }
        >
          <div className={`${styles.container_data_header}`}>
            <Translate nb="Høy kvart" />
          </div>
          {kjønn === "A" ? (
            <div className={`${styles.container_data_text}`}>
              {!high["A"] ? <Translate nb="(ingen data)" /> : high["A"]}
            </div>
          ) : (
            <div>
              <div className={`${styles.container_data_male}`}>
                {!high["M"] ? <Translate nb="(ingen data)" /> : high["M"]}
                <Male />
              </div>
              <div className={`${styles.container_data_female}`}>
                {!high["K"] ? <Translate nb="(ingen data)" /> : high["K"]}
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
          <div className={`${styles.container_data_header}`}>
            <Translate nb="Median" />
          </div>
          {kjønn === "A" ? (
            <div className={`${styles.container_data_text}`}>
              {!mid["A"] ? <Translate nb="(ingen data)" /> : mid["A"]}
            </div>
          ) : (
            <div>
              <div className={`${styles.container_data_male}`}>
                {!mid["M"] ? <Translate nb="(ingen data)" /> : mid["M"]}
                <Male />
              </div>
              <div className={`${styles.container_data_female}`}>
                {!mid["K"] ? <Translate nb="(ingen data)" /> : mid["K"]}
                <Female />
              </div>
            </div>
          )}
        </div>
        <div>
          <div className={`${styles.container_data_header}`}>
            <Translate nb="Lav kvart" />
          </div>
          {kjønn === "A" ? (
            <div className={`${styles.container_data_text}`}>
              {!low["A"] ? <Translate nb="(ingen data)" /> : low["A"]}
            </div>
          ) : (
            <div>
              <div className={`${styles.container_data_male}`}>
                {!low["M"] ? <Translate nb="(ingen data)" /> : low["M"]}
                <Male />
              </div>
              <div className={`${styles.container_data_female}`}>
                {!low["K"] ? <Translate nb="(ingen data)" /> : low["K"]}
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
