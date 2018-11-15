import React from "react";
import styles from "./Arbeidsledighet.module.scss";
import visualizationstyles from "./Visualization.module.scss";

type Props = {
  newly: number;
  tenyears: number;
};

class Arbeidsledighet extends React.Component<Props> {
  public render() {
    const { newly, tenyears } = this.props;
    return (
      <div className={visualizationstyles.visualization_container}>
        <div className={styles.arbeidsledighet_container}>
          <div className={styles.arbeidsledighet_container_newly}>
            <div className={styles.arbeidsledighet_container_newly_title}>
              Nyutdannede
            </div>
            <PercentageBar value={newly} />
          </div>
          <div className={styles.arbeidsledighet_container_tenyears}>
            <div className={styles.arbeidsledighet_container_tenyears_title}>
              10 år etter endt utdannelse
            </div>
            <PercentageBar value={tenyears} />
          </div>
        </div>
      </div>
    );
  }
}

type PercentageBarProps = {
  value: number;
};

class PercentageBar extends React.Component<PercentageBarProps> {
  public render() {
    const { value } = this.props;
    return (
      <div className={styles.percentagebar}>
        <div className={styles.percentagebar_mainbar} />
        <div
          className={styles.percentagebar_overlaybar}
          style={{ width: `${value}%` }}
        />
        <div className={styles.percentagebar_percentage}>{value} %</div>
      </div>
    );
  }
}

export default Arbeidsledighet;
