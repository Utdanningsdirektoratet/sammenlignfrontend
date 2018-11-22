import React from "react";
import styles from "./PercentageBar.module.scss";

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
          style={{ width: `${value < 100 ? value : 100}%` }}
        />
        <div className={styles.percentagebar_percentage}>{value} %</div>
      </div>
    );
  }
}
export default PercentageBar;
