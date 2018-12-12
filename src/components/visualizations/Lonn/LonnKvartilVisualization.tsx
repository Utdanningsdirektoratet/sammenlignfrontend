import React, { Component } from "react";
import { Kjønn } from "../../../data/ApiTypes";
import { KvartilInfo } from "./LonnVisualization";
import styles from "./LonnKvartilVisualization.module.scss";
import Translate from "../../app/Translate";
import { ReactComponent as Woman } from "../Generic/Woman.svg";
import { ReactComponent as Man } from "../Generic/Man.svg";
import { Tidsenhet } from "./VisualizationHeaderLonn";
import { getNumberWithProperSpacing } from "../../../util/NumberWithThousandSpacing";

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
                "ca " + getNumberWithProperSpacing(high["A"]) + " kr"
              ) : (
                getNumberWithProperSpacing(high["A"]) + " kr"
              )}
            </div>
          ) : (
            <div>
              <div className={`${styles.container_data_male}`}>
                {!high["M"] ? (
                  <Translate nb="ingen data" />
                ) : tidsenhet === "Ca. timelønn" ? (
                  "ca " + getNumberWithProperSpacing(high["M"]) + " kr"
                ) : (
                  getNumberWithProperSpacing(high["M"]) + " kr"
                )}
                <Man />
              </div>
              <div className={`${styles.container_data_female}`}>
                {!high["K"] ? (
                  <Translate nb="ingen data" />
                ) : tidsenhet === "Ca. timelønn" ? (
                  "ca " + getNumberWithProperSpacing(high["K"]) + " kr"
                ) : (
                  getNumberWithProperSpacing(high["K"]) + " kr"
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
                "ca " + getNumberWithProperSpacing(mid["A"]) + " kr"
              ) : (
                getNumberWithProperSpacing(mid["A"]) + " kr"
              )}
            </div>
          ) : (
            <div>
              <div className={`${styles.container_data_male}`}>
                {!mid["M"] ? (
                  <Translate nb="ingen data" />
                ) : tidsenhet === "Ca. timelønn" ? (
                  "ca " + getNumberWithProperSpacing(mid["M"]) + " kr"
                ) : (
                  getNumberWithProperSpacing(mid["M"]) + " kr"
                )}
                <Man />
              </div>
              <div className={`${styles.container_data_female}`}>
                {!mid["K"] ? (
                  <Translate nb="ingen data" />
                ) : tidsenhet === "Ca. timelønn" ? (
                  "ca " + getNumberWithProperSpacing(mid["K"]) + " kr"
                ) : (
                  getNumberWithProperSpacing(mid["K"]) + " kr"
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
                "ca " + getNumberWithProperSpacing(low["A"]) + " kr"
              ) : (
                getNumberWithProperSpacing(low["A"]) + " kr"
              )}
            </div>
          ) : (
            <div>
              <div className={`${styles.container_data_male}`}>
                {!low["M"] ? (
                  <Translate nb="ingen data" />
                ) : tidsenhet === "Ca. timelønn" ? (
                  "ca " + getNumberWithProperSpacing(low["M"]) + " kr"
                ) : (
                  getNumberWithProperSpacing(low["M"]) + " kr"
                )}
                <Man />
              </div>
              <div className={`${styles.container_data_female}`}>
                {!low["K"] ? (
                  <Translate nb="ingen data" />
                ) : tidsenhet === "Ca. timelønn" ? (
                  "ca " + getNumberWithProperSpacing(low["K"]) + " kr"
                ) : (
                  getNumberWithProperSpacing(low["K"]) + " kr"
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
