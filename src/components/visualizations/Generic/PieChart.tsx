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
            l: 10,
            r: 10,
            b: 10,
          },
          legend: {
            yanchor: "top",
            traceorder: "normal",
            xanchor: "left",
            orientation: "v",
            y: 0,
            x: 0,
            style: { width: "100%", height: "100%" },
          },
        }}
        useResizeHandler
        style={{ width: "100%", height: "400px" }}
        config={{ responsive: true }}
      />
    );
  }
}

export default PieChart;
