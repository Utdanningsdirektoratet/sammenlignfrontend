import React, { Component } from "react";
import { Kjønn } from "../../../data/ApiTypes";
import { KvartilInfo } from "./LonnVisualization";
import styles from "./LonnKvartilVisualization.module.scss";
import Translate from "../../app/Translate";
import { ReactComponent as Woman } from "../Generic/Woman.svg";
import { ReactComponent as Man } from "../Generic/Man.svg";
import { Tidsenhet } from "./VisualizationHeaderLonn";

type Props = {
  kjønn: Kjønn;
  low: KvartilInfo;
  mid: KvartilInfo;
  high: KvartilInfo;
  tidsenhet: Tidsenhet;
};

class LonnKvartilVisualization extends Component<Props> {
  render() {
    const { kjønn, tidsenhet, low, mid, high } = this.props;
    return (
      <div className={`${styles.container}`}>
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
              {!high["A"] ? (
                <Translate nb="ingen data" />
              ) : tidsenhet === "Ca. timelønn" ? (
                "ca " + (high["A"] as any).toLocaleString() + " kr"
              ) : (
                (high["A"] as any).toLocaleString() + " kr"
              )}
            </div>
          ) : (
            <div>
              <div className={`${styles.container_data_male}`}>
                {!high["M"] ? (
                  <Translate nb="ingen data" />
                ) : tidsenhet === "Ca. timelønn" ? (
                  "ca " + (high["M"] as any).toLocaleString() + " kr"
                ) : (
                  (high["M"] as any).toLocaleString() + " kr"
                )}
                <Man />
              </div>
              <div className={`${styles.container_data_female}`}>
                {!high["K"] ? (
                  <Translate nb="ingen data" />
                ) : tidsenhet === "Ca. timelønn" ? (
                  "ca " + (high["K"] as any).toLocaleString() + " kr"
                ) : (
                  (high["K"] as any).toLocaleString() + " kr"
                )}
                <div className={`${styles.container_data_female_icon}`}>
                  <Woman />
                </div>
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
              {!mid["A"] ? (
                <Translate nb="ingen data" />
              ) : tidsenhet === "Ca. timelønn" ? (
                "ca " + (mid["A"] as any).toLocaleString() + " kr"
              ) : (
                (mid["A"] as any).toLocaleString() + " kr"
              )}
            </div>
          ) : (
            <div>
              <div className={`${styles.container_data_male}`}>
                {!mid["M"] ? (
                  <Translate nb="ingen data" />
                ) : tidsenhet === "Ca. timelønn" ? (
                  "ca " + (mid["M"] as any).toLocaleString() + " kr"
                ) : (
                  (mid["M"] as any).toLocaleString() + " kr"
                )}
                <Man />
              </div>
              <div className={`${styles.container_data_female}`}>
                {!mid["K"] ? (
                  <Translate nb="ingen data" />
                ) : tidsenhet === "Ca. timelønn" ? (
                  "ca " + (mid["K"] as any).toLocaleString() + " kr"
                ) : (
                  (mid["K"] as any).toLocaleString() + " kr"
                )}
                <div className={`${styles.container_data_female_icon}`}>
                  <Woman />
                </div>
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
              {!low["A"] ? (
                <Translate nb="ingen data" />
              ) : tidsenhet === "Ca. timelønn" ? (
                "ca " + (low["A"] as any).toLocaleString() + " kr"
              ) : (
                (low["A"] as any).toLocaleString() + " kr"
              )}
            </div>
          ) : (
            <div>
              <div className={`${styles.container_data_male}`}>
                {!low["M"] ? (
                  <Translate nb="ingen data" />
                ) : tidsenhet === "Ca. timelønn" ? (
                  "ca " + (low["M"] as any).toLocaleString() + " kr"
                ) : (
                  (low["M"] as any).toLocaleString() + " kr"
                )}
                <Man />
              </div>
              <div className={`${styles.container_data_female}`}>
                {!low["K"] ? (
                  <Translate nb="ingen data" />
                ) : tidsenhet === "Ca. timelønn" ? (
                  "ca " + (low["K"] as any).toLocaleString() + " kr"
                ) : (
                  (low["K"] as any).toLocaleString() + " kr"
                )}
                <div className={`${styles.container_data_female_icon}`}>
                  <Woman />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default LonnKvartilVisualization;
