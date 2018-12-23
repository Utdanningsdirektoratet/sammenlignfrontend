import React, { PureComponent } from "react";
import * as d3 from "d3";

import styles from "./ArbeidsmarkedD3.module.scss";

import {
  FilterTypes,
  ArbeidsmarkedData,
  ArbeidsmarkedDataElement,
} from "./Mappings";
// import { updateAxis, updateRows } from "./D3Helpers";
import {
  num_compare_sizing,
  ScreenSizeProps,
} from "../../utils/NumCompareSizing";

type Props = {
  data: ArbeidsmarkedData;
  show_all: boolean;
  toggleShowAll: () => void;
};
type State = {
  data?: ArbeidsmarkedData;
  shouldUpdate: boolean;
};

const margin = { top: 30, right: 40, bottom: 20, left: 220 };

class ArbeidsmarkedD3 extends PureComponent<Props & ScreenSizeProps, State> {
  state = { shouldUpdate: false };
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
  xAxisRef = React.createRef<SVGGElement>();
  xAxisBottomRef = React.createRef<SVGGElement>();
  yAxisRef = React.createRef<SVGGElement>();
  // Scales
  xScale = d3.scaleLinear();
  yScale = d3.scaleBand().padding(0.25);
  // Axis
  xAxis = d3.axisTop(this.xScale);
  xAxisBottom = d3.axisBottom(this.xScale);
  yAxis = d3.axisLeft(this.yScale);
  // Sizing;
  width = 0;
  height = 0;

  updateD3 = () => {
    this.updateSizing();
    this.updateAxis();
    this.updateRows();
  };
  updateSizing() {
    const { data, show_all } = this.props;

    if (!this.svgRef.current || !this.svgRef.current) return;
    this.width = this.svgRef.current.getBoundingClientRect().width;
    const step = show_all ? 20 : 32;
    this.height = data.elements.length * step + margin.top + margin.bottom;
    this.svgRef.current.style.height = `${this.height}px`;
    // set gridline position (considering margins)
    this.xAxis.tickSize(-(this.height - margin.top - margin.bottom));
    this.xAxisBottom.tickSize(-(this.height - margin.top - margin.bottom));
    // reomve horisontal grid lines
    this.yAxis.tickSize(0);
  }
  updateAxis() {
    const { data, show_all } = this.props;
    const { height, width } = this;

    this.yScale
      .domain(data.elements.map(d => d.tittel))
      .range([margin.top, height - margin.bottom]);
    this.xScale
      .domain([0, d3.max(data.elements, e => e.sum) || 10])
      .nice()
      .range([margin.left, width - margin.right]);

    d3.select(this.xAxisRef.current)
      // .transition()
      // .duration(duration)
      // .delay(delay)
      .attr("transform", "translate(0," + margin.top + ")")
      .call(this.xAxis as any);
    d3.select(this.yAxisRef.current)
      .attr("transform", `translate( ${margin.left}, 0)`)
      .call(this.yAxis as any);
    d3.select(this.xAxisBottomRef.current)
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(this.xAxisBottom as any);
  }
  updateRows() {
    const { data, show_all } = this.props;
    const rowsDom = this.rowsRef.current;
    if (!rowsDom) return;

    // Ensure that we have enough row elements
    const rows = d3
      .select(rowsDom)
      .selectAll()
      .data(data.elements)
      .enter()
      .append("g");
    // Move rows to correct position y position
    rows.attr("transform", d => `translate(0,${this.yScale(d.tittel)})`);
    // draw bar
    rows
      .append("rect")
      // .attr("class", "base-bar")
      .attr("y", 0)
      .attr("width", d => d.sum);
    // .attr("stroke", "black")
    // .attr("fill", "none");

    rows
      .selectAll(".base")
      .append("text")
      // .attr("fill", d => sumColor(d.sum))
      .attr("text-anchor", "end")
      .attr("dominant-baseline", "middle")
      .attr("dx", "-.2em")
      .attr("dy", 1)
      .text((d: any) => d.sum);

    rows
      .append("g")
      .attr("class", "overlays")
      .append("g")
      .attr("class", "parts")
      .selectAll(".part-bars")
      .data((d: any) => d.data)
      .enter()
      .append("g")
      .attr("class", "part-bars")
      .append("rect")
      .attr("class", (v, i) => "parts-" + i)
      .attr("fill", v => "black");
    // .attr("fill", v => barColor(v.type));

    rows
      .selectAll(".part-bars")
      .append("text")
      .attr("class", "part-values")
      .attr("fill", (d, i) => (i === 1 ? "white" : "black"))
      .attr("dominant-baseline", "ideographic")
      .attr("dx", ".3em")
      .attr("dy", 0)
      .text((v: any) => v.value);

    rows
      .selectAll("rect")
      .transition()
      // .duration(duration)
      // .delay(delay)
      .attr("x", margin.left)
      .attr("width", (d: any) => this.xScale(d.sum) - margin.left)
      .attr("height", this.yScale.bandwidth());

    rows
      .selectAll("text")
      .transition()
      // .duration(duration)
      // .delay(delay)
      .attr("x", this.width)
      .attr("y", this.yScale.bandwidth() / 2);

    // rows
    //   .selectAll(".parts")
    //   .selectAll("rect")
    //   .transition()
    //   .duration(duration)
    //   .delay(delay)
    //   .attr("x", v => xScale(v.left))
    //   .attr("y", "0")
    //   .attr("width", v => Math.max(xScale(v.value) - margin.left, 0))
    //   .attr("height", yScale.bandwidth())
    //   .style("stroke", v => (!yDomain && v.type === key ? "black" : "none"))
    //   .style("opacity", v => (!yDomain && v.type !== key ? 0.6 : 1));

    // rows
    //   .selectAll(".parts")
    //   .selectAll("text")
    //   .transition()
    //   .duration(duration)
    //   .delay(delay)
    //   .attr("transform", v => "translate(" + xScale(v.left) + ",0)")
    //   .attr("x", 0)
    //   .attr("y", yScale.bandwidth())
    //   .text(v => v.value)
    //   .attr("display", v =>
    //     xScale(v.value) - margin.left < 22 ? "none" : "inline"
    //   )
    //   .style("opacity", v => (!yDomain && v.type !== key ? 0.6 : 1));
  }
  render() {
    const { data, innerWidth } = this.props;
    // return <pre>{JSON.stringify(data, null, 4)}</pre>;
    return (
      <svg ref={this.svgRef} width={innerWidth}>
        <g className="axis">
          <g className="xaxis" ref={this.xAxisRef} />
          <g className="xaxis-bottom" ref={this.xAxisBottomRef} />
          <g className="yaxis" ref={this.yAxisRef} />
        </g>
        <g
          ref={this.rowsRef}
          className={`${styles.rows_wrapper}`}
          transform="translate(1,0)"
        >
          {/* {data.elements.map(element => (
            <g key={element.tittel}>
              {data.data_labels.map(label => (
                <rect />
              ))}
            </g>
          ))} */}
        </g>
      </svg>
    );
  }
}
export default num_compare_sizing<Props>(ArbeidsmarkedD3);
