import React from "react";
import styles from "./Jobbtilfredshet.module.scss";
import visualizationstyles from "./Visualization.module.scss";

import { ReactComponent as JobbtilfredshetSmiley } from "./Jobbtilfredshet-smiley.svg";
import { ReactComponent as JobbtilfredshetSadface } from "./Jobbtilfredshet-sadface.svg";

type Props = {
  value: number;
};

class Jobbtilfredshet extends React.Component<Props> {
  public render() {
    const { value } = this.props;
    const icons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const negIcons = icons.slice(0, Math.round(value / 10)).map(i => {
      return JobbtilfredshetSmiley;
    });
    const posIcons = icons.slice(0, Math.round(10 - value / 10)).map(i => {
      return JobbtilfredshetSadface;
    });
    const allIcons = negIcons.concat(posIcons);

    return (
      <div className={`${visualizationstyles.visualization_container}`}>
        <div className={`${styles.jobbtilfredshet_container}`}>
          <div className={`${styles.jobbtilfredshet_container_icons}`}>
            <div
              className={`${styles.jobbtilfredshet_container_icons__firstline}`}
            >
              {allIcons.slice(0, 5).map((I, i: number) => {
                return (
                  <I
                    className={`${
                      styles.jobbtilfredshet_container_icons__icon
                    }`}
                    key={i}
                  />
                );
              })}
            </div>
            <div
              className={`${
                styles.jobbtilfredshet_container_icons__secondline
              }`}
            >
              {allIcons.slice(5, 10).map((I, i: number) => {
                return (
                  <I
                    className={`${
                      styles.jobbtilfredshet_container_icons__icon
                    }`}
                    key={i}
                  />
                );
              })}
            </div>
          </div>
          <div className={`${styles.jobbtilfredshet_container_percentage}`}>
            {value} %
          </div>
        </div>
      </div>
    );
  }
}

export default Jobbtilfredshet;
