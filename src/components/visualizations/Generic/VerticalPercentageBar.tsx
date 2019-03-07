import React from "react";
import style from "./VerticalPercentageBar.module.scss";
import NyUtdannaSvg from "./NyutdannaIcon.svg";

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
  public render() {
    const { values, max } = this.props;

    let rectHeight = 30;
    let rectY = 5;
    let rectX = 15;

    var leftHeightPercentage = (values.left.value / max) * 100;
    var leftHeight = (leftHeightPercentage * rectHeight) / 100;
    var rightHeightPercentage = (values.right.value / max) * 100;
    var rightHeight = (rightHeightPercentage * rectHeight) / 100;
    //100% = max
    //Hvor mange prosent er da values.left.value f.eks //2 / 6 * 100 = 33.33 %
    //hvis stolpen er 30 høy, hvor ligger da streken? //30 * 30 / 100 = 9.00
    var highestValue = Math.max(...[values.left.value, values.right.value]);
    var lowestValue = Math.min(...[values.left.value, values.right.value]);

    return (
      <svg
        viewBox={`5 0 25 105`}
        xmlns="http://www.w3.org/2000/svg"
        className={`${style.vertical_svg}`}
      >
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgb(255,0,0)" stopOpacity="100%" />
            <stop offset="34%" stopColor="rgb(255,255,0)" stopOpacity="100%" />
            <stop offset="100%" stopColor="rgb(0,255,0)" stopOpacity="100%" />
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
            width="4"
            x="14"
            y={0}
            strokeWidth="0"
            fill="#fff"
          />
          {/* Thin line */}
          {values.right.value == null ? (
            ""
          ) : (
            // <line
            //   id={`${style.thinline}`}
            //   y2={rectHeight + rectY - rightHeight}
            //   x2={rectX + 4}
            //   y1={rectHeight + rectY - rightHeight}
            //   x1={rectX - 1}
            //   strokeWidth="0.5"
            //   stroke="#000"
            //   fill="#fff"
            // />
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
            //         <g transform={`translate(21.5 83) scale(0.6)`}>
            //           <path
            //             transform="translate(-19.63)"
            //             d="M305.3,367.7l15.4,9.3l-4.1-17.5l13.6-11.8l-17.9-1.5l-7-16.5l-7,16.5l-17.9,1.5l13.6,11.8l-4.1,17.5L305.3,367.7z
            //  M305.3,367.7"
            //           />
            //         </g>
            <text
              textAnchor="start"
              fontFamily="'Roboto Slab', serif"
              fontSize="2.3"
              id="svg_6"
              y={rectHeight + rectY - leftHeight + 0.5 - 3}
              x={rectX + 5}
              strokeWidth="0"
              stroke="#000"
              fill="#000000"
            >
              {values.right.text}
            </text>
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
              y={rectHeight + rectY - leftHeight + 0.5 - 3}
              x={rectX + 7}
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
              strokeWidth="1.2"
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
            //         <g transform={`translate(21.5 83) scale(0.6)`}>
            //           <path
            //             transform="translate(-19.63)"
            //             d="M305.3,367.7l15.4,9.3l-4.1-17.5l13.6-11.8l-17.9-1.5l-7-16.5l-7,16.5l-17.9,1.5l13.6,11.8l-4.1,17.5L305.3,367.7z
            //  M305.3,367.7"
            //           />
            //         </g>

            <text
              textAnchor="start"
              fontFamily="'Roboto Slab', serif"
              fontWeight="bold"
              fontSize="2.3"
              id="svg_8"
              y={rectHeight + rectY - leftHeight + 0.5}
              x={rectX + 5}
              strokeWidth="0"
              stroke="#000"
              fill="#000000"
            >
              {values.left.text}
            </text>
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
              y={rectHeight + rectY - leftHeight + 0.5}
              x={rectX + 7}
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
