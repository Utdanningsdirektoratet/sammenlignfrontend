import React from "react";
import styles from "./PercentageBar.module.scss";

type PercentageBarProps = {
  value: number;
  maxPercentageEqualsTen?: boolean;
};

class PercentageBar extends React.Component<PercentageBarProps> {
  public render() {
    const { value, maxPercentageEqualsTen } = this.props;
    if (!value) return null;
    let width = value as number;
    if (maxPercentageEqualsTen) width = width * 10;
    let multiplier = Math.pow(10, 1);
    let roundedVal = Math.round(value * multiplier) / multiplier;
    let values = roundedVal.toString().split(".");
    let mainNumber = values[0];
    let secondNumber = "0";
    let maxBarWidth = 33;
    let barWidthPercentage = (width / maxBarWidth) * 100;
    if (values.length > 1) {
      var svalue = values[1].split("");
      secondNumber = svalue[0];
      // secondNumber = svalue[0] + svalue[1];
    }
    return (
      <div className={`${styles.percentagebar}`}>
        <div className={`${styles.percentagebar_percentage}`}>
          <span className={`${styles.percentagebar_percentage_main}`}>
            {mainNumber}
          </span>
          <span className={`${styles.percentagebar_percentage_second}`}>
            ,{secondNumber}
          </span>
          %
        </div>
        <div className={`${styles.percentagebar_mainbar}`} style={{ width: `${barWidthPercentage}%` }}>
          <div
            className={`${styles.percentagebar_overlaybar}`}
            // style={{ width: `${width < 100 ? width : 100}%` }}
            style={{ width: `${100}%` }}
          />
        </div>
      </div>
    );
  }
}
export default PercentageBar;
