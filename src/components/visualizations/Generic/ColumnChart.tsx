import React, { Component } from "react";
import styles from "./ColumnChart.module.scss";
import { Kjønn } from "../../../data/ApiTypes";
import { KvartilInfo } from "../Lonn/LonnVisualization";
import { ReactComponent as Female } from "../../../fontawesome/solid/female.svg";
import { ReactComponent as Male } from "../../../fontawesome/solid/male.svg";

type Props = {
  kjønn: Kjønn;
  low?: KvartilInfo;
  mid?: KvartilInfo;
  high?: KvartilInfo;
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
    var q3Percentage = this.props.high
      ? this.getPercentage(this.props.high[kjønn])
      : null;
    if (q3Percentage) percentages.push(q3Percentage);
    var medianPercentage = this.props.mid
      ? this.getPercentage(this.props.mid[kjønn])
      : null;
    if (medianPercentage) percentages.push(medianPercentage);
    var q1Percentage = this.props.low
      ? this.getPercentage(this.props.low[kjønn])
      : null;
    if (q1Percentage) percentages.push(q1Percentage);

    percentages = percentages.sort((a, b) => b - a);
    return percentages[0] || 100;
  };

  render() {
    const { kjønn, low, mid, high } = this.props;
    return (
      <div>
        {kjønn === "A" ? (
          <div className={`${styles.columnchart_container}`}>
            <div
              className={`${styles.columnchart_container_A}`}
              style={{
                height: `${this.getHighestPercentage("A")}%`,
                paddingTop: `${
                  this.getHighestPercentage("A") === 100 ? 0 : 4
                }px`,
              }}
            >
              {high ? (
                <span
                  className={`${styles.columnchart_container_A_high}`}
                  style={{
                    bottom: `${this.getPercentage(high["A"])}%`,
                    transform: `translateY(${this.getPercentage(high["A"])}%)`,
                    display: `${
                      this.getPercentage(high["A"]) === null ? "none" : "block"
                    }`,
                  }}
                />
              ) : null}
              {mid ? (
                <span
                  className={`${styles.columnchart_container_A_medium}`}
                  style={{
                    bottom: `${this.getPercentage(mid["A"])}%`,
                    transform: `translateY(${this.getPercentage(mid["A"])}%)`,
                    display: `${
                      this.getPercentage(mid["A"]) === null ? "none" : "block"
                    }`,
                  }}
                />
              ) : null}
              {low ? (
                <span
                  className={`${styles.columnchart_container_A_low}`}
                  style={{
                    bottom: `${this.getPercentage(low["A"])}%`,
                    transform: `translateY(${() =>
                      this.getPercentage(low["A"])}%)`,
                    display: `${
                      this.getPercentage(low["A"]) === null ? "none" : "block"
                    }`,
                  }}
                />
              ) : null}
            </div>
          </div>
        ) : (
          <div className={`${styles.columnchart_container}`}>
            <div
              className={`${styles.columnchart_container_M}`}
              style={{
                height: `${this.getHighestPercentage("M")}%`,
                paddingTop: `${
                  this.getHighestPercentage("M") === 100 ? 0 : 4
                }px`,
              }}
            >
              {high ? (
                <span
                  className={`${styles.columnchart_container_M_high}`}
                  style={{
                    bottom: `${this.getPercentage(high["M"])}%`,
                    transform: `translateY(${this.getPercentage(high["M"])}%)`,
                    display: `${
                      this.getPercentage(high["M"]) === null ? "none" : "block"
                    }`,
                  }}
                />
              ) : null}
              {mid ? (
                <span
                  className={`${styles.columnchart_container_M_medium}`}
                  style={{
                    bottom: `${this.getPercentage(mid["M"])}%`,
                    transform: `translateY(${this.getPercentage(mid["M"])}%)`,
                    display: `${
                      this.getPercentage(mid["M"]) === null ? "none" : "block"
                    }`,
                  }}
                />
              ) : null}
              {low ? (
                <span
                  className={`${styles.columnchart_container_M_low}`}
                  style={{
                    bottom: `${this.getPercentage(low["M"])}%`,
                    transform: `translateY(${this.getPercentage(low["M"])}%)`,
                    display: `${
                      this.getPercentage(low["M"]) === null ? "none" : "block"
                    }`,
                  }}
                />
              ) : null}

              <span className={`${styles.columnchart_container_M_icon}`}>
                <Male />
              </span>
            </div>
            <div
              className={`${styles.columnchart_container_K}`}
              style={{
                height: `${this.getHighestPercentage("K")}%`,
                paddingTop: `${
                  this.getHighestPercentage("K") === 100 ? 0 : 4
                }px`,
              }}
            >
              {high ? (
                <span
                  className={`${styles.columnchart_container_K_high}`}
                  style={{
                    bottom: `${this.getPercentage(high["K"])}%`,
                    transform: `translateY(${this.getPercentage(high["K"])}%)`,
                    display: `${
                      this.getPercentage(high["K"]) === null ? "none" : "block"
                    }`,
                    borderColor: `white`,
                  }}
                />
              ) : null}
              {mid ? (
                <span
                  className={`${styles.columnchart_container_K_medium}`}
                  style={{
                    bottom: `${this.getPercentage(mid["K"])}%`,
                    transform: `translateY(${this.getPercentage(mid["K"])}%)`,
                    display: `${
                      this.getPercentage(mid["K"]) === null ? "none" : "block"
                    }`,
                    backgroundColor: `white`,
                    borderColor: `white`,
                  }}
                />
              ) : null}
              {low ? (
                <span
                  className={`${styles.columnchart_container_K_low}`}
                  style={{
                    bottom: `${this.getPercentage(low["K"])}%`,
                    transform: `translateY(${this.getPercentage(low["K"])}%)`,
                    display: `${
                      this.getPercentage(low["K"]) === null ? "none" : "block"
                    }`,
                    borderColor: `white`,
                  }}
                />
              ) : null}
              <span className={`${styles.columnchart_container_K_icon}`}>
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
