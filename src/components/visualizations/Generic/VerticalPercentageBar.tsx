import React from "react";
import style from "./VerticalPercentageBar.module.scss";
import NyUtdannaSvg from "./NyutdannaIcon.svg";
import { IDictionary } from "../Arbeidsledighet/ArbeidsledighetVisualization";

type Props = {
  values: {
    left: VerticalPercentageBarValue;
    right: VerticalPercentageBarValue;
  };
  max: number;
};

export type VerticalPercentageBarValue = { value: number; text: JSX.Element };

class VerticalPercentageBar extends React.Component<Props> {
  getYPosition(value: number, rectHeight: number, rectY: number) {
    var heightPercentage = (value / this.props.max) * 100;
    var height = (heightPercentage * rectHeight) / 100;

    return rectHeight + rectY - height;
  }

  getTextPosition(thisNumber: number, other: number) {
    if (thisNumber < other) {
      var diff = thisNumber - other;
      if (diff > -4) return thisNumber - (4 + diff);
      return thisNumber;
    } else if (other < thisNumber) {
      return thisNumber;
    } else {
      return thisNumber - 4;
    }
  }
  public render() {
    const { values, max } = this.props;

    let rectHeight = 30;
    let rectY = 5;
    let rectX = 10;
    if (max == null || max == 0) return null;
    var leftHeightPercentage = values.left.value
      ? (values.left.value / max) * 100
      : 0;
    var leftHeight = (leftHeightPercentage * rectHeight) / 100;
    var rightHeightPercentage = values.right.value
      ? (values.right.value / max) * 100
      : 0;
    var rightHeight = (rightHeightPercentage * rectHeight) / 100;
    var highestValue = Math.max(...[values.left.value, values.right.value]);
    var lowestValue = Math.min(...[values.left.value, values.right.value]);

    var leftTextHeight =
      values.left.value == null ? 0 : rectHeight + rectY - leftHeight + 0.5;
    var rightTextHeight =
      values.right.value == null ? 0 : rectHeight + rectY - rightHeight + 0.5;
    return (
      <svg
        viewBox={`5 0 25 40`}
        xmlns="http://www.w3.org/2000/svg"
        className={`${style.vertical_svg}`}
      >
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FF0202" stopOpacity="100%" />
            <stop offset="40%" stopColor="#F6F617" stopOpacity="100%" />
            <stop offset="100%" stopColor="#04DE04" stopOpacity="100%" />
          </linearGradient>
        </defs>
        <g>
          <rect
            id="svg_1"
            height={rectHeight}
            width="3"
            x={rectX}
            y={rectY}
            strokeWidth="0"
            fill="url(#grad1)"
          />
          <rect
            id="svg_1"
            height={
              highestValue == null
                ? lowestValue == null
                  ? 0
                  : this.getYPosition(lowestValue, rectHeight, rectY)
                : this.getYPosition(highestValue, rectHeight, rectY)
            }
            width="4.5"
            x={rectX - 1}
            y={0}
            strokeWidth="0"
            fill="#fff"
          />
          {/* Thin line */}
          {values.right.value == null ? (
            ""
          ) : (
            <rect
              x={rectX - 1}
              y={rectHeight + rectY - rightHeight}
              height="0.5"
              width={5}
              fill="#000"
              strokeWidth="0.2"
              stroke="#000"
            />
          )}
          {/* Thin half line right */}
          {values.right.value == null ? (
            ""
          ) : (
            <rect
              x={rectX - 1 - 0.4 + 2.5}
              y={rectHeight + rectY - rightHeight + 0.1}
              height="0.3"
              width={5 + 0.4}
              fill="#fff"
            />
          )}

          {/* Thin line icon */}
          {values.right.value == null ? (
            ""
          ) : (
            <svg
              y={this.getTextPosition(rightTextHeight, leftTextHeight) - 2}
              x={rectX + 5}
            >
              <g transform="translate(0 0) scale(0.045)">
                <path d="M24.9,38l15.4,9.3L36.2,29.8,49.8,18,31.9,16.5,24.9,0l-7,16.5L0,18,13.6,29.8,9.5,47.3Z" />
              </g>
            </svg>
          )}

          {/* Thin line text*/}
          {values.right.value == null ? (
            ""
          ) : (
            <text
              textAnchor="start"
              fontFamily="'Roboto Slab', serif"
              fontSize="3.5"
              id="svg_7"
              y={this.getTextPosition(rightTextHeight, leftTextHeight)}
              x={rectX + 8}
              strokeWidth="0"
              stroke="#000"
              fill="#000000"
            >
              <tspan>{values.right.value}</tspan>
              <tspan fontSize="2.3">%</tspan>
            </text>
          )}
          {/* Thick line */}
          {values.left.value == null ? (
            ""
          ) : (
            <line
              id={`${style.boldline}`}
              y2={rectHeight + rectY - leftHeight}
              x2={rectX + 4 + 0.2}
              y1={rectHeight + rectY - leftHeight}
              x1={rectX - 1 - 0.2}
              strokeWidth="0.8"
              stroke="#000"
              fill="none"
            />
          )}
          {/* Thin half line left */}
          {values.right.value == null ? (
            ""
          ) : (
            <rect
              x={rectX - 1 - 0.4}
              y={rectHeight + rectY - rightHeight + 0.1}
              height="0.3"
              width={2.5 + 0.4}
              fill="#fff"
            />
          )}
          {/* Thick line icon */}
          {values.left.value == null ? (
            ""
          ) : (
            <svg
              y={this.getTextPosition(leftTextHeight, rightTextHeight) - 2}
              x={rectX + 5}
            >
              <g transform="translate(0 0) scale(0.04)">
                <path d="M27.8,0A27.8,27.8,0,1,0,55.6,27.8,27.8,27.8,0,0,0,27.8,0ZM43.4,42.9H32.3V39l2.3-.4-1.4-4.5H22.6l-1.4,4.5,2.3.4v3.9H12.4V39l2.3-.3,10-28.4h6.7l9.9,28.4,2.3.3v3.9Z" />
                <polygon points="27.8 17.7 24.1 29.2 31.6 29.2 27.9 17.7 27.8 17.7" />
              </g>
            </svg>
          )}

          {/* Thick line text*/}
          {values.left.value == null ? (
            ""
          ) : (
            <text
              textAnchor="start"
              fontFamily="'Roboto Slab', serif"
              fontWeight="bold"
              fontSize="3.5"
              id="svg_9"
              y={this.getTextPosition(leftTextHeight, rightTextHeight)}
              x={rectX + 8}
              strokeWidth="0"
              stroke="#000"
              fill="#000000"
            >
              <tspan>{values.left.value}</tspan>
              <tspan fontSize="2.3">%</tspan>
            </text>
          )}
        </g>
      </svg>
    );
  }
}

export default VerticalPercentageBar;
