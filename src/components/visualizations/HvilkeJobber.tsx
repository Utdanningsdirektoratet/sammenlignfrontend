import React, { ReactInstance } from "react";

import "./HvilkeJobber.scss";
import { updateStats } from "./HvilkeJobberHelperMethods";

type MyState = {
  selectedFilter: string;
};

type MyProps = {
  data: any;
  onUtdanningChanged: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  selectedUtdanning: { unoId: string; title: string };
  mainSelect: React.RefObject<HTMLSelectElement>;
};

class HvilkeJobber extends React.Component<MyProps, MyState> {
  myRefs: {
    container: React.RefObject<HTMLDivElement>;
    mainSelect: React.RefObject<HTMLSelectElement>;
    chart: React.RefObject<SVGSVGElement>;
    info: React.RefObject<HTMLDivElement>;
  } = {
    container: React.createRef<HTMLDivElement>(),
    mainSelect: this.props.mainSelect,
    chart: React.createRef<SVGSVGElement>(),
    info: React.createRef<HTMLDivElement>(),
  };
  defaultSelectedFilter = "antall_personer";
  state = {
    selectedFilter: this.defaultSelectedFilter,
  };
  onFilterSelect: ((className: string) => void) | null = null;

  componentDidMount() {
    //updateStats(this.props.data);
    updateStats(
      this.props.selectedUtdanning.unoId,
      this.myRefs,
      this.setOnFilterSelect
    );
  }

  handleUtdanningClicked = (utdanning: { unoId: string; title: string }) => {
    this.setState({ selectedFilter: this.defaultSelectedFilter });
    updateStats(utdanning.unoId, this.myRefs, this.setOnFilterSelect);
  };

  setOnFilterSelect = (onFilterSelect: (className: string) => void) => {
    this.onFilterSelect = onFilterSelect;
  };

  handleChangeFilter = (event: React.MouseEvent<HTMLLIElement>) => {
    var className = event.currentTarget.className;
    this.setState({ selectedFilter: className });
    if (this.onFilterSelect) this.onFilterSelect(className);
  };

  render() {
    const { selectedFilter } = this.state;
    const { data, selectedUtdanning } = this.props;
    return (
      <div>
        <h1>
          Hva jobber de som har er utdannet {selectedUtdanning.unoId} med?
        </h1>
        <header className="hvilkejobber_d3-control-panel">
          <section>
            <h2>Vis</h2>
            <ul className="hvilkejobber_tabs">
              <li
                className={
                  "antall_personer" +
                  (selectedFilter === "antall_personer"
                    ? " hvilkejobber_active"
                    : "")
                }
                onClick={this.handleChangeFilter}
              >
                Antall personer
              </li>
              <li
                className={
                  "kvinner_menn" +
                  (selectedFilter === "kvinner_menn"
                    ? " hvilkejobber_active"
                    : "")
                }
                onClick={this.handleChangeFilter}
              >
                Kvinner / menn
              </li>
              <li
                className={
                  "offentlig_privat" +
                  (selectedFilter === "offentlig_privat"
                    ? " hvilkejobber_active"
                    : "")
                }
                onClick={this.handleChangeFilter}
              >
                Offentlig / Privat
              </li>
              <li
                className={
                  "over_under_40" +
                  (selectedFilter === "over_under_40"
                    ? " hvilkejobber_active"
                    : "")
                }
                onClick={this.handleChangeFilter}
              >
                Over 40 år / Under 40 år
              </li>
              <li
                className={
                  "kandidater_13" +
                  (selectedFilter === "kandidater_13"
                    ? " hvilkejobber_active"
                    : "")
                }
                onClick={this.handleChangeFilter}
              >
                Nyutdanna
              </li>
            </ul>
          </section>
          <section>
            <h2 className="hvilkejobber_color-header">Sorter etter</h2>
            <div className="hvilkejobber_color-controler" />
          </section>
        </header>
        <div className="hvilkejobber_container">
          <div
            className="hvilkejobber_chart-container"
            id="container"
            ref={this.myRefs.container}
          >
            <svg id="chart" ref={this.myRefs.chart} />
            <div id="info" ref={this.myRefs.info}>
              <div className="hvilkejobber_title">infoTitle</div>
              <div className="hvilkejobber_desc" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HvilkeJobber;
