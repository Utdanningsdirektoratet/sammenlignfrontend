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
type CircleProps = {
  y: number;
  fill: boolean;
};

function Circle({ y, fill }: CircleProps) {
  if (y === 0) return null;
  return (
    <circle
      className={`${styles.circle} ${
        fill ? styles.circle_filled : styles.circle_unfilled
      }`}
      strokeWidth="3.5"
      cx={20}
      cy={100 - y + 5}
      r="3.25"
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

          <Circle fill={false} y={data.top} />
          <Circle fill={true} y={data.middle} />
          <Circle fill={false} y={data.bottom} />
        </g>
      </svg>
    );
  }
}
export default SingleBarChart;
