import React, { Component } from "react";
import Plotly from "../Generic/Plotly";

type Props = {
  element: any;
  values: { label: string; value: string | number }[];
};

class BarChart extends Component<Props> {
  render() {
    const { element, values } = this.props;
    return (
      <Plotly
        data={[
          {
            y: values.map(v => {
              if (typeof v.value === "number") return v.value || 0;
              return (element as any)[v.value] || 0;
            }),
            x: values.map(v => {
              return v.label;
            }),
            type: "bar",
          },
        ]}
        layout={{
          autosize: true,
          margin: {
            l: 30,
            r: 20,
          },
        }}
        useResizeHandler
        style={{ width: "100%", height: "300px" }}
        config={{ responsive: true }}
      />
    );
  }
}

export default BarChart;
