import React from "react";
import styles from "./Frafall.module.scss";
import visualizationstyles from "./Visualization.module.scss";

import { ReactComponent as FrafallThumbsup } from "./Frafall-thumbsup.svg";
import { ReactComponent as FrafallThumbsdown } from "./Frafall-thumbsdown.svg";

type Props = {
  value: number;
};

class Frafall extends React.Component<Props> {
  public render() {
    const { value } = this.props;
    const faceIcons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const negIcons = faceIcons.slice(0, Math.round(value / 10)).map(i => {
      return FrafallThumbsup;
    });
    const posIcons = faceIcons.slice(0, Math.round(10 - value / 10)).map(i => {
      return FrafallThumbsdown;
    });
    const allIcons = negIcons.concat(posIcons);

    return (
      <div className={visualizationstyles.visualization_container}>
        <div className={styles.frafall_container}>
          <div className={styles.frafall_container_icons}>
            <div className={styles.frafall_container_icons__firstline}>
              {allIcons.slice(0, 5).map((I, i: number) => {
                return (
                  <I className={styles.frafall_container_icons__icon} key={i} />
                );
              })}
            </div>
            <div className={styles.frafall_container_icons__secondline}>
              {allIcons.slice(5, 10).map((I, i: number) => {
                return (
                  <I className={styles.frafall_container_icons__icon} key={i} />
                );
              })}
            </div>
          </div>
          <div className={styles.frafall_container_percentage}>{value} %</div>
        </div>
      </div>
    );
  }
}

export default Frafall;
