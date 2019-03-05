import React, { Component } from "react";

import styles from "./MaleFemaleBarChart.module.scss";

type Column = {
  top?: number;
  middle?: number;
  bottom?: number;
};

type Props = {
  max: number;
  male: Column;
  female: Column;
};
type RectangleProps = {
  x: "male" | "female";
  y: number;
  position: "top" | "middle" | "bottom";
};

function Rectangle({ x, y, position }: RectangleProps) {
  if (y === 0) return null;
  return (
    <rect
      className={`${styles.rectangle} ${styles.rectangle_filled}`}
      width="14"
      height={position === "top" || position == "bottom" ? 2 : 4}
      x={x === "male" ? 3 : 18}
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

class MaleFemaleBarChart extends Component<Props> {
  render() {
    const { max, male: maleRaw, female: femaleRaw } = this.props;
    const male = {
      top: ((maleRaw.top || 0) / max) * 100,
      middle: ((maleRaw.middle || 0) / max) * 100,
      bottom: ((maleRaw.bottom || 0) / max) * 100,
      max: 0,
    };
    const female = {
      top: ((femaleRaw.top || 0) / max) * 100,
      middle: ((femaleRaw.middle || 0) / max) * 100,
      bottom: ((femaleRaw.bottom || 0) / max) * 100,
      max: 0,
    };
    male.max = maximum(male.top, male.middle, male.bottom);
    female.max = maximum(female.top, female.middle, female.bottom);
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox={`5 0 25 105`}>
        <g>
          <rect
            className={`${styles.male_bar}`}
            width="10"
            height={`${male.max}`}
            rx="5"
            x="5"
            y={100 - male.max}
          />

          <rect
            className={`${styles.female_bar}`}
            width="10"
            height={female.max}
            rx="5"
            x="20"
            y={100 - female.max}
          />

          <g
            className={`${styles.icon + " " + styles.icon_woman}`}
            transform={`translate(21.5 83) scale(0.6)`}
          >
            <path
              d="M28.36 2.73A2.73 2.73 0 1 1 25.63 0a2.73 2.73 0 0 1 2.73 2.73z"
              transform="translate(-19.63)"
            />
            <path
              d="M9.76 42.49a1.55 1.55 0 0 0-1.69-1.39h-4.1a1.55 1.55 0 0 0-1.68 1.39L0 51.03a1.55 1.55 0 0 0 1.69 1.39h1.48v4.41a1.27 1.27 0 1 0 2.55 0v-4.41h.57v4.41a1.27 1.27 0 1 0 2.54 0v-4.41h1.54a1.55 1.55 0 0 0 1.69-1.4z"
              transform="translate(0 -35.23)"
            />
          </g>

          <g
            transform={`translate(6.5 83) scale(0.6)`}
            className={`${styles.icon}`}
          >
            <path
              d="M28.47 2.73A2.74 2.74 0 1 1 25.74 0a2.73 2.73 0 0 1 2.73 2.73z"
              transform="translate(-19.71)"
            />
            <path
              d="M10.37 41.1H1.7A1.55 1.55 0 0 0 0 42.49l2.3 8.54a1.4 1.4 0 0 0 .9 1.23v4.31a1.42 1.42 0 0 0 1.27 1.53 1.42 1.42 0 0 0 1.27-1.53v-4.16h.57v4.16A1.42 1.42 0 0 0 7.6 58.1a1.42 1.42 0 0 0 1.27-1.53v-4.31a1.37 1.37 0 0 0 .9-1.23l2.3-8.54a1.56 1.56 0 0 0-1.69-1.39z"
              transform="translate(0 -35.23)"
            />
          </g>
          <Rectangle x="male" y={male.top} position="top" />
          <Rectangle x="male" y={male.bottom} position="bottom" />
          <Rectangle x="male" y={male.middle} position="middle" />
          <Rectangle x="female" y={female.top} position="top" />
          <Rectangle x="female" y={female.bottom} position="bottom" />
          <Rectangle x="female" y={female.middle} position="middle" />
        </g>
      </svg>
    );
  }
}
export default MaleFemaleBarChart;
