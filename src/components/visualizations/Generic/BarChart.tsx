import React, { Component } from "react";
import Plotly from "../Generic/Plotly";
import { MainElement } from "../../../data/ApiTypes";

type Props = {
  element: MainElement;
  values: { label: string; value: string }[];
};

class BarChart extends Component<Props> {
  render() {
    const { element, values } = this.props;
    return (
      <Plotly
        data={[
          {
            y: values.map(v => {
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
        style={{ width: "100%", height: "100%" }}
        config={{ responsive: true }}
      />
    );
  }
}

export default BarChart;
