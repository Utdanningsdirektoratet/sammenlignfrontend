import React, { Component } from "react";
import styles from "./ColumnChart.module.scss";
import { Kjønn } from "../../../data/ApiTypes";
import { KvartilInfo } from "../Lonn/LonnVisualization";
import { ReactComponent as Female } from "../../../fontawesome/solid/female.svg";
import { ReactComponent as Male } from "../../../fontawesome/solid/male.svg";

type Props = {
  kjønn: Kjønn;
  q1: KvartilInfo;
  median: KvartilInfo;
  q3: KvartilInfo;
  max: number;
};

class ColumnChart extends Component<Props> {
  getPercentage = (num: any) => {
    if (!num || num === null) return null;
    let part = (num as number) / this.props.max;
    return part * 100;
  };

  getHighestPercentage = (kjønn: string) => {
    let percentages: number[] = [];
    var q3Percentage = this.getPercentage(this.props.q3[kjønn]);
    if (q3Percentage) percentages.push(q3Percentage);
    var medianPercentage = this.getPercentage(this.props.median[kjønn]);
    if (medianPercentage) percentages.push(medianPercentage);
    var q1Percentage = this.getPercentage(this.props.q1[kjønn]);
    if (q1Percentage) percentages.push(q1Percentage);

    percentages = percentages.sort((a, b) => b - a);
    return percentages[0] || 100;
  };

  render() {
    const { kjønn, q1, median, q3 } = this.props;
    return (
      <div>
        {kjønn === "A" ? (
          <div className={styles.columnchart_container}>
            <div
              className={styles.columnchart_container_A}
              style={{
                height: `${this.getHighestPercentage("A")}%`,
                paddingTop: `${
                  this.getHighestPercentage("A") === 100 ? 0 : 4
                }px`,
              }}
            >
              <span
                className={styles.columnchart_container_A_high}
                style={{
                  bottom: `${this.getPercentage(q3["A"])}%`,
                  transform: `translateY(${() => this.getPercentage(q3["A"])})`,
                  display: `${
                    this.getPercentage(q3["A"]) === null ? "none" : "block"
                  }`,
                }}
              />
              <span
                className={styles.columnchart_container_A_medium}
                style={{
                  bottom: `${this.getPercentage(median["A"])}%`,
                  transform: `translateY(${() =>
                    this.getPercentage(median["A"])})`,
                  display: `${
                    this.getPercentage(median["A"]) === null ? "none" : "block"
                  }`,
                }}
              />
              <span
                className={styles.columnchart_container_A_low}
                style={{
                  bottom: `${this.getPercentage(q1["A"])}%`,
                  transform: `translateY(${() => this.getPercentage(q1["A"])})`,
                  display: `${
                    this.getPercentage(q1["A"]) === null ? "none" : "block"
                  }`,
                }}
              />
            </div>
          </div>
        ) : (
          <div className={styles.columnchart_container}>
            <div
              className={styles.columnchart_container_M}
              style={{
                height: `${this.getHighestPercentage("M")}%`,
                paddingTop: `${
                  this.getHighestPercentage("M") === 100 ? 0 : 4
                }px`,
              }}
            >
              <span
                className={styles.columnchart_container_M_high}
                style={{
                  bottom: `${this.getPercentage(q3["M"])}%`,
                  transform: `translateY(${this.getPercentage(q3["M"])}%)`,
                  display: `${
                    this.getPercentage(q3["M"]) === null ? "none" : "block"
                  }`,
                }}
              />
              <span
                className={styles.columnchart_container_M_medium}
                style={{
                  bottom: `${this.getPercentage(median["M"])}%`,
                  transform: `translateY(${this.getPercentage(median["M"])}%)`,
                  display: `${
                    this.getPercentage(median["M"]) === null ? "none" : "block"
                  }`,
                }}
              />
              <span
                className={styles.columnchart_container_M_low}
                style={{
                  bottom: `${this.getPercentage(q1["M"])}%`,
                  transform: `translateY(${this.getPercentage(q1["M"])}%)`,
                  display: `${
                    this.getPercentage(q1["M"]) === null ? "none" : "block"
                  }`,
                }}
              />
              <span className={styles.columnchart_container_M_icon}>
                <Male />
              </span>
            </div>
            <div
              className={styles.columnchart_container_K}
              style={{
                height: `${this.getHighestPercentage("K")}%`,
                paddingTop: `${
                  this.getHighestPercentage("K") === 100 ? 0 : 4
                }px`,
              }}
            >
              <span
                className={styles.columnchart_container_K_high}
                style={{
                  bottom: `${this.getPercentage(q3["K"])}%`,
                  transform: `translateY(${this.getPercentage(q3["K"])}%)`,
                  display: `${
                    this.getPercentage(q3["K"]) === null ? "none" : "block"
                  }`,
                }}
              />
              <span
                className={styles.columnchart_container_K_medium}
                style={{
                  bottom: `${this.getPercentage(median["K"])}%`,
                  transform: `translateY(${this.getPercentage(median["K"])}%)`,
                  display: `${
                    this.getPercentage(median["K"]) === null ? "none" : "block"
                  }`,
                }}
              />
              <span
                className={styles.columnchart_container_K_low}
                style={{
                  bottom: `${this.getPercentage(q1["K"])}%`,
                  transform: `translateY(${this.getPercentage(q1["K"])}%)`,
                  display: `${
                    this.getPercentage(q1["K"]) === null ? "none" : "block"
                  }`,
                }}
              />
              <span className={styles.columnchart_container_K_icon}>
                <Female />
              </span>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default ColumnChart;
