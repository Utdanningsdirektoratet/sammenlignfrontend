import React, { Component } from "react";
import styles from "./ArbeidsmarkedD3.module.scss";
import d3 from "d3";

const xScale = d3.scaleLinear();
const yScale = d3.scaleBand().padding(0.25);
const xAxis: any = d3.axisTop(xScale);
const xAxisBottom: any = d3.axisBottom(xScale);
const yAxis: any = d3.axisLeft(yScale);

const margin = { top: 30, right: 40, bottom: 20, left: 220 };

type DataElement = {
  title: string;
  data: number[];
};

type Data = {
  title: string;
  bars: DataElement[];
};

type Props = {
  data: Data;
};
type State = {
  data: Data;
  shouldUpdate: boolean;
};

class ArbeidsmarkedD3 extends Component<Props, State> {
  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    if (nextProps.data !== prevState.data)
      return {
        shouldUpdate: true,
        data: nextProps.data,
      };
  }
  componentDidMount() {
    this.updateD3();
  }
  componentDidUpdate() {
    this.updateD3();
  }
  // Refs
  svgRef = React.createRef<SVGSVGElement>();
  rowsRef = React.createRef<SVGGElement>();
  // axis
  updateD3() {
    const svg = this.svgRef.current;
    const rows = this.rowsRef.current;
    if (!svg || !rows) return;
  }
  render() {
    return (
      <svg ref={this.svgRef}>
        <g ref={this.rowsRef} className={`${styles.rows_wrapper}`} />
      </svg>
    );
  }
}
