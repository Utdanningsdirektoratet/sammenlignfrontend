import React, { Component } from "react";
import Plotly from "../Generic/Plotly";
import { MainElement } from "../../../data/ApiTypes";

type Props = {
  element: MainElement;
  values: { label: string; value: string }[];
};

class PieChart extends Component<Props> {
  render() {
    const { element, values } = this.props;
    return (
      <Plotly
        data={[
          {
            values: values.map(v => {
              return (element as any)[v.value] || 0;
            }),
            labels: values.map(v => {
              return v.label;
            }),
            type: "pie",
          },
        ]}
        layout={{
          autosize: true,
          showlegend: true,
          margin: {
            b: 0,
            t: 0,
          },
          legend: {
            yanchor: "top",
            traceorder: "normal",
            xanchor: "left",
            orientation: "v",
            y: -0.2561165048543688,
            x: -2,
            style: { width: "100%", height: "100%" },
          },
        }}
        useResizeHandler
        style={{ width: "100%", height: "100%" }}
        config={{ responsive: true }}
      />
    );
  }
}

export default PieChart;

// [
//     element.sektor_antall_privat || 0,
//     element.sektor_antall_offentlig || 0,
//   ],

// layout={{
//   autosize: true,
//   yaxis: {
//     range: [-1, 4],
//     autorange: true,
//   },
//   xaxis: {
//     range: [-1, 6],
//     autorange: true,
//   },
//   margin: {
//     b: 150,
//     t: 116,
//   },
//   legend: {
//     yanchor: "top",
//     traceorder: "normal",
//     xanchor: "right",
//     orientation: "v",
//     y: -2,
//     x: -2,
//   },
// }}
