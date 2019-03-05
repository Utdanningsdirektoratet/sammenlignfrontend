import React, { Component } from "react";

import styles from "./MaleFemaleBarChart.module.scss";

type Column = {
  top?: number;
  middle?: number;
  bottom?: number;
};

type Props = {
  max: number;
  data: Column;
};
type RectangleProps = {
  y: number;
  position: "top" | "middle" | "bottom";
};

function Rectangle({ y, position }: RectangleProps) {
  if (y === 0) return null;
  return (
    <rect
      className={`${styles.rectangle} ${styles.rectangle_filled}`}
      width="14"
      height={position === "top" || position == "bottom" ? 2 : 4}
      x={13}
      y={100 - y + 1}
    />
  );
}
function maximum(a: number, b: number, c: number) {
  if (a > b) {
    return a > c ? a : c;
  }
  return b > c ? b : c;
}

class SingleBarChart extends Component<Props> {
  render() {
    const { max, data: dataRaw } = this.props;
    const data = {
      top: ((dataRaw.top || 0) / max) * 100,
      middle: ((dataRaw.middle || 0) / max) * 100,
      bottom: ((dataRaw.bottom || 0) / max) * 100,
      max: 0,
    };

    data.max = maximum(data.top, data.middle, data.bottom);
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox={`5 0 30 105`}>
        <g>
          <rect
            className={`${styles.data_bar}`}
            width="10"
            height={`${data.max}`}
            rx="5"
            x="15"
            y={100 - data.max}
          />

          <Rectangle y={data.top} position="top" />
          <Rectangle y={data.bottom} position="bottom" />
          <Rectangle y={data.middle} position="middle" />
        </g>
      </svg>
    );
  }
}
export default SingleBarChart;
