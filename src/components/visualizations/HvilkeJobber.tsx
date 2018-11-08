import React from "react";
import * as d3 from "d3";

import "./HvilkeJobber.scss";
import HvilkeJobberSelektor from "./HvilkeJobberSelektor";
import { updateStats } from "./HvilkeJobberHelperMethods";
import { DSVRowString, DSVRowAny } from "d3";

type MyState = {
  selectedUtdanning: string;
};

class HvilkeJobber extends React.Component<any, MyState> {
  container = React.createRef<HTMLDivElement>();
  mainSelect = React.createRef<HTMLSelectElement>();
  chart = React.createRef<SVGSVGElement>();
  info = React.createRef<HTMLDivElement>();
  state = {
    selectedUtdanning: "statsviter",
  };

  componentDidMount() {
    updateStats(this.state.selectedUtdanning);
  }

  handleUtdanningClicked = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ selectedUtdanning: event.target.value });
    updateStats(event.target.value);
  };

  handleChangeFilter = (event: React.MouseEvent<HTMLLIElement>) => {
    // var className = event.currentTarget.className;
    // this.types = ["series-0", "series-1", "series-2"];
    // moveBars(yScale, 500);
    // this.mapping = {};
    // tplMappings[className].forEach((v, i) => {
    //   this.mapping[`series-${i}`] = v;
    // });
    // updateRows(this.chart.current);
    // createLegend();
    // moveBars(yScale, 500);
    // this.yDomain = false;
    // sortParts(this.types[0]);
  };

  render() {
    const { selectedUtdanning } = this.state;
    return (
      <div>
        <HvilkeJobberSelektor
          mainSelectRef={this.mainSelect}
          selected={selectedUtdanning}
          onSelected={this.handleUtdanningClicked}
        />
        <h1>Hva jobber de som har er utdannet {selectedUtdanning} med?</h1>
        <header className="d3-control-panel">
          <section>
            <h2>Vis</h2>
            <ul className="tabs">
              <li className="antall_personer" onClick={this.handleChangeFilter}>
                Antall personer
              </li>
              <li className="kvinner_menn">Kvinner / menn</li>
              <li className="offentlig_privat">Offentlig / Privat</li>
              <li className="over_under_40">Over 40 år / Under 40 år</li>
              <li className="kandidater_13">Nyutdanna</li>
            </ul>
          </section>
          <section>
            <h2>Sorter etter</h2>
            <div className="color-controler" />
          </section>
        </header>
        <div className="container">
          <div className="chart-container" id="container" ref={this.container}>
            <svg id="chart" ref={this.chart} />
            <div id="info" ref={this.info}>
              <div className="title">infoTitle</div>
              <div className="desc" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HvilkeJobber;
